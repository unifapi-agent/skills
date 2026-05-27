# Skill Portfolio Review

Review date: 2026-05-27

This review checks whether the UnifAPI Skills portfolio is high quality, mapped to strong demand, and honest about current API coverage.

## Evidence Used

- Current UnifAPI OpenAPI: `https://api.unifapi.com/openapi.json`
- Okara docs: `https://okara.ai/docs/introduction`
- Okara channels overview: `https://okara.ai/docs/channels/overview`
- Okara SEO agent: `https://okara.ai/docs/channels/seo`
- Okara Reddit agent: `https://okara.ai/docs/channels/reddit`
- Okara X agent: `https://okara.ai/docs/channels/twitter-x`
- Okara LinkedIn agent: `https://okara.ai/docs/channels/linkedin`
- Clay University docs: `https://university.clay.com/docs`
- Clay Find docs: `https://university.clay.com/docs-topics/find`
- Clay Enrich docs: `https://university.clay.com/docs-topics/enrich`
- Clay Web scraping docs: `https://university.clay.com/docs-topics/web-scraping`
- Clay Export docs: `https://university.clay.com/docs-topics/export`
- Clay Signals docs: `https://university.clay.com/docs/signals`
- Clay Web intent docs: `https://university.clay.com/docs/website-tracking`
- Skills.sh find-skills workflow: `https://www.skills.sh/vercel-labs/skills/find-skills`
- `npx skills find "GTM growth marketing SEO social listening web3"`
- `npx skills find "Clay lead enrichment CRM outbound signals"`
- `npx skills find "Okara AI CMO Reddit SEO LinkedIn X articles UGC"`

## Runtime Assumption

These skills run inside capable agents such as ChatGPT, Codex, and Claude Code. The portfolio can assume the host agent may provide web search, URL fetch/browser fetch, shell, JS/TS/Python execution, and local file editing. Therefore search/fetch/code are valid skill execution paths and should not be treated as UnifAPI API gaps by default.

UnifAPI API gaps matter when a workflow needs productized scale, normalized source-specific schemas, saved state, notifications, private OAuth connectors, write/publish actions, compliance metadata, billing/rate-limit control, or repeatability across host agents.

## Review Criteria

| Criterion | What good looks like |
| --- | --- |
| Strong demand | The skill maps to a clear GTM, growth, creator, or web3 monitoring job that products like Okara or Clay already make legible. |
| Runtime/API fit | The skill can be executed with current UnifAPI operations or host-agent search/fetch/shell/code, and clearly names unsupported productized API parts as coverage gaps. |
| Actionable output | The output is a decision artifact: ranked list, brief, digest, monitor, shortlist, or action plan. |
| Clear trigger | The description tells an agent when to use the skill, not just which endpoint exists. |
| Bounded promise | The skill either works on current APIs/agent runtime or is explicitly marked with current coverage and API backfill requirements. |
| Non-overlap | Similar skills have different primary jobs and point to each other when a neighboring skill is better. |

## External Skill Search

The Skills.sh search results support the same demand clusters, but no external skill should be copied into this repo as-is. Most relevant public skills are playbook-heavy and tool-agnostic, while this portfolio must stay tied to agent-native execution plus UnifAPI public-data boundaries.

| Search theme | Notable matches | What it confirms | Portfolio decision |
| --- | --- | --- | --- |
| GTM/growth/social listening | `gtm-leader` (123 installs), `web3-growth` (76), `gtm-philosophy` (57), `content-to-pipeline` (53), `web3-protocol-gtm` (36), `marketing-skills-guide` (34) | Users already look for GTM strategy, content-to-pipeline, and web3 GTM skills. | Keep GTM/growth/web3 categories, add strategy and content execution skills, and anchor them in public social/professional data and decision artifacts. |
| Clay/enrichment/outbound | `lead-enrichment` (91), `sales-enrich` (72), `lead-sources-guide` (58), `clay-enrichment-9step` (54), `lead-enrichment` (51), `clay-buying-signals-5` (47) | Enrichment waterfalls, CRM handoff, contact data quality, buying signals, and outbound readiness are real skill demand. | Keep `company-domain-enrichment` and `gtm-table-enrichment`; add ICP list building, scoring, persona classification, outbound sequences, and ABM signal stacking. |
| Okara-like content/SEO | `parasite-seo` (758), `cmo` (31), `seo-geo` (28) | SEO/GEO, CMO strategy, and content operations are highly visible skill demand. | Add product strategy, founder social posts, SEO article writing, UGC creative briefs, growth analytics, and backlink/mention monitoring. |
| Web3/community monitoring | `software-crypto-web3` (331), `web3-growth` (76), `web3-protocol-gtm` (36) | Web3 GTM and crypto monitoring are visible enough to justify dedicated skills. | Keep current social web3 monitors and mark on-chain/Discord/Telegram as API-backfill gaps. |

