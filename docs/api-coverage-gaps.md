# API Coverage Gaps

This document records strong user demand that UnifAPI Skills should acknowledge but cannot fully satisfy with the current UnifAPI public API surface.

Current API surface checked on 2026-05-27 from `https://api.unifapi.com/openapi.json`: Instagram, LinkedIn, Reddit, Threads, TikTok, X, and YouTube. These APIs support a strong public-social GTM and monitoring portfolio, but they do not yet cover several Okara-like and Clay-like workflow primitives.

Several P0/P1 gaps now have Planned Core Skills. Those skills should remain discoverable and useful for workflow design even before every API is ready, but they must not claim full execution until the missing coverage below is implemented.

## Summary

| Gap | User demand | Current proxy | Missing API coverage | Priority |
| --- | --- | --- | --- | --- |
| SEO and AEO | Audit rankings, SERP visibility, competitors, content gaps, answer-engine mentions, technical SEO | YouTube/social topic demand and Reddit VOC can inspire content, but not prove SEO performance | SERP API, keyword volume/difficulty, rank tracking, sitemap crawl, page crawl, backlink data, GSC/GA4 connectors, answer-engine citation tracking | P0; planned skill `seo-aeo-monitor` |
| Generic web search | Find companies, pages, pricing pages, docs, launches, news, and fresh web mentions outside social platforms | Social search on X/LinkedIn/Reddit/YouTube/TikTok | Web search API, web page retrieval, structured snippet extraction, freshness filters, domain constraints | P0; planned skill `web-research-agent` |
| Web scraping and page extraction | Clay-style table enrichment from websites, docs, product pages, job pages, app stores, pricing pages | LinkedIn company/jobs and public social profiles | URL fetch, rendered page scrape, schema extraction, crawl depth controls, robots/compliance metadata, screenshot/PDF extraction | P0; planned skill `web-page-change-monitor` |
| News and PR monitoring | Monitor launches, funding, executive changes, incidents, regulatory changes, market narratives | Social launch monitoring and LinkedIn company posts | News search, publisher metadata, press-release feeds, source credibility, entity extraction, deduplication | P0; planned skill `news-pr-monitor` |
| Company/domain enrichment | Start from domain and enrich firmographics, category, headcount, funding, tech stack, locations, social handles | LinkedIn company slug when known | Domain-to-company resolution, firmographics, funding, technology stack, company social-handle discovery, employee-count history | P0; planned skill `company-domain-enrichment` |
| Email/contact discovery | Build outbound-ready lead lists with verified work emails, role emails, phone numbers, and verification | Public LinkedIn contact block only when exposed | Email finder, email verifier, phone enrichment, catch-all detection, compliance flags, opt-out/suppression integration | P0; planned skill `email-contact-finder` |
| CRM and sales engagement | Clay-like export, Salesforce/HubSpot sync, sequences, dedupe, account ownership, status updates | Markdown/CSV-style artifacts produced by agents | CRM connectors, lead/account object model, dedupe keys, field mapping, export/write APIs, sales engagement connectors | P1; planned skill `crm-export-sequence` |
| Private workspace signals | Use customer CRM, product analytics, email, calendar, Slack, Notion, docs, support tickets | None; UnifAPI OAuth is for workspace credits, not upstream private accounts | User-authorized connectors for private SaaS accounts, permissions, audit log, source-level consent | P1; planned skill `private-workspace-signal-connector` |
| Autonomous channel execution | Okara-style daily channel agents that draft and publish posts, comments, newsletters, or replies | Skills can draft actions but must not publish | Social posting APIs, approval queues, scheduling, CMS/newsletter publishing, brand voice memory, moderation workflow | P1; planned skill `autonomous-channel-agent` |
| Paid ads operations | Launch, monitor, or optimize Google/Meta/LinkedIn/TikTok ads and read spend/conversion data | LinkedIn Ad Library can observe public competitor creative only | Ad account OAuth, campaign read/write, spend, impressions, CTR, conversion events, creative upload, budget controls | P1; planned skill `paid-ads-operator` |
| Deep creator pricing | Price creators across Instagram, TikTok, YouTube, LinkedIn, and Threads with platform-specific models | `kol-pricing` only covers X/Twitter pricing today; other creator skills shortlist and qualify | Platform-specific pricing benchmarks, audience demographics, historical sponsor performance, fake-follower checks, contract templates | P1 |
| Deeper engagement surfaces | Mine complete comments, replies, mentions, and audience reactions across every creator platform | Comments exist for several platforms, but YouTube comments and some X/Threads reply-style surfaces are not complete | YouTube comments, X replies/conversation trees, Threads post-level replies, cross-platform comment pagination consistency | P1 |
| Social identity resolution | Merge the same person/company across X, LinkedIn, TikTok, YouTube, Instagram, Threads, Reddit | Manual evidence and cautious inference | Cross-platform identity graph, confidence scores, official-handle discovery, conflict resolution | P1 |
| Scheduling and alerting | Run monitors daily/weekly and notify users when thresholds are crossed | Skills can describe monitor queries, but cannot persist or notify by themselves | Saved monitors, schedules, diff storage, thresholds, email/Slack/webhook alerts, event history | P1; planned skill `scheduled-signal-alerts` |
| On-chain web3 | Monitor wallets, token holders, contracts, whale moves, TVL, DEX volume, NFT mints, governance | Web3 skills only use public social narratives and communities | Wallet/contract APIs, chain indexers, token price/liquidity, NFT collection data, governance/forum data, risk labels | P0 for web3; planned skill `web3-onchain-monitor` |
| Crypto market data | Combine social narratives with price, volume, liquidity, exchange listings, and volatility | Social sentiment and narrative monitoring | Price feeds, DEX/CEX market data, token metadata, liquidity pools, listing events | P1 |
| Community platforms | Monitor Discord, Telegram, Slack communities, Discourse forums, GitHub discussions/issues | Reddit/X Communities/Threads only | Discord/Telegram public or OAuth connectors, forum crawlers, GitHub repo/issues/discussions APIs | P1; planned skill `discord-telegram-community-monitor` |
| App stores and marketplaces | Track reviews, ratings, competitors, categories, Shopify apps, Chrome extensions, SaaS marketplaces | Social and YouTube reviews only | App Store, Google Play, Chrome Web Store, Shopify App Store, G2/Capterra/Product Hunt APIs or scrapers | P1; planned skill `app-store-marketplace-monitor` |
| Ecommerce/product data | Monitor products, prices, reviews, SKUs, marketplaces, affiliate catalogs | Instagram/TikTok/YouTube content around products | Amazon/Shopify/marketplace product APIs, price tracking, review extraction, SKU matching | P2; planned skill `ecommerce-product-monitor` |
| Compliance and safety metadata | Know source terms, rate limits, permissions, and whether an output is safe for outbound automation | Skill guardrails only | Per-source compliance metadata, retention rules, usage restrictions, PII flags, audit exports | P1 |

