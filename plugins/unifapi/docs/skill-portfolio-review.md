# Skill Portfolio Review

Review date: 2026-05-27

This review checks whether the UnifAPI Skills portfolio is high quality, mapped to strong demand, and honest about current API coverage.

## Evidence Used

- Current UnifAPI OpenAPI: `https://api.unifapi.com/openapi.json`
- Okara docs: `https://okara.ai/docs/introduction`
- Clay University docs: `https://university.clay.com/docs`
- Clay Signals docs: `https://university.clay.com/docs/signals`
- Clay Web intent docs: `https://university.clay.com/docs/website-tracking`
- Skills.sh find-skills workflow: `https://www.skills.sh/vercel-labs/skills/find-skills`
- `npx skills find "GTM growth marketing SEO social listening web3"`
- `npx skills find "Clay lead enrichment CRM outbound"`
- `npx skills find "web3 crypto onchain monitor discord telegram"`

## Review Criteria

| Criterion | What good looks like |
| --- | --- |
| Strong demand | The skill maps to a clear GTM, growth, creator, or web3 monitoring job that products like Okara or Clay already make legible. |
| API fit | The skill can be executed with current UnifAPI operations or clearly names unsupported parts as coverage gaps. |
| Actionable output | The output is a decision artifact: ranked list, brief, digest, monitor, shortlist, or action plan. |
| Clear trigger | The description tells an agent when to use the skill, not just which endpoint exists. |
| Bounded promise | The skill either works on current APIs or is explicitly marked as a Planned Core Skill with current proxy coverage and API backfill requirements. |
| Non-overlap | Similar skills have different primary jobs and point to each other when a neighboring skill is better. |

## External Skill Search

The Skills.sh search results support the same demand clusters, but no external skill should be copied into this repo as-is. Most relevant public skills are playbook-heavy and tool-agnostic, while this portfolio must stay tied to UnifAPI execution boundaries.

| Search theme | Notable matches | What it confirms | Portfolio decision |
| --- | --- | --- | --- |
| GTM/growth/social listening | `gtm-leader` (122 installs), `web3-growth` (76), `gtm-philosophy` (56), `content-to-pipeline` (53), `web3-protocol-gtm` (36), `marketing-skills-guide` (34) | Users already look for GTM strategy, content-to-pipeline, and web3 GTM skills. | Keep GTM/growth/web3 categories, but anchor them in public social/professional data and decision artifacts. |
| Clay/enrichment/outbound | `lead-enrichment` (91), `sales-enrich` (72), `lead-sources-guide` (57), `clay-enrichment-9step` (53), `lead-enrichment` (51), `sales-clay` (34) | Enrichment waterfalls, CRM handoff, contact data quality, and outbound readiness are real skill demand. | Keep `company-domain-enrichment`, `email-contact-finder`, and `crm-export-sequence` as Planned Core until those APIs exist. |
| Web3/community monitoring | `software-crypto-web3` (331), `web3-growth` (76), `web3-protocol-gtm` (36) | Web3 GTM and crypto monitoring are visible enough to justify dedicated skills. | Keep current social web3 monitors and mark on-chain/Discord/Telegram as Planned Core API gaps. |

Representative inspected skills (`lead-enrichment`, `sales-enrich`, `clay-enrichment-9step`, `web3-protocol-gtm`) are useful as demand and UX references, but they rely on external platforms, generic advice, or future data sources. UnifAPI skills should not import provider-specific claims unless UnifAPI can execute them or the skill clearly marks them as backfill.

## Skill-Creator Compliance Check

The portfolio now follows the core `skill-creator` guidance:

- Every skill has lowercase hyphen `name`, trigger-focused `description`, and `agents/openai.yaml`.
- Detailed repo/process docs live outside individual skill folders; skill folders stay limited to `SKILL.md`, `agents/`, and needed `references/` or `scripts/`.
- Planned Core skills are explicit: `metadata.api_status: planned`, `Current Coverage`, `API Backfill Required`, and guardrails that prevent over-promising.
- Planned Core `agents/openai.yaml` files now have unique human-facing short descriptions and default prompts instead of a generic placeholder.
- Long frontmatter descriptions were tightened for `unifapi`, `kol-pricing`, `creator-comment-miner`, and the Planned Core skills to reduce always-loaded context while preserving trigger coverage.

## Demand Map