Representative inspected skills (`lead-enrichment`, `sales-enrich`, `clay-enrichment-9step`, `web3-protocol-gtm`) are useful as demand and UX references, but they rely on external platforms, generic advice, or future data sources. UnifAPI skills should not import provider-specific claims unless UnifAPI can execute them or the skill clearly marks them as backfill.

## Skill-Creator Compliance Check

The portfolio now follows the core `skill-creator` guidance:

- Every skill has lowercase hyphen `name`, trigger-focused `description`, and `agents/openai.yaml`.
- Detailed repo/process docs live outside individual skill folders; skill folders stay limited to `SKILL.md`, `agents/`, and needed `references/` or `scripts/`.
- Agent-native and API-backfill skills are explicit about `Agent Runtime Coverage` or `Current Coverage`, `API Backfill Required`, and guardrails that prevent over-promising.
- `agents/openai.yaml` files now have unique human-facing short descriptions and default prompts instead of a generic placeholder.
- Long frontmatter descriptions were tightened for `unifapi`, `kol-pricing`, `creator-comment-miner`, and the broad workflow portfolio to reduce always-loaded context while preserving trigger coverage.

## Demand Map

| Demand area | Evidence of demand | Skills that cover it | Coverage quality |
| --- | --- | --- | --- |
| Account research and signal monitoring | Clay docs emphasize Find, Enrich, Signals, new hires, job changes, promotions, web intent, and export workflows. | `account-research-brief`, `account-signal-monitor`, `icp-account-list-builder`, `lead-account-scoring-agent`, `persona-classification-agent`, `abm-signal-stack-scorer`, `linkedin-hiring-signal-finder`, `linkedin-people-enrichment`, `buyer-committee-mapper`, `company-domain-enrichment`, `gtm-table-enrichment`, `web-intent-visitor-tracking`, `crm-export-sequence` | Strong for LinkedIn/public social, agent-native account discovery, scoring, and small-batch enrichment today; web intent, CRM, export, and bulk provider APIs still need backfill. |
| Competitor and market intelligence | Okara positions competitor analysis and daily channel agents as core marketing output; Clay signals include company events and mentions. | `competitor-gtm-monitor`, `cross-channel-competitor-monitor`, `market-map-from-social`, `category-demand-scout`, `news-pr-monitor`, `web-page-change-monitor`, `web-research-agent` | Strong for public social, LinkedIn, and agent-native web research today; APIs are still needed for productized news/page monitoring, storage, and alerts. |
| Channel-agent growth work | Okara explicitly presents strategy docs, analytics, Reddit, SEO, GEO, X, LinkedIn, Writer, HN, UGC, Coding, and daily opportunity/content agents. | `product-growth-strategy-brief`, `founder-social-post-writer`, `seo-article-writer`, `growth-analytics-brief`, `backlink-mention-monitor`, `reddit-opportunity-finder`, `reddit-community-monitor`, `x-social-listening`, `threads-opportunity-monitor`, `cross-channel-content-brief`, `social-launch-monitor`, `seo-aeo-monitor`, `hacker-news-opportunity-monitor`, `technical-seo-repo-auditor`, `scheduled-signal-alerts`, `autonomous-channel-agent` | Strong for supported social channels and agent-native strategy/content/web/HN/SEO checks today; APIs are still needed for scheduling, publishing, rank tracking, analytics connectors, backlink indexes, and autonomous channel execution. |
| Creator marketing | Existing `kol-pricing` demand and current social APIs support creator/profile/video/post/comment workflows. | `kol-pricing`, `multi-platform-creator-shortlist`, `instagram-creator-discovery`, `youtube-creator-research`, `creator-comment-miner`, `tiktok-trend-radar`, `ugc-ad-creative-brief` | Strong for discovery, qualification, and creative brief generation; platform-specific pricing, YouTube comments, fake-follower checks, audience demographics, and video asset generation are gaps. |
| Web3 information-source monitoring | User explicitly requested web3 information-source monitors; X/Reddit/YouTube/TikTok are high-signal public web3 channels. | `crypto-narrative-monitor`, `token-community-sentiment-pulse`, `web3-kol-watchlist`, `web3-launch-watch`, `x-community-monitor`, `x-list-monitor`, `web3-onchain-monitor`, `discord-telegram-community-monitor` | Strong for social narrative monitoring today; on-chain and Discord/Telegram/community APIs still need backfill. |

## Okara Capability Comparison

Coverage status is judged against the user-facing capability described by Okara, not just whether an agent can write similar copy. **Full** means current skills, current UnifAPI APIs, or standard host-agent runtime capabilities can produce an equivalent on-demand artifact. **Partial** means a useful skill exists but misses automation, publishing, private integrations, scheduling, durable memory, or productized data. **No current coverage** means no current executable skill path exists, though an API-backfill skill may define the future workflow.