## Product Implications

- The first Workflow Portfolio should be positioned as public-social GTM intelligence, creator discovery, social listening, competitor monitoring, and web3 social monitoring.
- Skills must not promise full Clay replacement until domain/company enrichment, email finding, CRM export, web scraping, and scheduling exist.
- Skills must not promise full Okara replacement until autonomous channel execution, scheduled monitors, publishing, SEO/AEO, and private workspace connectors exist.
- Web3 skills are useful today for narrative and community monitoring, but on-chain and market-data APIs are required before UnifAPI can claim full web3 intelligence.

## Recommended API Roadmap Buckets

1. **Web and SEO foundation**: SERP, keyword, URL scrape, rendered extraction, sitemap crawl, page metadata, answer-engine visibility.
2. **GTM enrichment foundation**: domain-to-company, company enrichment, social-handle discovery, email finder/verifier, firmographics, tech stack.
3. **Monitor infrastructure**: saved queries, schedules, diffs, thresholds, notification destinations, event history.
4. **Private connectors**: CRM, email, calendar, Slack, Notion, support tools, analytics tools, with clear OAuth scope and audit metadata.
5. **Web3 data foundation**: wallet/contract/token/NFT/governance/market data, then social-plus-on-chain correlation.

## How Skills Should Reference Gaps

When a user asks for unsupported coverage, the agent should:

1. State what the current social API can support.
2. Name the missing API category from this document.
3. Offer a useful partial workflow only if it will not mislead the user.
4. Add the gap to future planning if it is a repeated or high-value request.
