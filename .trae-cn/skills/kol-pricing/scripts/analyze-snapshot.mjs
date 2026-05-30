#!/usr/bin/env node
// Adapted for UnifAPI Skills from Antoniaiaiaiaia/kol-pricing (MIT).
import fs from "node:fs";
import path from "node:path";

const DEFAULT_PRODUCT = {
  name: "YourProduct",
  tagline: "What you do, in one line.",
  pitch: "YourProduct is [what it is]. We serve [audience] by [doing what].",
  desired_action: "sign up and make their first trade",
  ltv_usd: 120,
  twitter_handle: "@yourhandle",
  url: "https://yourproduct.example.com",
};

const DEFAULT_IDEAL_KOLS = {
  preferred_tiers: ["T", "B"],
  excluded_tiers: [],
  extra_keywords: [],
  min_followers: 1000,
  engagement_floor_pct: 0.5,
};

const KEYWORDS = {
  T: [
    "trading", "trader", "trade ", "perp", "perpetual", "leverage", "leveraged",
    "long ", "short ", "hyperliquid", "dydx", "aevo", "drift", "gmx", "vertex",
    "paradex", "100x", "50x", "20x", "liquidation", "funding rate", "position",
    "ta ", "technical analysis", "chart", "support", "resistance", "candle",
    "rsi", "macd", "ema", "futures", "spot", "swap", "dex", "alpha trade",
    "p&l", "pnl", "scalp", "swing", "polymarket", "kalshi", "prediction market",
  ],
  N: [
    "nft", "collection", "minting", "minted", "mint ", "opensea", "magic eden",
    "blur.io", "blur ", "art", "artist", "curator", "drop", "generative", "pfp",
    "profile picture", "bayc", "azuki", "moonbirds", "miladys", "music nft",
    "on-chain art", "1/1", "ordinals", "inscription",
  ],
  B: [
    "building", "builder", " dev ", " devs", "developer", "engineer",
    "engineering", "founder", "cofounder", "co-founder", "open source",
    "opensource", "github.com/", "sdk", "library", "framework",
    "smart contract", "solidity", "rust", "foundry", "hardhat", "anchor",
    "infra", "protocol", "shipping", "shipped",
  ],
  I: [
    "research", "researcher", "analyst", "alpha", "thesis", "macro",
    "narrative", "on-chain analysis", "glassnode", "dune", "defi llama",
    "messari", "delphi", "paradigm", "vc ", "venture", "fund",
  ],
  M: [],
};

const TOOL_BUILDER_KEYWORDS = [
  "building ", "github.com/", "open source", "opensource", "dev tool", "shipped", "shipping",
];

const TIER_ORDER = ["T", "N", "B", "I", "M"];

const MATRIX = {
  T: [
    row("oneshot", "yes", 400, 1000, "1 tweet", "Volume / on-chain product launch."),
    row("activity", "yes", 700, 1500, "2-6 weeks", "Trading contest / PnL leaderboard. Top pick."),
    row("ambassador", "yes", 700, 1800, "3-6 mo", "High-frequency content fits this tier."),
    row("affiliate", "yes", 200, 400, "ongoing", "Base + 20-30% trading-fee / LTV share."),
    row("launch", "yes", 500, 1500, "7-14 days", "Use for product / feature launches."),
  ],
  N: [
    row("oneshot", "yes", 300, 800, "1 tweet", "Drop announcements / curated picks."),
    row("activity", "maybe", 500, 1200, "2-4 weeks", "Only if activity has visual / creator hook."),
    row("ambassador", "yes", 500, 1500, "3-6 mo", "Curator voice converts steadily."),
    row("affiliate", "maybe", 200, 400, "ongoing", "NFT audience converts slower to non-NFT products."),
    row("launch", "yes", 400, 1200, "7-14 days", "Drop / collection launches."),
  ],
  B: [
    row("oneshot", "maybe", 200, 600, "1 tweet", "Builders rarely run pure paid posts."),
    row("activity", "yes", 400, 1000, "2-6 weeks", "Hackathon / dev contest cohort."),
    row("ambassador", "yes", 500, 1500, "6+ mo", "Long-term tutorial / education content."),
    row("affiliate", "yes", 200, 400, "ongoing", "Base + 20-30% LTV. Builder audience converts."),
    row("launch", "yes", 400, 1200, "7-14 days", "Dev-tool / SDK launches."),
  ],
  I: [
    row("oneshot", "yes", 600, 1800, "1 tweet", "Research thread / framing piece."),
    row("activity", "maybe", 800, 1800, "2-6 weeks", "Activity only if it has a research angle."),
    row("ambassador", "yes", 800, 2000, "3-12 mo", "Ongoing thesis / research content."),
    row("affiliate", "maybe", 300, 500, "ongoing", "Mixed conversion; research audience varies."),
    row("launch", "yes", 800, 1800, "7-14 days", "Use for narrative-setting launches."),
  ],
  M: [
    row("oneshot", "yes", 2000, 6000, "1 tweet", "Brand-reach play. Pin 24h."),
    row("activity", "no", 0, 0, "none", "Top-tier KOLs do not actually sign up and play."),
    row("ambassador", "no", 0, 0, "none", "ROI is dreadful at this price."),
    row("affiliate", "no", 0, 0, "none", "Top influencers do not accept rev share."),
    row("launch", "yes", 3000, 8000, "7-14 days", "Use for major launches as a volume anchor."),
  ],
};

const CONVERSION = {
  T: { impression_rate: 0.06, effective_view_rate: 0.30, registration_rate: 0.20, subscription_rate: 0.10 },
  N: { impression_rate: 0.05, effective_view_rate: 0.28, registration_rate: 0.10, subscription_rate: 0.08 },
  B: { impression_rate: 0.07, effective_view_rate: 0.30, registration_rate: 0.15, subscription_rate: 0.12 },
  I: { impression_rate: 0.06, effective_view_rate: 0.30, registration_rate: 0.12, subscription_rate: 0.10 },
  M: { impression_rate: 0.08, effective_view_rate: 0.30, registration_rate: 0.05, subscription_rate: 0.08 },
};

const TOUCH_POINTS = { oneshot: 1, activity: 6, ambassador: 5, affiliate: 2.5, launch: 4 };

const CONTRACT_TERMS = {
  oneshot: [
    "1 original tweet (no RT/quote) within 48 hours of contract.",
    "Tag your brand handle + use the provided UTM link.",
    "Tweet content reviewed 24 hours before publish.",
    "Tweet must remain live for at least 30 days.",
  ],
  activity: [
    "Sign up + bind X handle within 48 hours.",
    "1 enrollment tweet + 3 progress tweets + 1 final-result tweet.",
    "Discount 20% per missed tweet.",
    "Must use UTM tied to the activity slug.",
  ],
  ambassador: [
    "Monthly retainer: 4 original threads + 2 quote-retweets + 1 deep piece.",
    "Quarterly: 1 Space / livestream appearance.",
    "Exclusivity: no paid content for direct competitors during retainer.",
    "Quarterly review; unmet quarter prorated as refund.",
  ],
  affiliate: [
    "1-month base salary + referral code issued at onboard.",
    "Revenue share on signups for 12 months from each referred user.",
    "Anti-fraud: same-IP, self-buys, disposable emails voided.",
    "Monthly payout on the 10th.",
  ],
  launch: [
    "Day 0: announcement tweet (required).",
    "Day +3: hands-on / first-impression tweet.",
    "Day +7: data or result recap tweet.",
    "Launch-specific UTM on all 3.",
    "Early access provided 7 days before launch.",
  ],
};

function row(collab_type, recommended, cash_low, cash_high, term, note) {
  return { collab_type, recommended, cash_low, cash_high, term, note };
}