| Okara capability | Coverage | UnifAPI skills | What is covered today | Missing before full parity |
| --- | --- | --- | --- | --- |
| Product intake, strategy document, competitor analysis, brand voice, growth playbook | Partial | `product-growth-strategy-brief`, `account-research-brief`, `competitor-gtm-monitor`, `category-demand-scout`, `cross-channel-content-brief`, `web-research-agent` | Can build an evidence-backed strategy brief from product context, agent-native web research, and public social/LinkedIn evidence. | Durable brand memory, saved strategy workspace, scheduled refresh, and productized crawl/news extraction. |
| Agents Feed with daily opportunities across channels | Partial | `scheduled-signal-alerts`, `account-signal-monitor`, `social-launch-monitor`, channel monitors | Can define monitor queries and run on-demand digests. | Saved monitors, schedules, diff storage, notification/feed UI, threshold alerts. |
| Reddit Agent: find relevant threads and draft helpful replies | Full for on-demand workflow; partial for daily automation | `reddit-opportunity-finder`, `reddit-community-monitor`, `reddit-voice-of-customer` | Can find Reddit threads, explain relevance, mine comments, and draft non-spammy replies. | Persistent daily feed and account-safe posting workflow. |
| X Agent: daily brand-voice tweet drafts and optional direct posting | Partial | `founder-social-post-writer`, `x-social-listening`, `x-list-monitor`, `x-community-monitor`, `cross-channel-content-brief`, `social-launch-monitor` | Can monitor X topics/lists/communities and draft founder or brand posts from live public signals. | Direct account posting, scheduling, durable brand voice memory, autonomous cadence. |
| LinkedIn Agent: founder-voice LinkedIn posts | Partial | `founder-social-post-writer`, `linkedin-company-content-monitor`, `linkedin-founder-lead-list`, `outbound-personalization-brief`, `cross-channel-content-brief` | Can inspect public LinkedIn company/person signals and draft founder-style posts or outreach angles. | LinkedIn account posting, scheduled publishing, private account analytics, durable brand/persona memory. |
| SEO Agent: on-page fixes, keyword gaps, content opportunities, site-file checks | Partial | `seo-aeo-monitor`, `technical-seo-repo-auditor`, `youtube-topic-monitor`, `reddit-voice-of-customer`, `category-demand-scout` | Can fetch/inspect known pages, audit local repo files, check sitemap/robots/meta basics, and use social/YouTube/Reddit demand as content evidence. | SERP/rank APIs, keyword volume, historical crawler, Core Web Vitals at scale, backlink data, GSC/GA4 connectors. |
| GEO/AI visibility Agent: ChatGPT, Google AI Overviews, Perplexity, Claude citation gaps | Partial | `seo-aeo-monitor`, `web-research-agent` | Can run manual prompt/source audits and compare visible citations where the host runtime supports browsing/search. | Systematic answer-engine citation tracking, AI overview monitoring, benchmark prompt history, competitor AI visibility. |
| Analytics: SEO health, backlinks, GEO visibility, technical checks, traffic data | Partial | `growth-analytics-brief`, `backlink-mention-monitor`, `seo-aeo-monitor`, `technical-seo-repo-auditor` | Can analyze user-provided analytics/backlink exports, inspect public mentions, and run one-off technical/search visibility checks. | GA/GSC connectors, backlink index, scheduled six-hour refresh, dashboard state, and historical performance storage. |
| Articles Writer Agent: full SEO article production and CMS publish | Partial | `seo-article-writer`, `cross-channel-content-brief`, `youtube-topic-monitor`, `reddit-voice-of-customer`, `autonomous-channel-agent` | Can generate content briefs, outlines, drafts, metadata, and internal-link plans from public demand signals. | Keyword validation at scale, CMS connectors, direct publish, editorial approval queue, content performance feedback. |
| Hacker News Agent: Show HN variations and HN opportunity monitoring | Partial | `hacker-news-opportunity-monitor`, `web-research-agent` | Can use HN public pages, HN Algolia search, Firebase item feeds, or host web search to find relevant threads and draft Show HN/Ask HN/comment angles. | Persistent scheduling, account-safe posting workflow, durable launch calendar, and hosted HN connector if needed. |
| UGC Agent: guided briefs and AI video clips for social/ads | Partial | `ugc-ad-creative-brief`, `creator-comment-miner`, `multi-platform-creator-shortlist`, `paid-ads-operator` | Can create UGC hooks, scripts, shot lists, creator briefs, and test plans from audience/competitor evidence. | Video generation, asset pipeline, ad account launch, creator contracting, rights/brand safety metadata. |
| Coding Agent: technical SEO fixes and PRs | Partial | `technical-seo-repo-auditor`, `seo-aeo-monitor` | Codex/Claude Code can inspect a local repo, run scripts, patch metadata/sitemap/robots/schema issues, and summarize verification. | Hosted repo connector, PR automation product flow, CI feedback loop, and analytics-backed prioritization. |
| Publishing and integrations: Twitter/X, LinkedIn, WordPress, Webflow, Framer, GitHub, GA, GSC | Partial | `autonomous-channel-agent`, `private-workspace-signal-connector`, `seo-aeo-monitor`, `crm-export-sequence` | Can draft publishing actions and list connector requirements. | OAuth connectors for social/CMS/analytics/repos, approval queues, write APIs, analytics ingestion. |

