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
    else if (arg === "--limit-tweets") args.limitTweets = Number(argv[++i]);
    else if (arg === "--help" || arg === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function usage() {
  return `Usage:
  node skills/kol-pricing/scripts/analyze-snapshot.mjs --input input.json [--out report.md] [--json report.json]

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
  const markdown = toMarkdown(analysis);

  if (args.json) writeText(args.json, JSON.stringify(analysis, null, 2));
  if (args.out) writeText(args.out, markdown);
  if (!args.out && !args.json) console.log(markdown);
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

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