function parseArgs(argv) {
  const args = { limitTweets: 10 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--input" || arg === "-i") args.input = argv[++i];
    else if (arg === "--out" || arg === "-o") args.out = argv[++i];
    else if (arg === "--json") args.json = argv[++i];
    else if (arg === "--html") args.html = argv[++i];
    else if (arg === "--limit-tweets") args.limitTweets = Number(argv[++i]);
    else if (arg === "--help" || arg === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function usage() {
  return `Usage:
  node skills/kol-pricing/scripts/analyze-snapshot.mjs --input input.json [--out report.md] [--json report.json] [--html report.html]

The input JSON should contain product, ideal_kols, and handles[]. Each handle entry should include
profile plus tweets fetched by the agent through UnifAPI MCP tools.`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (!args.input) throw new Error("Missing --input");

  const snapshot = JSON.parse(fs.readFileSync(args.input, "utf8"));
  const analysis = analyzeSnapshot(snapshot, { limitTweets: args.limitTweets });
  const markdown = args.out || (!args.json && !args.html) ? toMarkdown(analysis) : null;

  if (args.json) writeText(args.json, JSON.stringify(analysis, null, 2));
  if (args.out) writeText(args.out, markdown);
  if (args.html) writeText(args.html, toHtml(analysis));
  if (!args.out && !args.json && !args.html) console.log(markdown);
}

function writeText(filePath, text) {
  const dir = path.dirname(filePath);
  if (dir && dir !== ".") fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, `${text}\n`);
}

function analyzeSnapshot(snapshot, options) {
  const product = { ...DEFAULT_PRODUCT, ...(snapshot.product ?? {}) };
  const ideal = normalizeIdeal(snapshot.ideal_kols ?? snapshot.idealKOLs ?? snapshot.ideal_kols_config);
  const entries = collectEntries(snapshot);
  const reports = entries.map((entry) => analyzeEntry(entry, product, ideal, options));
  const ranking = rankReports(reports);
  const billing = sumBilling(reports.map((report) => report.source.billing).filter(Boolean));
  return {
    generated_at: new Date().toISOString(),
    product,
    ideal_kols: ideal,
    totals: {
      handles_analyzed: reports.length,
      estimated_unifapi_records: reports.reduce((sum, report) => sum + report.source.estimated_unifapi_records, 0),
      ...(billing ? { actual_unifapi_billing: billing } : {}),
    },
    ranking,
    reports,
  };
}

function normalizeIdeal(input = {}) {
  return {
    ...DEFAULT_IDEAL_KOLS,
    ...input,
    preferred_tiers: normalizeTierList(input.preferred_tiers, DEFAULT_IDEAL_KOLS.preferred_tiers),
    excluded_tiers: normalizeTierList(input.excluded_tiers, DEFAULT_IDEAL_KOLS.excluded_tiers),
    extra_keywords: Array.isArray(input.extra_keywords) ? input.extra_keywords : [],
    min_followers: numberOr(input.min_followers, DEFAULT_IDEAL_KOLS.min_followers),
    engagement_floor_pct: numberOr(input.engagement_floor_pct, DEFAULT_IDEAL_KOLS.engagement_floor_pct),
  };
}

function normalizeTierList(value, fallback) {
  if (!Array.isArray(value)) return [...fallback];
  return value.filter((tier) => TIER_ORDER.includes(tier));
}

function collectEntries(snapshot) {
  if (Array.isArray(snapshot)) return snapshot;
  for (const key of ["handles", "kols", "accounts", "creators"]) {
    if (Array.isArray(snapshot[key])) return snapshot[key];
  }
  if (snapshot.profile || snapshot.user || snapshot.handle) return [snapshot];
  throw new Error("Input must include handles[], kols[], accounts[], or a single profile/handle entry.");
}

function analyzeEntry(entry, product, ideal, options) {
  const profileInput = entry.profile ?? entry.user ?? entry.profile_response ?? entry.user_response ?? entry.data ?? entry;
  const tweetsInput = entry.tweets ?? entry.posts ?? entry.tweets_response ?? entry.user_tweets ?? entry.timeline ?? [];
  const profileRaw = unwrapObject(profileInput);
  const rawTweets = unwrapArray(tweetsInput);
  const handle = parseHandle(
    entry.handle ?? entry.screen_name ?? entry.username ?? profileRaw.screen_name ?? profileRaw.username ?? profileRaw.id,
  );
  if (!handle) throw new Error(`Unable to parse handle for entry: ${JSON.stringify(entry).slice(0, 200)}`);

  const startedAt = Date.now();
  const profile = normalizeProfile(profileRaw, handle);
  const tweets = rawTweets
    .slice(0, options.limitTweets ?? 10)
    .map(normalizeTweet)
    .filter(Boolean);
  const engagement = computeEngagement(tweets, profile.followers_count);
  const classification = classify({ profile, tweets }, ideal);
  const warnings = buildWarnings(profile, engagement, classification, ideal);
  const report = assembleReport(handle, profile, engagement, classification, warnings, Date.now() - startedAt, product);
  report.source = {
    tweet_count_analyzed: tweets.length,
    estimated_unifapi_records: 1 + tweets.length,
    ...sourceMetadata(profileInput, tweetsInput),
  };
  report.recent_tweets = tweets.slice(0, 6).map((tweet) => ({
    id: tweet.id,
    text: tweet.text,
    created_at: tweet.created_at,
    likes: tweet.public_metrics.like_count,
    retweets: tweet.public_metrics.retweet_count,
    replies: tweet.public_metrics.reply_count,
    impressions: tweet.public_metrics.impression_count,
  }));
  report.dm_brief = buildDmBrief(report, product);
  return report;
}

function unwrapObject(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (Array.isArray(value.data)) return value.data[0] ?? {};
    if (value.data && !Array.isArray(value.data)) return value.data;
  }
  return value ?? {};
}

function unwrapArray(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object" && Array.isArray(value.data)) return value.data;
  if (value && typeof value === "object" && Array.isArray(value.items)) return value.items;
  return [];
}

function sourceMetadata(profileInput, tweetsInput) {
  const profile = envelopeMetadata(profileInput);
  const tweets = envelopeMetadata(tweetsInput);
  const billing = sumBilling([profile?.billing, tweets?.billing].filter(Boolean));
  return {
    ...(profile ? { profile_response: profile } : {}),
    ...(tweets ? { tweets_response: tweets } : {}),
    ...(billing ? { billing } : {}),
  };
}

function envelopeMetadata(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const meta = {};
  if (typeof value.request_id === "string") meta.request_id = value.request_id;
  const pagination = normalizePagination(value.pagination);
  if (pagination) meta.pagination = pagination;
  const billing = normalizeBilling(value.billing);
  if (billing) meta.billing = billing;
  return Object.keys(meta).length > 0 ? meta : null;
}

function normalizePagination(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return {
    has_more: Boolean(value.has_more),
    next_cursor: value.next_cursor == null ? null : String(value.next_cursor),
  };
}

function normalizeBilling(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return {
    credits_charged: numberOr(value.credits_charged, 0),
    records_charged: numberOr(value.records_charged, 0),
    balance_remaining: numberOr(value.balance_remaining, 0),
    truncated_due_to_balance: Boolean(value.truncated_due_to_balance),
  };
}

function sumBilling(billings) {
  if (!billings.length) return null;
  return {
    credits_charged: billings.reduce((sum, billing) => sum + numberOr(billing.credits_charged, 0), 0),
    records_charged: billings.reduce((sum, billing) => sum + numberOr(billing.records_charged, 0), 0),
    balance_remaining: billings[billings.length - 1].balance_remaining,
    truncated_due_to_balance: billings.some((billing) => billing.truncated_due_to_balance),
  };
}

function parseHandle(input) {
  if (!input) return null;
  let value = String(input).trim().replace(/^@+/, "");
  const urlMatch = value.match(
    /(?:https?:\/\/)?(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/([A-Za-z0-9_]{1,15})/i,
  );
  if (urlMatch) return urlMatch[1].toLowerCase();
  if (/^[A-Za-z0-9_]{1,15}$/.test(value)) return value.toLowerCase();
  return null;
}

function normalizeProfile(raw, handle) {
  const metrics = objectOr(raw.public_metrics, {});
  const screen = parseHandle(raw.username ?? raw.screen_name ?? raw.id ?? handle) ?? handle;
  return {
    id: stringOr(raw.rest_id ?? raw.user_id ?? raw.id, screen),
    username: screen,
    name: stringOr(raw.name, screen),
    description: stringOr(raw.description ?? raw.desc, ""),
    followers_count: numberOr(metrics.followers_count ?? raw.followers_count ?? raw.follower_count ?? raw.sub_count, 0),
    following_count: numberOr(metrics.following_count ?? raw.following_count ?? raw.friends_count ?? raw.friends, 0),
    tweet_count: numberOr(metrics.tweet_count ?? raw.tweet_count ?? raw.statuses_count, 0),
    listed_count: numberOr(metrics.listed_count ?? raw.listed_count, 0),
    verified: Boolean(raw.verified ?? raw.is_verified ?? raw.is_blue_verified ?? raw.verified_type),
    verified_type: stringOr(raw.verified_type ?? raw.verification_type, "none"),
    protected: Boolean(raw.protected ?? raw.is_protected),
    created_at: stringOr(raw.created_at, "1970-01-01T00:00:00.000Z"),
    location: stringOr(raw.location, ""),
    profile_image_url: stringOr(raw.profile_image_url ?? raw.avatar_url ?? raw.avatar, ""),
    url: stringOr(raw.url, `https://x.com/${screen}`),
  };
}

function normalizeTweet(raw) {
  const metrics = objectOr(raw.public_metrics, {});
  const id = stringOr(raw.id ?? raw.tweet_id, "");
  const text = stringOr(raw.text ?? raw.display_text, "");
  if (!id || !text) return null;
  return {
    id,
    text,
    created_at: stringOr(raw.created_at, ""),
    public_metrics: {
      like_count: numberOr(metrics.like_count ?? raw.like_count ?? raw.likes ?? raw.favorites, 0),
      retweet_count: numberOr(metrics.retweet_count ?? raw.retweet_count ?? raw.retweets, 0),
      reply_count: numberOr(metrics.reply_count ?? raw.reply_count ?? raw.replies, 0),
      quote_count: numberOr(metrics.quote_count ?? raw.quote_count ?? raw.quotes, 0),
      impression_count: numberOr(metrics.impression_count ?? raw.impression_count ?? raw.view_count ?? raw.views, 0),
    },
    context_annotations: Array.isArray(raw.context_annotations) ? raw.context_annotations : [],
  };
}

function computeEngagement(tweets, followers) {
  if (tweets.length === 0 || followers === 0) {
    return { avg_likes: 0, avg_retweets: 0, avg_replies: 0, avg_impressions: 0, engagement_rate: 0 };
  }
  const sum = tweets.reduce(
    (acc, tweet) => {
      acc.likes += tweet.public_metrics.like_count;
      acc.rts += tweet.public_metrics.retweet_count;
      acc.replies += tweet.public_metrics.reply_count;
      acc.impressions += tweet.public_metrics.impression_count;
      return acc;
    },
    { likes: 0, rts: 0, replies: 0, impressions: 0 },
  );
  const count = tweets.length;
  return {
    avg_likes: round(sum.likes / count, 2),
    avg_retweets: round(sum.rts / count, 2),
    avg_replies: round(sum.replies / count, 2),
    avg_impressions: Math.round(sum.impressions / count),
    engagement_rate: round(((sum.likes + sum.rts + sum.replies) / count / followers) * 100, 3),
  };
}

function classify(input, ideal) {
  const { text: haystack, contextTags } = buildHaystack(input);
  const scores = {
    T: scoreTier("T", haystack),
    N: scoreTier("N", haystack),
    B: scoreTier("B", haystack),
    I: scoreTier("I", haystack),
    M: { hits: 0, matched: [] },
  };

  const extraMatched = [];
  for (const keyword of ideal.extra_keywords) {
    if (keyword && haystack.includes(String(keyword).toLowerCase())) extraMatched.push(keyword);
  }
  if (extraMatched.length && ideal.preferred_tiers[0]) {
    const target = ideal.preferred_tiers[0];
    scores[target].hits += extraMatched.length;
    scores[target].matched.push(...extraMatched);
  }

  const matchedTool = TOOL_BUILDER_KEYWORDS.filter((keyword) => haystack.includes(keyword));
  const is_tool_builder = matchedTool.length > 0;

  let chosen = "M";
  let maxHits = 0;
  for (const tier of TIER_ORDER) {
    if (tier === "M") continue;
    if (scores[tier].hits > maxHits) {
      maxHits = scores[tier].hits;
      chosen = tier;
    }
  }

  const preferred = ideal.preferred_tiers.includes(chosen);
  const excluded = ideal.excluded_tiers.includes(chosen);
  return {
    tier: chosen,
    is_tool_builder,
    preferred,
    excluded,
    rationale: buildRationale(chosen, is_tool_builder, scores[chosen].matched, matchedTool, input.profile.followers_count, preferred, excluded),
    matched_keywords: [...scores[chosen].matched, ...matchedTool],
    matched_context_tags: dedupeFirst(contextTags, 6),
  };
}

function buildHaystack(input) {
  const bio = (input.profile.description || "").toLowerCase();
  const tweetText = input.tweets.map((tweet) => tweet.text.toLowerCase()).join(" ");
  const contextTags = [];
  for (const tweet of input.tweets) {
    for (const annotation of tweet.context_annotations ?? []) {
      if (annotation.entity?.name) contextTags.push(annotation.entity.name);
      if (annotation.domain?.name) contextTags.push(annotation.domain.name);
    }
  }
  return { text: `${bio}\n${tweetText}\n${contextTags.join(" ").toLowerCase()}`, contextTags };
}

function scoreTier(tier, haystack) {
  const matched = [];
  for (const keyword of KEYWORDS[tier]) {
    if (haystack.includes(keyword)) matched.push(keyword);
  }
  return { hits: matched.length, matched };
}

function buildRationale(tier, toolBuilder, primaryKeywords, toolKeywords, followers, preferred, excluded) {
  const tierName = {
    T: "Trader",
    N: "NFT / Creator",
    B: "Builder",
    I: "Influencer / Research",
    M: "Mass-reach generalist",
  };
  const head = excluded
    ? `${tierName[tier]} - flagged as out-of-scope per your ideal-KOL config.`
    : preferred
      ? `${tierName[tier]} - matches your ideal-KOL profile.`
      : `${tierName[tier]}.`;
  if (tier === "M") {
    if (followers >= 150000) {
      return `${head} ${followers.toLocaleString()} followers and no specific tier signal. Treat as brand-reach play only.`;
    }
    return `${head} No tier-specific signal found. Audience fit unclear without further research.`;
  }
  const tail = toolBuilder
    ? ` Also a tool builder (matched: ${toolKeywords.slice(0, 3).join(", ")}) - explore integration upside.`
    : "";
  return `${head} Matched [${primaryKeywords.slice(0, 4).join(", ")}] in bio and/or recent tweets.${tail}`;
}

function buildWarnings(profile, engagement, classification, ideal) {
  const warnings = [];
  if (profile.protected) {
    warnings.push({ level: "danger", message: "Private account - cannot evaluate. Skip." });
    return warnings;
  }
  if (profile.followers_count < ideal.min_followers && !classification.is_tool_builder) {
    warnings.push({
      level: "warn",
      message: `Followers ${profile.followers_count} - below your minimum (${ideal.min_followers}).`,
    });
  }
  const ageMonths = (Date.now() - Date.parse(profile.created_at)) / (1000 * 60 * 60 * 24 * 30);
  if (Number.isFinite(ageMonths) && ageMonths < 6 && profile.followers_count < 5000) {
    warnings.push({
      level: "warn",
      message: `Account < 6 months old (${Math.round(ageMonths)}mo) and < 5k followers - possible bot.`,
    });
  }
  if (engagement.engagement_rate < ideal.engagement_floor_pct) {
    warnings.push({
      level: "danger",
      message: `Engagement ${engagement.engagement_rate}% - below your floor of ${ideal.engagement_floor_pct}%. Likely bot followers or shadowban.`,
    });
  } else if (engagement.engagement_rate > 8) {
    warnings.push({
      level: "info",
      message: `Engagement ${engagement.engagement_rate}% is excellent - can pay 10-20% above base.`,
    });
  }
  if (classification.excluded) {
    warnings.push({ level: "danger", message: `Tier ${classification.tier} is excluded by your ideal-KOL config. Do not engage.` });
  }
  return warnings;
}

function buildMatrix(classification, engagement, hasDanger) {
  const toolBoost = classification.is_tool_builder ? 1.2 : 1.0;
  const engBoost = engagement.engagement_rate < 0.5 ? 0.7 : 1.0;
  return MATRIX[classification.tier].map((base) => ({
    collab_type: base.collab_type,
    recommended: hasDanger && classification.tier !== "M" && base.recommended === "yes" ? "maybe" : base.recommended,
    cash_low: base.recommended === "no" ? 0 : Math.round(base.cash_low * toolBoost * engBoost),
    cash_high: base.recommended === "no" ? 0 : Math.round(base.cash_high * toolBoost * engBoost),
    term: base.term,
    note: base.note,
  }));
}

function chooseTopPick(tier, matrix, engagement, excluded) {
  if (excluded) return "skip";
  if (tier !== "M" && engagement.engagement_rate < 0.1) return "skip";
  const defaults = { T: "activity", N: "oneshot", B: "ambassador", I: "oneshot", M: "oneshot" };
  const preferredRow = matrix.find((item) => item.collab_type === defaults[tier]);
  if (preferredRow && preferredRow.recommended !== "no") return defaults[tier];
  return matrix.find((item) => item.recommended === "yes")?.collab_type ?? "skip";
}

function estimateROI(profile, engagement, classification, collab, cashAvg, product) {
  const conv = CONVERSION[classification.tier];
  let effective = TOUCH_POINTS[collab] * profile.followers_count * conv.impression_rate * conv.effective_view_rate;
  if (engagement.engagement_rate < 0.5) effective *= 0.3;
  const registrations = effective * conv.registration_rate;
  const subscriptions = registrations * conv.subscription_rate;
  const ltv = subscriptions * product.ltv_usd;
  const roi = cashAvg > 0 ? (ltv - cashAvg) / cashAvg : 0;
  return {
    effective_impressions: Math.round(effective),
    estimated_registrations: Math.round(registrations),
    estimated_subscriptions: Math.round(subscriptions),
    estimated_ltv_revenue: Math.round(ltv),
    cash_cost: Math.round(cashAvg),
    roi_multiplier: round(roi, 2),
  };
}

function buildRecommendation(profile, engagement, classification, matrix, product) {
  const topPick = chooseTopPick(classification.tier, matrix, engagement, classification.excluded);
  if (topPick === "skip") {
    return {
      top_pick_collab: "skip",
      cash_low: 0,
      cash_high: 0,
      affiliate_pct: null,
      rationale: classification.excluded
        ? "Tier excluded by your ideal-KOL config. Skip."
        : "Engagement too low and audience fit too weak for a paid deal. Either pass or offer a zero-cash affiliate trial.",
      contract_terms: [
        "Zero base, gift access, % LTV referral cut only.",
        "Custom UTM, no minimum tweet KPI.",
        "Drop after 2 months if signups < 5.",
      ],
      roi: estimateROI(profile, engagement, classification, "oneshot", 0, product),
    };
  }

  const selected = matrix.find((item) => item.collab_type === topPick);
  const cashAvg = (selected.cash_low + selected.cash_high) / 2;
  const affiliatePct =
    topPick === "affiliate"
      ? classification.tier === "T" || classification.tier === "B"
        ? 25
        : classification.tier === "N" || classification.tier === "I"
          ? 20
          : null
      : null;
  return {
    top_pick_collab: topPick,
    cash_low: selected.cash_low,
    cash_high: selected.cash_high,
    affiliate_pct: affiliatePct,
    rationale: `${tierLabel(classification.tier)} match -> ${selected.collab_type.toUpperCase()} at $${selected.cash_low}-${selected.cash_high}. ${selected.note}`,
    contract_terms: CONTRACT_TERMS[topPick],
    roi: estimateROI(profile, engagement, classification, topPick, cashAvg, product),
  };
}

function assembleReport(handle, profile, engagement, classification, warnings, latencyMs, product) {
  const hasDanger = warnings.some((warning) => warning.level === "danger");
  const matrix = buildMatrix(classification, engagement, hasDanger);
  return {
    handle,
    profile,
    engagement,
    classification,
    warnings,
    matrix,
    recommendation: buildRecommendation(profile, engagement, classification, matrix, product),
    fetched_at: new Date().toISOString(),
    api_latency_ms: latencyMs,
  };
}

function buildDmBrief(report, product) {
  const rec = report.recommendation;
  const offer =
    rec.top_pick_collab === "skip"
      ? "low-commitment KOC affiliate trial: zero base, gift access, % LTV cut"
      : `${rec.top_pick_collab} deal: $${rec.cash_low}-${rec.cash_high}${rec.affiliate_pct ? ` + ${rec.affiliate_pct}% LTV share` : ""}`;
  return {
    product: {
      name: product.name,
      tagline: product.tagline,
      pitch: product.pitch,
      desired_action: product.desired_action,
      url: product.url,
    },
    handle: `@${report.profile.username}`,
    offer,
    tone: "Practitioner, direct, slightly warm. No hype, no emojis, no exclamation marks.",
    constraints: [
      "60-110 words.",
      "Reference exactly one recent tweet when possible.",
      "Mention the product naturally.",
      "End with one low-friction ask.",
    ],
    recent_tweets: report.recent_tweets.map((tweet) => tweet.text),
  };
}

function rankReports(reports) {
  return [...reports]
    .map((report) => ({
      handle: report.handle,
      score: round(scoreReport(report), 2),
      tier: `${report.classification.tier}${report.classification.is_tool_builder ? "+E" : ""}`,
      top_pick: report.recommendation.top_pick_collab,
      cash_range: moneyRange(report.recommendation.cash_low, report.recommendation.cash_high),
      roi_multiplier: report.recommendation.roi.roi_multiplier,
      warnings: report.warnings.filter((warning) => warning.level === "danger").length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ rank: index + 1, ...item }));
}

function scoreReport(report) {
  if (report.recommendation.top_pick_collab === "skip") return -1000;
  const dangerPenalty = report.warnings.filter((warning) => warning.level === "danger").length * 50;
  const warnPenalty = report.warnings.filter((warning) => warning.level === "warn").length * 15;
  const preferredBonus = report.classification.preferred ? 30 : 0;
  const toolBonus = report.classification.is_tool_builder ? 15 : 0;
  const reach = Math.log10(Math.max(report.profile.followers_count, 10)) * 10;
  return report.recommendation.roi.roi_multiplier * 100 + report.engagement.engagement_rate * 10 + reach + preferredBonus + toolBonus - dangerPenalty - warnPenalty;
}

function toMarkdown(analysis) {
  const lines = [];
  lines.push(`# KOL Pricing Report`);
  lines.push("");
  lines.push(`Generated: ${analysis.generated_at}`);
  lines.push(`Product: ${analysis.product.name} - ${analysis.product.tagline}`);
  lines.push(`Estimated UnifAPI records: ${analysis.totals.estimated_unifapi_records}`);
  if (analysis.totals.actual_unifapi_billing) {
    lines.push(`Actual UnifAPI billing: ${formatBilling(analysis.totals.actual_unifapi_billing)}`);
  }
  lines.push("");
  lines.push("## Ranking");
  lines.push("");
  lines.push("| Rank | Handle | Tier | Top pick | Cash | ROI | Score |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- |");
  for (const item of analysis.ranking) {
    lines.push(`| ${item.rank} | @${escapeCell(item.handle)} | ${item.tier} | ${item.top_pick} | ${item.cash_range} | ${item.roi_multiplier}x | ${item.score} |`);
  }
  for (const report of analysis.reports) {
    lines.push("");
    lines.push(`## @${report.handle}`);
    lines.push("");
    lines.push(`- Tier: ${report.classification.tier}${report.classification.is_tool_builder ? "+E" : ""}`);
    lines.push(`- Followers: ${report.profile.followers_count.toLocaleString()}`);
    lines.push(`- Engagement: ${report.engagement.engagement_rate}%`);
    lines.push(`- Top pick: ${report.recommendation.top_pick_collab}`);
    lines.push(`- Cash range: ${moneyRange(report.recommendation.cash_low, report.recommendation.cash_high)}`);
    lines.push(`- ROI: ${report.recommendation.roi.roi_multiplier}x`);
    lines.push(`- Rationale: ${report.recommendation.rationale}`);
    lines.push(`- Classification: ${report.classification.rationale}`);
    if (report.source.billing) {
      lines.push(`- UnifAPI billing: ${formatBilling(report.source.billing)}`);
    }
    if (report.warnings.length) {
      lines.push(`- Warnings: ${report.warnings.map((warning) => `${warning.level}: ${warning.message}`).join(" | ")}`);
    }
    lines.push("");
    lines.push("### Contract Terms");
    for (const term of report.recommendation.contract_terms) lines.push(`- ${term}`);
    if (report.recent_tweets.length) {
      lines.push("");
      lines.push("### Recent Tweet Evidence");
      for (const tweet of report.recent_tweets.slice(0, 3)) {
        lines.push(`- ${tweet.text.replace(/\s+/g, " ").slice(0, 220)}`);
      }
    }
    lines.push("");
    lines.push("### DM Brief");
    lines.push(`Offer: ${report.dm_brief.offer}`);
    lines.push(`Tone: ${report.dm_brief.tone}`);
  }
  return lines.join("\n");
}

function toHtml(analysis) {
  const product = analysis.product;
  const productUrl = product.url
    ? `<a class="link break-all" href="${escapeHtml(product.url)}">${escapeHtml(product.url)}</a>`
    : "Not provided";
  const billing = analysis.totals.actual_unifapi_billing
    ? `<span>Actual billing <b>${escapeHtml(formatBilling(analysis.totals.actual_unifapi_billing))}</b></span>`
    : `<span>Estimated records <b>${analysis.totals.estimated_unifapi_records}</b></span>`;
  const reportModules = analysis.reports.map(toKolModuleHtml).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KOL Pricing Report - ${escapeHtml(product.name)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --bg: oklch(0.982 0.009 82);
      --panel: oklch(0.996 0.006 82);
      --panel-2: oklch(0.971 0.012 82);
      --ink: oklch(0.235 0.018 250);
      --muted: oklch(0.485 0.018 250);
      --faint: oklch(0.665 0.014 250);
      --line: oklch(0.902 0.012 82);
      --line-strong: oklch(0.818 0.018 82);
      --success: oklch(0.555 0.14 154);
      --success-ink: oklch(0.325 0.105 154);
      --success-soft: oklch(0.952 0.041 154);
      --success-line: oklch(0.823 0.075 154);
      --warn: oklch(0.704 0.135 80);
      --warn-ink: oklch(0.43 0.105 68);
      --warn-soft: oklch(0.958 0.045 85);
      --warn-line: oklch(0.842 0.08 83);
      --danger: oklch(0.577 0.17 28);
      --danger-ink: oklch(0.382 0.13 28);
      --danger-soft: oklch(0.958 0.033 28);
      --danger-line: oklch(0.836 0.07 28);
      --info: oklch(0.545 0.13 230);
      --info-soft: oklch(0.953 0.034 230);
      --shadow: 0 1px 2px oklch(0.235 0.018 250 / 0.05), 0 18px 50px oklch(0.235 0.018 250 / 0.06);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background:
        radial-gradient(circle at top left, oklch(0.956 0.03 154 / 0.9), transparent 360px),
        linear-gradient(180deg, var(--bg), oklch(0.964 0.011 88));
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    .shell { max-width: 1240px; margin: 0 auto; padding: 32px 24px 44px; }
    .surface {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 14px;
      box-shadow: var(--shadow);
    }
    .surface-muted {
      background: var(--panel-2);
      border: 1px solid var(--line);
      border-radius: 12px;
    }
    .hairline { border-color: var(--line); }
    .muted { color: var(--muted); }
    .faint { color: var(--faint); }
    .link { color: var(--success-ink); text-decoration: underline; text-decoration-color: var(--success-line); text-underline-offset: 3px; }
    .eyebrow {
      color: var(--muted);
      font-size: 0.6875rem;
      font-weight: 760;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      min-height: 1.5rem;
      border-radius: 999px;
      border: 1px solid var(--line);
      padding: 0.25rem 0.625rem;
      font-size: 0.6875rem;
      font-weight: 740;
      line-height: 1;
      white-space: nowrap;
      background: var(--panel-2);
      color: var(--muted);
    }
    .tag-green { background: var(--success-soft); border-color: var(--success-line); color: var(--success-ink); }
    .tag-amber { background: var(--warn-soft); border-color: var(--warn-line); color: var(--warn-ink); }
    .tag-red { background: var(--danger-soft); border-color: var(--danger-line); color: var(--danger-ink); }
    .tag-ink { background: var(--ink); border-color: var(--ink); color: oklch(0.982 0.009 82); }
    .metric {
      background: var(--panel-2);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 0.75rem;
      min-width: 0;
    }
    .metric-value { font-size: 1.25rem; line-height: 1.1; font-weight: 800; letter-spacing: 0; }
    .metric-green { color: var(--success-ink); }
    .metric-amber { color: var(--warn-ink); }
    .metric-red { color: var(--danger-ink); }
    .avatar {
      width: 5rem;
      height: 5rem;
      border-radius: 1.25rem;
      display: grid;
      place-items: center;
      background: var(--ink);
      color: oklch(0.982 0.009 82);
      font-size: 2rem;
      font-weight: 800;
      flex: 0 0 auto;
    }
    .tier-badge {
      display: inline-flex;
      overflow: hidden;
      border-radius: 10px;
      border: 1px solid var(--ink);
      background: var(--ink);
      color: oklch(0.982 0.009 82);
    }
    .tier-badge.is-muted {
      border-color: var(--line-strong);
      background: var(--panel-2);
      color: var(--muted);
    }
    .tier-letter {
      padding: 0.875rem 1.25rem;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 2.875rem;
      line-height: 1;
      font-weight: 500;
    }
    .tier-extra {
      display: flex;
      align-items: center;
      padding: 0 0.875rem;
      background: var(--success);
      color: oklch(0.982 0.009 82);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.75rem;
      line-height: 1;
    }
    .matrix-row {
      display: grid;
      grid-template-columns: minmax(150px, 1.05fr) 70px minmax(100px, 0.8fr) 110px minmax(220px, 1.8fr);
      gap: 0.75rem;
      align-items: center;
      border-top: 1px solid var(--line);
      padding: 0.875rem 1rem;
      background: var(--panel);
    }
    .matrix-row.is-rec {
      background: color-mix(in oklch, var(--success-soft) 72%, var(--panel));
      border: 1px solid var(--success-line);
      border-radius: 10px;
      margin: 0.5rem;
    }
    .matrix-row.is-locked { opacity: 0.58; }
    .fit-dot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 999px;
      font-size: 0.6875rem;
      font-weight: 800;
    }
    .fit-rec { background: var(--success); color: oklch(0.982 0.009 82); }
    .fit-ok { background: var(--warn-soft); color: var(--warn-ink); border: 1px solid var(--warn-line); }
    .fit-no { background: var(--danger-soft); color: var(--danger-ink); border: 1px solid var(--danger-line); }
    .fit-muted { background: var(--panel-2); color: var(--faint); border: 1px solid var(--line); }
    .roi-bar {
      display: flex;
      height: 1.75rem;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: var(--panel);
    }
    .roi-seg {
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 0 0.5rem;
      color: oklch(0.982 0.009 82);
      font-size: 0.6875rem;
      font-weight: 760;
      border-right: 1px solid oklch(0.982 0.009 82 / 0.65);
    }
    .roi-seg:last-child { border-right: 0; }
    .warning {
      border-radius: 12px;
      border: 1px solid var(--warn-line);
      background: var(--warn-soft);
      color: var(--warn-ink);
    }
    .warning.is-critical {
      border-color: var(--danger-line);
      background: var(--danger-soft);
      color: var(--danger-ink);
    }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th {
      color: var(--muted);
      background: var(--panel-2);
      font-size: 0.6875rem;
      font-weight: 760;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-align: left;
      padding: 0.75rem 1rem;
      white-space: nowrap;
    }
    td {
      border-top: 1px solid var(--line);
      padding: 0.875rem 1rem;
      font-size: 0.8125rem;
      vertical-align: middle;
      white-space: nowrap;
    }
    @media (max-width: 760px) {
      .shell { padding: 20px 14px 32px; }
      .matrix-row { grid-template-columns: 1fr; gap: 0.45rem; }
      .matrix-row.is-rec { margin: 0.375rem; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header class="mb-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section class="surface p-6 sm:p-7">
        <div class="mb-7 flex flex-wrap items-center justify-between gap-3">
          <p class="text-[0.8125rem] font-semibold muted">${escapeHtml(product.name)} <span class="faint">&middot; KOL Pricing</span></p>
          <div class="flex flex-wrap gap-2">
            ${statusTag("Open methodology", "green")}
            ${statusTag("Tailwind HTML", "ghost")}
          </div>
        </div>
        <p class="eyebrow">Campaign context</p>
        <h1 class="mt-2 text-[2rem] font-[780] leading-tight tracking-normal sm:text-[2.75rem]">${escapeHtml(product.name)}</h1>
        <p class="mt-4 max-w-[70ch] text-[0.98rem] font-medium leading-7 muted">${escapeHtml(product.pitch)}</p>
      </section>
      <aside class="surface p-5">
        <dl class="grid gap-4">
          <div>
            <dt class="eyebrow">Desired action</dt>
            <dd class="mt-1 text-sm font-semibold">${escapeHtml(product.desired_action)}</dd>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="surface-muted p-3">
              <dt class="eyebrow">LTV</dt>
              <dd class="mt-1 text-xl font-[780]">$${escapeHtml(product.ltv_usd)}</dd>
            </div>
            <div class="surface-muted p-3">
              <dt class="eyebrow">KOLs</dt>
              <dd class="mt-1 text-xl font-[780]">${analysis.totals.handles_analyzed}</dd>
            </div>
          </div>
          <div>
            <dt class="eyebrow">Product URL</dt>
            <dd class="mt-1 text-sm font-semibold">${productUrl}</dd>
          </div>
          <div class="pt-1 text-xs muted">${billing}</div>
        </dl>
      </aside>
    </header>

    ${toRecordsModuleHtml(analysis)}

    <section class="mt-6 flex flex-col gap-8">
      ${reportModules}
    </section>

    <footer class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-dashed hairline pt-5 text-[0.6875rem] faint">
      <span>Generated <b class="muted">${escapeHtml(analysis.generated_at)}</b> &middot; Methodology <b class="muted">open-source</b></span>
      <span>Adapted from <a class="link" href="https://github.com/Antoniaiaiaiaia/kol-pricing">Antoniaiaiaiaia/kol-pricing</a>.</span>
    </footer>
  </main>
</body>
</html>`;
}

function toRecordsModuleHtml(analysis) {
  const rows = analysis.ranking.map((item) => {
    const status = actionForRanking(item);
    return `<tr>
      <td class="muted">${item.rank}</td>
      <td class="font-[760]">@${escapeHtml(item.handle)}</td>
      <td>${tierPill(item.tier, false)}</td>
      <td>${statusTag(status.label, status.tone)}</td>
      <td class="font-semibold">${escapeHtml(fmtCollabLabel(item.top_pick))}</td>
      <td class="font-[760]">${escapeHtml(item.cash_range)}</td>
      <td class="font-[760] ${item.roi_multiplier < 0 ? "metric-red" : "metric-green"}">${escapeHtml(formatRoi(item.roi_multiplier))}</td>
      <td class="muted">${escapeHtml(item.score)}</td>
    </tr>`;
  }).join("");
  const actions = analysis.ranking.slice(0, 3).map((item) => {
    const status = actionForRanking(item);
    return `<li class="surface-muted p-4">
      <div class="flex flex-wrap items-center gap-2">${statusTag(status.label, status.tone)} <b>@${escapeHtml(item.handle)}</b></div>
      <p class="mt-2 text-xs font-medium muted">${escapeHtml(item.tier)} &middot; ${escapeHtml(item.cash_range)} &middot; ${escapeHtml(formatRoi(item.roi_multiplier))}</p>
      <p class="mt-1 text-xs font-medium faint">Top pick: ${escapeHtml(fmtCollabLabel(item.top_pick))}. Score: ${escapeHtml(item.score)}.</p>
    </li>`;
  }).join("");

  return `<section class="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
    <div class="surface overflow-hidden">
      <div class="flex flex-wrap items-end justify-between gap-3 px-5 pb-3 pt-5">
        <div>
          <p class="eyebrow">Records</p>
          <h2 class="mt-1 text-lg font-[760]">Batch ranking</h2>
        </div>
        ${statusTag(`${analysis.totals.handles_analyzed} KOL${analysis.totals.handles_analyzed === 1 ? "" : "s"} analyzed`, "ghost")}
      </div>
      <div class="table-wrap px-5 pb-5">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>KOL</th>
              <th>Tier</th>
              <th>Action</th>
              <th>Top pick</th>
              <th>Cash</th>
              <th>ROI</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
    <aside class="surface p-5">
      <p class="eyebrow">Decision queue</p>
      <h2 class="mt-1 text-lg font-[760]">Next best moves</h2>
      <ol class="mt-4 grid gap-3">${actions || `<li class="text-sm muted">No ranked actions available.</li>`}</ol>
    </aside>
  </section>`;
}

function toKolModuleHtml(report) {
  const recTag = recommendationTag(report);
  return `<article class="flex flex-col gap-4" id="kol-${escapeHtml(report.handle)}">
    <div class="flex flex-wrap items-center gap-2 text-xs font-semibold muted">
      <span>Analyze</span>
      <span class="faint">/</span>
      <span class="font-[760]">${escapeHtml(`@${report.handle}`)}</span>
      ${statusTag(recTag.label, recTag.tone)}
    </div>
    ${profileHeaderModule(report)}
    ${warningsModule(report)}
    ${verdictModule(report)}
    ${collabMatrixModule(report)}
    ${topPickModule(report)}
    <div class="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      ${contractModule(report)}
      ${outreachModule(report)}
    </div>
    ${auditModule(report)}
  </article>`;
}

function profileHeaderModule(report) {
  const p = report.profile;
  const avatar = p.profile_image_url
    ? `<img class="avatar object-cover" src="${escapeHtml(p.profile_image_url)}" alt="">`
    : `<div class="avatar">${escapeHtml((p.name || p.username).slice(0, 1).toUpperCase())}</div>`;
  const metrics = [
    metricModule("Followers", fmtNumber(p.followers_count), `${fmtCount(p.following_count)} following`, "neutral"),
    metricModule("Avg engagement", `${report.engagement.engagement_rate.toFixed(2)}%`, engagementSub(report.engagement.engagement_rate), metricTone(report.engagement.engagement_rate, "engagement")),
    metricModule("Avg impressions", fmtCount(report.engagement.avg_impressions), report.engagement.avg_impressions < 200 ? "possible shadowban" : "recent posts", metricTone(report.engagement.avg_impressions, "impressions")),
    metricModule("Tweet count", fmtNumber(p.tweet_count), `${fmtCount(p.listed_count)} lists`, "neutral"),
  ].join("");
  const joined = formatMonth(p.created_at);
  const age = handleAgeYears(p.created_at);
  const verified = p.verified ? statusTag("verified", "green") : "";

  return `<section class="surface p-5 sm:p-6">
    <div class="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)]">
      ${avatar}
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <h2 class="text-[1.55rem] font-[780] leading-tight tracking-normal">${escapeHtml(p.name)}</h2>
          ${verified}
          ${statusTag(`@${p.username}`, "ghost")}
        </div>
        <div class="mt-2 flex flex-wrap items-center gap-2 text-[0.8125rem] font-medium muted">
          ${p.location ? `<span>${escapeHtml(p.location)}</span><span class="faint">&middot;</span>` : ""}
          <span>Joined ${escapeHtml(joined)}</span>
          <span class="faint">&middot;</span>
          <span>${escapeHtml(age)}</span>
        </div>
        ${p.description ? `<p class="mt-3 max-w-[72ch] text-sm font-medium leading-6 muted">${escapeHtml(p.description)}</p>` : ""}
      </div>
    </div>
    <div class="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">${metrics}</div>
  </section>`;
}

function warningsModule(report) {
  if (!report.warnings.length) return "";
  const critical = report.warnings.some((warning) => warning.level === "danger");
  const items = report.warnings.map((warning) => {
    const tag = warning.message.split(" - ")[0] || warning.message.split(".")[0];
    return `<li class="flex gap-3 text-[0.8125rem] font-medium">
      <span class="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full" style="background:${warning.level === "danger" ? "var(--danger)" : "var(--warn)"}"></span>
      <span><b>${escapeHtml(tag)}</b> <span>${escapeHtml(warning.message)}</span></span>
    </li>`;
  }).join("");
  return `<section class="warning ${critical ? "is-critical" : ""} p-4">
    <div class="mb-3 flex items-center gap-2">
      <span class="fit-dot ${critical ? "fit-no" : "fit-ok"}">!</span>
      <h3 class="text-[0.8125rem] font-[780]">${critical ? "Critical, recommend skipping" : `${report.warnings.length} caution${report.warnings.length > 1 ? "s" : ""} on this KOL`}</h3>
    </div>
    <ul class="grid gap-2">${items}</ul>
  </section>`;
}

function verdictModule(report) {
  const c = report.classification;
  const muted = report.warnings.some((warning) => warning.level === "danger") || c.excluded;
  const tags = c.matched_keywords.slice(0, 6).map((tag) => statusTag(tag, "ghost")).join("");
  return `<section class="surface p-5">
    <div class="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)]">
      <div class="flex flex-col items-start gap-2">
        <p class="eyebrow">Tier verdict</p>
        ${tierBadge(c.tier, c.is_tool_builder, muted)}
        <p class="max-w-[12rem] text-xs font-medium muted">${escapeHtml(tierLabel(c.tier))}</p>
      </div>
      <div class="min-w-0">
        <div class="mb-3 flex flex-wrap items-center gap-2">
          <span class="eyebrow">Fit with your config</span>
          ${c.excluded ? statusTag("Out of scope", "red") : c.preferred ? statusTag("Preferred fit", "green") : statusTag("Neutral", "ghost")}
        </div>
        <p class="max-w-[75ch] text-[0.95rem] font-semibold leading-7">${escapeHtml(c.rationale)}</p>
        ${tags ? `<div class="mt-4 flex flex-wrap gap-1.5">${tags}</div>` : ""}
      </div>
    </div>
  </section>`;
}

function collabMatrixModule(report) {
  const rows = report.matrix.map((row) => {
    const fit = fitFromRow(row, report.classification.tier);
    const recommended = fit.fit === "rec";
    return `<div class="matrix-row ${recommended ? "is-rec" : ""} ${fit.locked ? "is-locked" : ""}">
      <div class="flex items-center gap-2 font-[760]">${fit.locked ? `<span class="faint">lock</span>` : ""}${escapeHtml(fmtCollabLabel(row.collab_type))}</div>
      <div>${fitBadge(fit.fit)}</div>
      <div class="font-[760]">${escapeHtml(formatCashRange(row.cash_low, row.cash_high))}</div>
      <div class="text-xs font-semibold muted">${escapeHtml(row.term)}</div>
      <div class="text-xs font-medium leading-5 muted">${escapeHtml(row.note)}</div>
    </div>`;
  }).join("");
  return `<section class="surface overflow-hidden">
    <div class="flex flex-wrap items-end justify-between gap-3 px-5 pb-3 pt-5">
      <div>
        <p class="eyebrow">Collaboration matrix</p>
        <h3 class="mt-1 text-lg font-[760]">What kind of deal to offer</h3>
      </div>
      ${statusTag("reference pricing", "ghost")}
    </div>
    <div class="table-wrap px-5 pb-5">
      <div class="min-w-[760px] overflow-hidden rounded-xl border hairline">
        <div class="grid grid-cols-[minmax(150px,1.05fr)_70px_minmax(100px,0.8fr)_110px_minmax(220px,1.8fr)] gap-3 bg-[var(--panel-2)] px-4 py-3 text-[0.6875rem] font-[760] uppercase tracking-[0.06em] muted">
          <div>Type</div><div>Fit</div><div>Cash</div><div>Term</div><div>Note</div>
        </div>
        ${rows}
      </div>
    </div>
  </section>`;
}

function topPickModule(report) {
  const rec = report.recommendation;
  const topPick = rec.top_pick_collab;
  const isSkip = topPick === "skip";
  const row = report.matrix.find((item) => item.collab_type === topPick);
  const stats = [
    statBox("Cash", isSkip ? "$0" : formatCashRange(rec.cash_low, rec.cash_high), isSkip ? "do not commit budget" : "negotiable", !isSkip),
    statBox("Term", row?.term ?? "-", "", false),
    statBox("Affiliate cut", rec.affiliate_pct ? `${rec.affiliate_pct}% LTV` : "-", rec.affiliate_pct ? "12 months" : "", false),
    statBox("Preferred", report.classification.preferred ? "yes" : report.classification.excluded ? "no" : "neutral", "per your config", false),
  ].join("");
  const roi = roiModule(rec.roi, topPick);
  return `<section class="surface p-5">
    <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="eyebrow">Top pick</p>
        <h3 class="mt-1 text-lg font-[760]">${escapeHtml(isSkip ? "Skip, manual review or zero-cash trial" : fmtCollabLabel(topPick))}</h3>
      </div>
      ${statusTag(isSkip ? "Manual review" : "Use this deal", isSkip ? "amber" : "green")}
    </div>
    <div class="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
      <div>
        <div class="grid gap-2 sm:grid-cols-2">${stats}</div>
        <p class="mt-4 text-sm font-semibold leading-6 muted">${escapeHtml(rec.rationale)}</p>
      </div>
      ${roi}
    </div>
  </section>`;
}

function contractModule(report) {
  const items = report.recommendation.contract_terms.map((term) => `<li class="flex gap-3 border-t hairline py-3 first:border-t-0">
    <span class="mt-0.5 h-4 w-4 shrink-0 rounded border hairline bg-[var(--panel)]"></span>
    <span class="text-[0.8125rem] font-semibold leading-5">${escapeHtml(term)}</span>
  </li>`).join("");
  return `<section class="surface overflow-hidden">
    <header class="flex items-center justify-between gap-4 px-5 py-4">
      <div class="flex items-center gap-3">
        <h3 class="text-base font-[760]">Contract requirements</h3>
        ${statusTag(`${report.recommendation.contract_terms.length} items`, "ghost")}
      </div>
      <span class="text-xs font-medium muted">Checklist ready</span>
    </header>
    <div class="border-t hairline px-5 pb-5">
      <ul>${items}</ul>
    </div>
  </section>`;
}

function outreachModule(report) {
  const tweets = report.recent_tweets.slice(0, 2).map((tweet) => `<li class="surface-muted px-3 py-2 text-xs font-medium leading-5 muted">${escapeHtml(tweet.text.replace(/\s+/g, " ").slice(0, 220))}</li>`).join("");
  const constraints = report.dm_brief.constraints.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<section class="surface p-5">
    <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="eyebrow">DM draft</p>
        <h3 class="mt-1 text-lg font-[760]">Outreach brief</h3>
      </div>
      ${statusTag("agent-written copy", "ghost")}
    </div>
    <div class="surface-muted p-4 font-mono text-[0.8125rem] leading-7">
      <p><b>Offer:</b> ${escapeHtml(report.dm_brief.offer)}</p>
      <p><b>Tone:</b> ${escapeHtml(report.dm_brief.tone)}</p>
      <p><b>Constraints:</b></p>
      <ul class="ml-5 list-disc">${constraints}</ul>
    </div>
    <div class="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs faint">
      <span>Recent tweet evidence is available for personalization.</span>
      <span>tone: <b class="muted">warm</b> &middot; direct &middot; formal</span>
    </div>
    ${tweets ? `<ul class="mt-3 grid gap-2">${tweets}</ul>` : ""}
  </section>`;
}

function auditModule(report) {
  const billing = report.source.billing ? ` &middot; UnifAPI <b class="muted">${escapeHtml(formatBilling(report.source.billing))}</b>` : "";
  return `<section class="flex flex-wrap items-center justify-between gap-3 border-t border-dashed hairline pt-4 text-[0.6875rem] faint">
    <span>Generated <b class="muted">${escapeHtml(formatDateTime(report.fetched_at))}</b> &middot; API call <b class="muted">${(report.api_latency_ms / 1000).toFixed(1)}s</b>${billing} &middot; Methodology <b class="muted">open-source</b></span>
    <span class="link">HTML report artifact</span>
  </section>`;
}

function metricModule(label, value, sub, tone) {
  const toneClass = {
    neutral: "",
    green: "metric-green",
    amber: "metric-amber",
    red: "metric-red",
  }[tone] ?? "";
  return `<div class="metric">
    <div class="eyebrow">${escapeHtml(label)}</div>
    <div class="metric-value ${toneClass}">${escapeHtml(value)}</div>
    ${sub ? `<div class="mt-1 text-[0.6875rem] font-medium faint">${escapeHtml(sub)}</div>` : ""}
  </div>`;
}

function statBox(label, value, sub, accent) {
  return `<div class="metric ${accent ? "border-[var(--success-line)] bg-[var(--success-soft)]" : ""}">
    <div class="eyebrow">${escapeHtml(label)}</div>
    <div class="metric-value ${accent ? "metric-green" : ""}">${escapeHtml(value)}</div>
    ${sub ? `<div class="mt-1 text-[0.6875rem] font-medium faint">${escapeHtml(sub)}</div>` : ""}
  </div>`;
}

function roiModule(roi, collab) {
  const segments = roiSegments(roi).map((seg) => `<div class="roi-seg" style="width:${seg.pct}%;background:${seg.color}">${escapeHtml(seg.label)}</div>`).join("");
  const legend = roiSegments(roi).map((seg) => `<span><b>${escapeHtml(seg.value)}</b> ${escapeHtml(seg.label.toLowerCase())}</span>`).join("");
  const roiText = roiMultiplierLabel(roi.roi_multiplier, collab);
  const negative = roi.roi_multiplier < 0 || collab === "skip";
  return `<div class="surface-muted p-4">
    <div class="mb-3 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="eyebrow">ROI breakdown</p>
        <p class="mt-1 text-xs font-medium muted">Cash cost, reach, registrations, LTV revenue</p>
      </div>
      <div class="text-right">
        <div class="text-[2.35rem] font-[820] leading-none tracking-normal ${negative ? "metric-red" : "metric-green"}">${escapeHtml(roiText)}</div>
        <div class="mt-1 text-[0.6875rem] font-[760] uppercase tracking-[0.06em] muted">expected ROI</div>
      </div>
    </div>
    <div class="roi-bar">${segments}</div>
    <div class="mt-2 flex flex-wrap justify-between gap-2 text-[0.6875rem] font-medium muted">${legend}</div>
  </div>`;
}

function tierBadge(tier, plusE, muted) {
  return `<div class="tier-badge ${muted ? "is-muted" : ""}">
    <div class="tier-letter">${escapeHtml(tier)}</div>
    ${plusE ? `<div class="tier-extra">+E</div>` : ""}
  </div>`;
}

function tierPill(tier, muted) {
  return `<span class="tag ${muted ? "" : "tag-ink"}">${escapeHtml(tier)}</span>`;
}

function statusTag(label, tone) {
  const cls = {
    green: "tag-green",
    red: "tag-red",
    amber: "tag-amber",
    ink: "tag-ink",
    ghost: "",
  }[tone] ?? "";
  return `<span class="tag ${cls}">${escapeHtml(label)}</span>`;
}

function recommendationTag(report) {
  const hasDanger = report.warnings.some((warning) => warning.level === "danger");
  if (report.classification.excluded) return { tone: "red", label: "Out of scope" };
  if (hasDanger) return { tone: "red", label: "Skip recommended" };
  if (report.classification.tier === "M") return { tone: "ink", label: "One-shot only" };
  if (report.recommendation.top_pick_collab === "skip") return { tone: "amber", label: "Manual review" };
  if (report.classification.preferred) return { tone: "green", label: "Preferred fit" };
  return { tone: "green", label: "Recommended" };
}

function actionForRanking(item) {
  if (item.top_pick === "skip") return { tone: "red", label: "Skip" };
  if (item.roi_multiplier >= 1) return { tone: "green", label: "Engage" };
  return { tone: "amber", label: "Negotiate" };
}

function fitFromRow(row, tier) {
  if (row.recommended === "yes") return { fit: "rec", locked: false };
  if (row.recommended === "maybe") return { fit: "ok", locked: false };
  if (tier === "M") return { fit: "no", locked: true };
  return { fit: "red", locked: false };
}

function fitBadge(fit) {
  if (fit === "rec") return `<span class="fit-dot fit-rec">ok</span>`;
  if (fit === "ok") return `<span class="fit-dot fit-ok">ok</span>`;
  if (fit === "red") return `<span class="fit-dot fit-no">no</span>`;
  return `<span class="fit-dot fit-muted">no</span>`;
}

function roiSegments(roi) {
  return [
    { pct: roi.cash_cost > 0 ? 18 : 12, label: "Cash cost", value: roi.cash_cost > 0 ? `$${fmtMoney(roi.cash_cost)}` : "$0", color: "var(--danger-ink)" },
    { pct: 14, label: "Touch", value: `${fmtCount(roi.effective_impressions)} eff`, color: "var(--muted)" },
    { pct: 30, label: "Registrations", value: `~${fmtCount(roi.estimated_registrations)}`, color: "var(--ink)" },
    { pct: 38, label: "LTV revenue", value: `$${fmtMoney(roi.estimated_ltv_revenue)}`, color: "var(--success)" },
  ];
}

function metricTone(rate, kind) {
  if (kind === "engagement") {
    if (rate < 0.5) return "red";
    if (rate < 1.5) return "amber";
    return "green";
  }
  if (rate < 200) return "red";
  if (rate < 1000) return "amber";
  return "green";
}

function engagementSub(rate) {
  if (rate < 0.5) return "critical - below floor";
  if (rate < 1.5) return "borderline";
  return "healthy";
}

function fmtNumber(value) {
  const number = Number(value);
  if (number >= 1000000) return `${(number / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (number >= 10000) return `${Math.round(number / 1000)}k`;
  if (number >= 1000) return `${(number / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return number.toLocaleString("en-US");
}

function fmtCount(value) {
  return Number(value).toLocaleString("en-US");
}

function fmtMoney(value) {
  const number = Number(value);
  if (number >= 1000) return `${(number / 1000).toFixed(number % 1000 === 0 ? 0 : 1).replace(/\.0$/, "")}k`;
  return number.toLocaleString("en-US");
}

function formatCashRange(low, high) {
  if (low === 0 && high === 0) return "-";
  if (low === high) return `$${fmtMoney(low)}`;
  return `$${fmtMoney(low)}-${fmtMoney(high)}`;
}

function fmtCollabLabel(value) {
  return {
    oneshot: "One-shot tweet",
    activity: "Activity / Leaderboard",
    ambassador: "Long-term Ambassador",
    affiliate: "Affiliate / KOC",
    launch: "Launch Coverage",
    skip: "Skip - manual review",
  }[value] ?? value;
}

function formatRoi(value) {
  return `${value}x`;
}

function roiMultiplierLabel(value, collab) {
  if (value === 0) return collab === "skip" ? "skip" : "-";
  if (value < 0) return `${Math.round(value * 100)}%`;
  return `${value.toFixed(value >= 10 ? 0 : 2).replace(/\.00$/, "")}x`;
}

function formatMonth(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function handleAgeYears(iso) {
  const time = Date.parse(iso);
  if (!time) return "-";
  const years = (Date.now() - time) / (1000 * 60 * 60 * 24 * 365.25);
  return `${years.toFixed(1)} yrs`;
}

function formatDateTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function moneyRange(low, high) {
  if (!low && !high) return "$0";
  return `$${low}-$${high}`;
}

function formatBilling(billing) {
  return `${billing.records_charged} records, ${billing.credits_charged} credits, balance ${billing.balance_remaining}`;
}

function tierLabel(tier) {
  return {
    T: "Trader",
    N: "NFT / Creator",
    B: "Builder",
    I: "Influencer / Research",
    M: "Mass-reach",
  }[tier];
}

function numberOr(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function stringOr(value, fallback) {
  if (value == null) return fallback;
  return String(value);
}

function objectOr(value, fallback) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : fallback;
}

function round(value, digits) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function dedupeFirst(values, count) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    if (!seen.has(value)) {
      seen.add(value);
      out.push(value);
    }
    if (out.length >= count) break;
  }
  return out;
}

function escapeCell(value) {
  return String(value).replace(/\|/g, "\\|");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