### Okara Rollup

| Coverage class | Skills |
| --- | --- |
| Full today, on demand | `reddit-opportunity-finder`, `reddit-community-monitor`, `reddit-voice-of-customer` for Reddit opportunity discovery and reply drafting. |
| Partial today | `product-growth-strategy-brief`, `founder-social-post-writer`, `seo-article-writer`, `ugc-ad-creative-brief`, `x-social-listening`, `x-list-monitor`, `x-community-monitor`, `linkedin-company-content-monitor`, `cross-channel-content-brief`, `social-launch-monitor`, `account-signal-monitor`, `competitor-gtm-monitor`, `category-demand-scout`, `outbound-personalization-brief`. |
| Agent-native today; API productization pending | `web-research-agent`, `web-page-change-monitor`, `news-pr-monitor`, `seo-aeo-monitor`, `growth-analytics-brief`, `backlink-mention-monitor`, `hacker-news-opportunity-monitor`, `technical-seo-repo-auditor`. |
| Planned but not executable end-to-end today | `scheduled-signal-alerts`, `autonomous-channel-agent`, `private-workspace-signal-connector`. |
| Not covered by this portfolio | Actual UGC/video generation, ad launch execution, and hosted autonomous PR automation as UnifAPI product workflows. |

## Clay Capability Comparison

Clay is a table-centric GTM workflow platform with find, enrichment, web scraping, signals, web intent, transform, AI, and export surfaces. UnifAPI skills are agent-native workflows over public APIs plus host search/fetch/code, so the strongest overlap is public research, web extraction, table shaping, and signal interpretation; the biggest gaps are contact data, waterfalls, CRM writes, private connectors, persistent table runtime, and first-party web tracking.

| Clay capability | Coverage | UnifAPI skills | What is covered today | Missing before full parity |
| --- | --- | --- | --- | --- |
| Find companies | Partial | `icp-account-list-builder`, `linkedin-founder-lead-list`, `market-map-from-social`, `partner-prospect-finder`, `company-domain-enrichment`, `web-research-agent` | Can discover companies from ICP criteria, LinkedIn/social evidence, and agent-native web search, then build market or partner lists with cited confidence. | Proprietary company database, bulk domain-to-company resolution, rich firmographics, filters by revenue/headcount/tech stack/funding. |
| Find people | Partial | `linkedin-founder-lead-list`, `linkedin-people-enrichment`, `buyer-committee-mapper`, `persona-classification-agent` | Can enrich known public LinkedIn profile slugs, classify personas, and map likely buying committee roles from public signals. | People search database, private/contact fields, verified emails/phones, full identity resolution. |
| Enrich company records | Partial | `linkedin-company-content-monitor`, `linkedin-hiring-signal-finder`, `company-domain-enrichment` | Can add public LinkedIn/company content and hiring signals when identifiers are known. | Domain/company enrichment API, funding/revenue/tech-stack providers, location/headcount history. |
| Enrich person/contact records | Partial | `linkedin-people-enrichment`, `email-contact-finder`, `outbound-personalization-brief` | Can enrich public LinkedIn profile data and draft personalization from public evidence. | Work email waterfall, phone enrichment, verification, contact compliance, private CRM/contact data. |
| Work email waterfall and verification | Partial | `email-contact-finder` | Can find public contact paths and contact-readiness evidence; it does not verify private work emails. | Email finder, verifier, catch-all detection, deliverability, opt-out/suppression APIs. |
| Web scraping / structured extraction | Partial | `web-research-agent`, `web-page-change-monitor`, `gtm-table-enrichment` | Can fetch known public pages, write lightweight parsers, extract structured fields, and produce a cited table in host-agent runtimes. | Hosted rendered scraping, crawl depth, screenshots/PDF extraction, robots/compliance metadata, replayable extraction runs. |
| Signals: new hires, promotions, job changes, LinkedIn mentions, news/fundraising | Partial | `account-signal-monitor`, `abm-signal-stack-scorer`, `linkedin-hiring-signal-finder`, `competitor-talent-watch`, `news-pr-monitor`, `scheduled-signal-alerts` | Can detect LinkedIn hiring and public social/company signals on demand and stack them into account priority. | Persistent signals, scheduled runs, promotion/job-change detection at contact scale, news/fundraising API, alert delivery. |
| Web intent / visitor tracking | No current execution; planned | `web-intent-visitor-tracking`, `private-workspace-signal-connector` | Skill captures the product requirement. | First-party tracking snippet, deanonymization, page/session events, account scoring, enrichment join. |
| Transform, clean, format, and restructure table data | Partial | `gtm-table-enrichment`, `lead-account-scoring-agent`, `persona-classification-agent`, `crm-export-sequence`, `outbound-personalization-brief`, `cross-channel-content-brief` | Agents can run JS/TS/Python over CSV/JSON/Markdown tables, normalize fields, add source columns, score rows, classify personas, and produce import-ready outputs. | Persistent table model, formulas, row-level runs, column operations, versioned data workflows. |
| Gen AI / Claygent / Sculptor-style research and copy | Partial | `outbound-personalization-brief`, `outbound-sequence-generator`, `lead-account-scoring-agent`, `persona-classification-agent`, `cross-channel-content-brief`, `account-research-brief`, `web-research-agent`, `gtm-table-enrichment` | Can generate briefs, copy, personalization, sequences, scoring, persona labels, and research synthesis from cited web/social evidence and row-level inputs. | Clay table execution context, persistent per-row AI runs, integrated approval/evaluation loops. |
| Export to CRM, Slack, sales engagement, warehouse, or custom workflow | Partial | `crm-export-sequence`, `scheduled-signal-alerts`, `private-workspace-signal-connector` | Can produce export-ready field maps, CSV-style artifacts, and sequence drafts. | Salesforce/HubSpot/Slack/Salesloft/warehouse write APIs, dedupe keys, sync status, webhook delivery. |
| Integrations marketplace / 100+ providers | No current coverage as platform capability | Planned connectors only | Some public social/professional sources are covered directly by UnifAPI. | Provider marketplace, connector auth, provider-specific schemas, credit routing, data lineage. |
| Creator/influencer discovery integrations | Partial | `multi-platform-creator-shortlist`, `instagram-creator-discovery`, `youtube-creator-research`, `tiktok-trend-radar`, `kol-pricing` | Can discover and qualify public creators across supported social/video channels; X pricing is deterministic. | Audience demographics, fake-follower checks, sponsor history, cross-platform creator identity graph. |
| Webhooks and inbound workflow triggers | No current execution; planned | `scheduled-signal-alerts`, `private-workspace-signal-connector` | Skill surfaces the requirement. | Webhook endpoint management, event schema, retries, auth, replay/audit logs. |

