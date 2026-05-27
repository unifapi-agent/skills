# Public-Data Boundary

Use UnifAPI when the workflow needs supported public records from social and professional platforms.

Current public API coverage checked on 2026-05-27: Instagram, LinkedIn, Reddit, Threads, TikTok, X, and YouTube. Treat generic web search, one-off page extraction, news research, technical SEO checks, local file transforms, and code edits as host-agent capabilities when the runtime provides them. Treat CRM writes, email verification, publishing, paid ads, on-chain web3, private connectors, saved monitors, and productized bulk enrichment as API or connector gaps unless `list_operations` shows newer operations.

## Good Fits

| Workflow | Public evidence to fetch |
| --- | --- |
| KOL pricing | X/Twitter profiles, recent tweets, engagement, follower counts |
| Creator discovery | Social search, profiles, recent posts, audience fit signals |
| Social listening | Mentions, posts, comments, trend context |
| Competitive intelligence | LinkedIn company posts/jobs/ads, X mentions, Reddit comments, creator videos |
| Market research | Public social discussions, comments, videos, professional posts |
| Trend discovery | TikTok, YouTube, Reddit, X, Threads, Instagram |
| Lead enrichment | LinkedIn public profiles, public contact blocks, posts, experience, skills |
| Web3 monitoring | Public social narratives, X Communities/Lists, Reddit, YouTube, TikTok, Threads |
| Agent-native web research | Host search/fetch/browser plus UnifAPI social or LinkedIn context when useful |

## Bad Fits

Use another integration path when the task needs:

- private user email, calendar, CRM, Slack, Linear, Notion, or GitHub data
- OAuth into a user's own upstream account
- actions that write to third-party SaaS tools
- login-walled browser sessions
- SEO rank tracking, keyword volume, backlinks, GSC/GA4 metrics, or durable answer-engine monitoring
- productized generic web search, rendered scraping, news monitoring, bulk domain enrichment, or email verification
- on-chain wallet, token, contract, NFT, liquidity, or governance data

UnifAPI OAuth is only for the UnifAPI workspace. It does not grant upstream account access.

For repeated or product-critical missing coverage, add or reference the appropriate item in [../../../docs/api-coverage-gaps.md](../../../docs/api-coverage-gaps.md).

## Output Standard

Do not return raw API dumps unless the user asks for raw JSON. Return a decision artifact:

- summary or ranked table
- evidence with the operation names used
- assumptions and confidence
- missing evidence
- recommended next calls
- billing metadata or record-cost estimate when available