| Demand area | Evidence of demand | Skills that cover it | Coverage quality |
| --- | --- | --- | --- |
| Account research and signal monitoring | Clay docs emphasize Find, Enrich, Signals, new hires, job changes, promotions, web intent, and export workflows. | `account-research-brief`, `account-signal-monitor`, `linkedin-hiring-signal-finder`, `linkedin-people-enrichment`, `buyer-committee-mapper`, `company-domain-enrichment`, `web-intent-visitor-tracking`, `crm-export-sequence` | Strong for LinkedIn/public social signals today; Planned Core skills capture domain enrichment, web intent, CRM, and export APIs to backfill. |
| Competitor and market intelligence | Okara positions competitor analysis and daily channel agents as core marketing output; Clay signals include company events and mentions. | `competitor-gtm-monitor`, `cross-channel-competitor-monitor`, `market-map-from-social`, `category-demand-scout`, `news-pr-monitor`, `web-page-change-monitor`, `web-research-agent` | Strong for public social and LinkedIn activity today; Planned Core skills capture news, generic web, and page monitoring APIs to backfill. |
| Channel-agent growth work | Okara explicitly presents Reddit, SEO, X, LinkedIn, Writer, HN, UGC, and daily opportunity/content agents. | `reddit-opportunity-finder`, `reddit-community-monitor`, `x-social-listening`, `threads-opportunity-monitor`, `cross-channel-content-brief`, `social-launch-monitor`, `seo-aeo-monitor`, `scheduled-signal-alerts`, `autonomous-channel-agent` | Strong for supported social channels today; Planned Core skills capture SEO/AEO, scheduling, publishing, and autonomous channel execution APIs to backfill. |
| Creator marketing | Existing `kol-pricing` demand and current social APIs support creator/profile/video/post/comment workflows. | `kol-pricing`, `multi-platform-creator-shortlist`, `instagram-creator-discovery`, `youtube-creator-research`, `creator-comment-miner`, `tiktok-trend-radar` | Strong for discovery and qualification; platform-specific pricing, YouTube comments, fake-follower checks, and audience demographics are gaps. |
| Web3 information-source monitoring | User explicitly requested web3 information-source monitors; X/Reddit/YouTube/TikTok are high-signal public web3 channels. | `crypto-narrative-monitor`, `token-community-sentiment-pulse`, `web3-kol-watchlist`, `web3-launch-watch`, `x-community-monitor`, `x-list-monitor`, `web3-onchain-monitor`, `discord-telegram-community-monitor` | Strong for social narrative monitoring today; Planned Core skills capture on-chain and Discord/Telegram/community APIs to backfill. |

## Review Decisions

### Strong Keep

These skills have clear demand, strong API fit, and specific outputs:

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

### Keep, But Narrowly Scoped

These are useful but need tighter expectations:

- `partner-prospect-finder`: useful for social/professional partner discovery, not complete domain/company enrichment.
- `cross-channel-competitor-monitor`: useful for owned-channel comparison; use `competitor-gtm-monitor` for broader GTM intelligence.
- `creator-comment-miner`: strong for platforms with comment/reaction operations; YouTube comment mining is a gap.
- `instagram-location-signal-monitor`: useful for local/event/retail/hospitality scenarios, not a universal GTM skill.
- `x-community-monitor` and `x-list-monitor`: strong when the user has community/list context, especially for web3 and niche markets.
- `youtube-topic-monitor`: strong for YouTube public discovery, not SEO keyword volume or rank tracking.

### Planned Core Skills

These needs are real and important enough to expose as skill surfaces now. They are intentionally marked as Planned Core Skills and must list current proxy coverage plus API backfill requirements:

- `seo-aeo-monitor`
- `web-research-agent`
- `web-page-change-monitor`
- `news-pr-monitor`
- `company-domain-enrichment`
- `email-contact-finder`
- `crm-export-sequence`
- `scheduled-signal-alerts`
- `autonomous-channel-agent`
- `paid-ads-operator`
- `web3-onchain-monitor`
- `discord-telegram-community-monitor`
- `app-store-marketplace-monitor`
- `ecommerce-product-monitor`
- `web-intent-visitor-tracking`
- `private-workspace-signal-connector`

Keep their missing API primitives in [API Coverage Gaps](./api-coverage-gaps.md) until the API surface exists.

## Issues Found During Review

| Issue | Fix |
| --- | --- |
| Some company/account skills implied arbitrary company-name or domain resolution, but current OpenAPI has LinkedIn company-by-slug, not a full company search/enrichment API. | Tightened relevant skills to ask for LinkedIn company URL/slug or official handles when needed. |
| `creator-comment-miner` could be read as promising YouTube comment mining, but current YouTube API coverage exposes video/channel surfaces, not comments. | Added explicit YouTube comment limitation and moved deeper engagement surfaces into the gap doc. |
| `competitor-gtm-monitor` and `cross-channel-competitor-monitor` had overlap. | Clarified that one is broader GTM intelligence and the other is owned-channel cadence/comparison. |
| Prior catalog wording risked over-promising search/scrape/news coverage. | Front-door wording now focuses on public social and professional-platform data; unsupported primitives are listed as gaps. |

## Current Verdict

The portfolio is strong enough to ship as a broad public-social GTM skill set. It should be positioned as:

> Clay-like GTM data workflows and Okara-like channel-agent outputs, powered by UnifAPI public social and professional-platform APIs.

Do not position it as a full Clay or Okara replacement until the gap categories in [API Coverage Gaps](./api-coverage-gaps.md) are covered.