### Clay Rollup

| Coverage class | Skills |
| --- | --- |
| Full today, on demand | None at full Clay-platform parity. UnifAPI can fully produce some research artifacts and agent-native table outputs, but not Clay's table + provider + export workflow end to end. |
| Partial today | `icp-account-list-builder`, `lead-account-scoring-agent`, `persona-classification-agent`, `abm-signal-stack-scorer`, `outbound-sequence-generator`, `linkedin-people-enrichment`, `linkedin-founder-lead-list`, `linkedin-hiring-signal-finder`, `buyer-committee-mapper`, `account-research-brief`, `company-domain-enrichment`, `email-contact-finder`, `crm-export-sequence`, `outbound-personalization-brief`, `web-research-agent`, `web-page-change-monitor`, `news-pr-monitor`, `gtm-table-enrichment`, `multi-platform-creator-shortlist`, `instagram-creator-discovery`, `youtube-creator-research`, `tiktok-trend-radar`, `kol-pricing`. |
| API backfill required for full parity | `company-domain-enrichment`, `email-contact-finder`, `crm-export-sequence`, `scheduled-signal-alerts`, `web-intent-visitor-tracking`, `private-workspace-signal-connector`. |
| Not covered by this portfolio | Clay's provider marketplace, full table runtime, webhook platform, warehouse/CRM bidirectional sync, first-party tracking snippet, and bulk waterfall enrichment. |

## New Skills Added During This Review

The current branch had good public-social coverage, but the every-skill audit found important Okara/Clay surfaces that were too implicit or only represented as gaps. These are now first-class skills:

| New skill | Why it matters | Coverage stance |
| --- | --- | --- |
| `product-growth-strategy-brief` | Okara's product intake, strategy docs, brand voice, competitor analysis, and growth playbook are a top-level job, not just a byproduct of account research. | Agent-native now; productized memory/refresh needs APIs. |
| `founder-social-post-writer` | Okara's X/LinkedIn agents are about drafting founder posts, not only listening or briefing. | Agent-native drafts now; publishing/scheduling needs APIs. |
| `seo-article-writer` | Okara's Articles Writer is a core content execution surface. | Agent-native briefs/drafts now; CMS/rank/keyword APIs needed for full parity. |
| `ugc-ad-creative-brief` | Okara's UGC agent is a distinct creative workflow. | Briefs/scripts now; video generation/ad execution needs APIs or host tools. |
| `growth-analytics-brief` | Okara analytics mentions traffic, SEO health, technical checks, and backlinks. | User exports and public checks now; GA/GSC connectors need APIs. |
| `backlink-mention-monitor` | Backlinks and mentions are a clear SEO/PR demand gap. | Public search/export analysis now; backlink index needs APIs. |
| `icp-account-list-builder` | Clay Find Companies needed a dedicated list-building skill. | Agent-native sourcing now; proprietary company database needs APIs. |
| `lead-account-scoring-agent` | Clay-style row scoring and prioritization should not be hidden inside table enrichment. | Agent-native scorecards now; persistent table scoring needs APIs. |
| `persona-classification-agent` | Persona/role classification is a common Claygent/table workflow. | Agent-native classification now; identity/table runtime needs APIs. |
| `outbound-sequence-generator` | Outbound sequence creation is a core Clay/Sales workflow beyond a single personalization brief. | Drafts and import artifacts now; sending/enrollment needs APIs. |
| `abm-signal-stack-scorer` | Clay Signals and ABM prioritization need a multi-signal account queue. | Agent-native public signal stacking now; persistent signals/CRM/web intent need APIs. |

## Per-Skill Audit Matrix

| Skill | Demand | SKILL.md quality | Decision |
| --- | --- | --- | --- |
| `abm-signal-stack-scorer` | High: Clay Signals/ABM prioritization | Complete: scorecard, runtime coverage, API backfill, guardrails | Added; keep |
| `account-research-brief` | High: sales/partner account research | Complete: clear inputs, operations, output contract | Keep |
| `account-signal-monitor` | High: trigger-event monitoring | Complete: clear public-signal boundary | Keep |
| `app-store-marketplace-monitor` | High for SaaS/app growth | Good but API-dependent for history/rank | Keep as agent-native/API-backfill |
| `autonomous-channel-agent` | High: Okara-style daily execution | Good planned-surface skill | Keep as API-backfill |
| `backlink-mention-monitor` | High: SEO/PR authority workflows | Complete: public/export path plus backlink-index gap | Added; keep |
| `buyer-committee-mapper` | High: enterprise/outbound research | Complete: role map and evidence guardrails | Keep |
| `campaign-reaction-analyst` | Medium-high: launch/campaign analysis | Complete for public reaction digests | Keep |
| `category-demand-scout` | High: demand validation | Complete: multi-source demand artifact | Keep |
| `company-domain-enrichment` | High: Clay-like enrichment | Good; honest about missing normalized APIs | Keep as agent-native/API-backfill |
| `competitor-gtm-monitor` | High: competitor GTM intelligence | Complete and distinct from owned-channel monitor | Keep |
| `competitor-talent-watch` | Medium-high: hiring/talent intelligence | Complete for public hiring signals | Keep |
| `creator-comment-miner` | High: VOC/creator audience mining | Good; correctly marks YouTube comments as gap | Keep scoped |
| `crm-export-sequence` | High: Clay CRM handoff | Good but connector-dependent | Keep as API-backfill |
| `cross-channel-competitor-monitor` | High: owned-channel comparison | Good; narrower than GTM monitor | Keep scoped |
| `cross-channel-content-brief` | High: content planning | Complete for briefs; now complemented by drafting skills | Keep |
| `crypto-narrative-monitor` | High for web3 info monitoring | Complete for social narratives | Keep |
| `discord-telegram-community-monitor` | High for web3/community teams | Good; private/community APIs are explicit gaps | Keep as API-backfill |
| `ecommerce-product-monitor` | Medium-high: commerce intelligence | Good; marketplace/product APIs needed for history | Keep as agent-native/API-backfill |
| `email-contact-finder` | High: outbound readiness | Good; properly avoids fake email verification | Keep as API-backfill |
| `founder-social-post-writer` | High: Okara X/LinkedIn parity | Complete: drafts, voice, evidence, publishing gap | Added; keep |
| `growth-analytics-brief` | High: analytics-to-actions | Complete for user exports; connector gaps explicit | Added; keep |
| `gtm-table-enrichment` | High: Clay-like table work | Complete for agent-native small batches | Keep |
| `hacker-news-opportunity-monitor` | High for technical-founder GTM | Complete using host/HN public paths | Keep |
| `icp-account-list-builder` | High: Clay Find Companies | Complete for agent-native sourcing; database gap explicit | Added; keep |
| `instagram-creator-discovery` | High for creator marketing | Complete for Instagram public discovery | Keep |
| `instagram-location-signal-monitor` | Medium: local/event/retail niche | Good; intentionally narrow | Keep scoped |
| `kol-pricing` | High: known KOL pricing workflow | Complete with deterministic script/reference | Keep |
| `lead-account-scoring-agent` | High: scoring/prioritization | Complete: explicit scorecard and row actions | Added; keep |
| `linkedin-ad-intel` | High: public ad-library intel | Complete for LinkedIn public ads | Keep |
| `linkedin-company-content-monitor` | High: LinkedIn channel intel | Complete for company-page monitoring | Keep |
| `linkedin-founder-lead-list` | High: founder/operator prospecting | Complete for public LinkedIn lead lists | Keep |
| `linkedin-hiring-signal-finder` | High: hiring as buying intent | Complete for jobs/job-count movement | Keep |
| `linkedin-people-enrichment` | High: profile enrichment | Complete for known public LinkedIn slugs | Keep |
| `market-map-from-social` | High: lightweight market mapping | Complete for public social evidence | Keep |
| `multi-platform-creator-shortlist` | High: creator campaign sourcing | Complete for public creator qualification | Keep |
| `news-pr-monitor` | High: market/news triggers | Good; news feed/history APIs are explicit gaps | Keep as agent-native/API-backfill |
| `outbound-personalization-brief` | High: targeted outreach hooks | Complete for one-off briefs | Keep |
| `outbound-sequence-generator` | High: outbound execution planning | Complete: multi-step sequence artifact and sending gap | Added; keep |
| `paid-ads-operator` | High but API-heavy | Good planned-surface skill | Keep as API-backfill |
| `partner-prospect-finder` | Medium-high: ecosystem GTM | Good; should remain scoped to public partner discovery | Keep scoped |
| `persona-classification-agent` | High: Claygent/table personas | Complete: taxonomy, confidence, abstain rules | Added; keep |
| `private-workspace-signal-connector` | High for full Clay/Okara parity | Good planned-surface skill | Keep as API-backfill |
| `product-growth-strategy-brief` | High: Okara CMO/strategy docs | Complete: product intake, evidence, playbook, handoff | Added; keep |
| `reddit-community-monitor` | High: community listening | Complete for subreddit/topic digests | Keep |
| `reddit-opportunity-finder` | High: helpful participation/replies | Complete and close to Okara on-demand parity | Keep |
| `reddit-voice-of-customer` | High: VOC language mining | Complete for public Reddit evidence | Keep |
| `scheduled-signal-alerts` | High: recurring monitors | Good; persistence/delivery gaps explicit | Keep as API-backfill |
| `seo-aeo-monitor` | High: SEO/GEO/AEO | Good; systematic rank/AEO APIs still needed | Keep scoped |
| `seo-article-writer` | High: Okara Articles Writer/content-to-pipeline | Complete for briefs/drafts; CMS gap explicit | Added; keep |
| `social-launch-monitor` | High: launch monitoring | Complete for public social reactions | Keep |
| `technical-seo-repo-auditor` | High: agent-native coding/SEO fixes | Complete for local repo/web checks | Keep |
| `threads-opportunity-monitor` | Medium-high: Threads opportunities | Complete for supported Threads surfaces | Keep |
| `tiktok-trend-radar` | High: trend/creator research | Complete for TikTok public discovery | Keep |
| `token-community-sentiment-pulse` | High for web3 teams | Complete for public sentiment pulse | Keep |
| `ugc-ad-creative-brief` | High: UGC/ad creative demand | Complete for briefs/scripts; video/ad execution gap explicit | Added; keep |
| `unifapi` | Core platform skill | Complete: OAuth MCP, API discovery, public-data boundary | Keep |
| `web-intent-visitor-tracking` | High: Clay web intent | Good planned-surface skill | Keep as API-backfill |
| `web-page-change-monitor` | High: pricing/docs/page diffs | Good; durable snapshots/alerts need APIs | Keep scoped |
| `web-research-agent` | High: general web research | Complete for host-agent search/fetch workflows | Keep |
| `web3-kol-watchlist` | High: web3 KOL monitoring | Complete for public social watchlists | Keep |
| `web3-launch-watch` | High: launch/airdrop/testnet monitoring | Complete for social launch signals | Keep |
| `web3-onchain-monitor` | High: on-chain intelligence | Good planned-surface skill | Keep as API-backfill |
| `x-community-monitor` | Medium-high: niche X community intel | Complete for current X Community APIs | Keep scoped |
| `x-list-monitor` | Medium-high: curated watchlists | Complete for current X List APIs | Keep scoped |
| `x-social-listening` | High: X social listening | Complete for recent public X search | Keep |
| `youtube-creator-research` | High: sponsorship/content research | Complete for channel/video surfaces | Keep |
| `youtube-topic-monitor` | High: YouTube topic demand | Complete for public YouTube discovery | Keep |

## Review Decisions

### Strong Keep

These skills have clear demand, strong runtime/API fit, and specific outputs:

- `abm-signal-stack-scorer`
- `account-research-brief`
- `account-signal-monitor`
- `buyer-committee-mapper`
- `competitor-gtm-monitor`
- `linkedin-ad-intel`
- `linkedin-founder-lead-list`
- `linkedin-hiring-signal-finder`
- `linkedin-people-enrichment`
- `outbound-personalization-brief`
- `reddit-opportunity-finder`
- `reddit-community-monitor`
- `reddit-voice-of-customer`
- `x-social-listening`
- `social-launch-monitor`
- `cross-channel-content-brief`
- `instagram-creator-discovery`
- `multi-platform-creator-shortlist`
- `youtube-creator-research`
- `tiktok-trend-radar`
- `crypto-narrative-monitor`
- `token-community-sentiment-pulse`
- `web3-kol-watchlist`
- `web3-launch-watch`
- `web-research-agent`
- `gtm-table-enrichment`
- `icp-account-list-builder`
- `hacker-news-opportunity-monitor`
- `lead-account-scoring-agent`
- `outbound-sequence-generator`
- `persona-classification-agent`
- `product-growth-strategy-brief`
- `founder-social-post-writer`
- `seo-article-writer`
- `ugc-ad-creative-brief`
- `technical-seo-repo-auditor`

### Keep, But Narrowly Scoped

These are useful but need tighter expectations:

- `partner-prospect-finder`: useful for social/professional partner discovery, not complete domain/company enrichment.
- `cross-channel-competitor-monitor`: useful for owned-channel comparison; use `competitor-gtm-monitor` for broader GTM intelligence.
- `creator-comment-miner`: strong for platforms with comment/reaction operations; YouTube comment mining is a gap.
- `instagram-location-signal-monitor`: useful for local/event/retail/hospitality scenarios, not a universal GTM skill.
- `x-community-monitor` and `x-list-monitor`: strong when the user has community/list context, especially for web3 and niche markets.
- `youtube-topic-monitor`: strong for YouTube public discovery, not SEO keyword volume or rank tracking.
- `seo-aeo-monitor`: executable for agent-native page checks and demand research, but not systematic rank/keyword/GSC reporting.
- `web-page-change-monitor`: executable for one-off known-page comparisons, but not durable scheduled diffs until monitor infrastructure exists.
- `backlink-mention-monitor`: strong for public mentions and user exports, but not complete backlink coverage without a backlink index.
- `growth-analytics-brief`: strong when the user supplies analytics exports, but not live GA/GSC/product analytics without connectors.

### Agent-Native With API Backfill

These needs are real and important enough to expose as skill surfaces now. They can run with host-agent search/fetch/shell/code for one-off workflows, while still listing productized API backfill requirements:

- `seo-aeo-monitor`
- `web-research-agent`
- `web-page-change-monitor`
- `news-pr-monitor`
- `company-domain-enrichment`
- `gtm-table-enrichment`
- `hacker-news-opportunity-monitor`
- `technical-seo-repo-auditor`
- `app-store-marketplace-monitor`
- `ecommerce-product-monitor`
- `backlink-mention-monitor`
- `growth-analytics-brief`
- `product-growth-strategy-brief`
- `founder-social-post-writer`
- `seo-article-writer`
- `ugc-ad-creative-brief`
- `icp-account-list-builder`
- `lead-account-scoring-agent`
- `persona-classification-agent`
- `outbound-sequence-generator`
- `abm-signal-stack-scorer`

### API Backfill Skills

These skills should stay visible because demand is strong, but they are not executable end-to-end until the missing product APIs, connectors, or persistence layers exist:

- `email-contact-finder`
- `crm-export-sequence`
- `scheduled-signal-alerts`
- `autonomous-channel-agent`
- `paid-ads-operator`
- `web3-onchain-monitor`
- `discord-telegram-community-monitor`
- `web-intent-visitor-tracking`
- `private-workspace-signal-connector`

Keep missing productized API primitives in [API Coverage Gaps](./api-coverage-gaps.md) until the API surface exists. Agent-native search/fetch/code paths should still run when they can produce real evidence.

## Issues Found During Review

| Issue | Fix |
| --- | --- |
| Some company/account skills implied arbitrary company-name or domain resolution, but current OpenAPI has LinkedIn company-by-slug, not a full company search/enrichment API. | Tightened relevant skills to ask for LinkedIn company URL/slug or official handles when needed. |
| `creator-comment-miner` could be read as promising YouTube comment mining, but current YouTube API coverage exposes video/channel surfaces, not comments. | Added explicit YouTube comment limitation and moved deeper engagement surfaces into the gap doc. |
| `competitor-gtm-monitor` and `cross-channel-competitor-monitor` had overlap. | Clarified that one is broader GTM intelligence and the other is owned-channel cadence/comparison. |
| Prior catalog wording risked treating generic search/fetch/code as UnifAPI-only gaps. | Added the runtime assumption: agent-native web research, page checks, HN monitoring, and table enrichment can run now; APIs are for productized scale, state, connectors, and compliance. |
| Core Okara/Clay surfaces were present only implicitly or as gaps: strategy docs, founder posts, SEO article writing, UGC briefs, analytics, backlinks, ICP list building, scoring, persona classification, outbound sequences, and ABM signal stacking. | Added eleven first-class skills so agents can run one-off workflows now and record productized API dependencies for later. |

## Current Verdict

The portfolio is strong enough to ship as a broad public-data and agent-native GTM skill set. It should be positioned as:

> Clay-like GTM data workflows and Okara-like channel-agent outputs, powered by UnifAPI public social/professional APIs plus agent-native search, fetch, shell, code execution, and user-provided files/exports.

Do not position it as a full Clay or Okara product replacement until the platform/API gap categories in [API Coverage Gaps](./api-coverage-gaps.md) are covered.
