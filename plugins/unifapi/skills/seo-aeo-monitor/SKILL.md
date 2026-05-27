---
name: seo-aeo-monitor
description: "Use this planned skill for SEO, GEO/AEO, SERP visibility, answer-engine mentions, rank tracking, technical SEO, and content gaps. Runs social demand proxies today and names required search/SEO APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/seo-aeo-monitor
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# SEO AEO Monitor

## Purpose

Track whether a product, brand, page, or competitor is discoverable through search engines and answer engines, then produce prioritized content, technical, and distribution actions.

## Required Inputs

- Target domain, brand, product, or URL set
- Competitors and priority topics
- Geography/language and monitoring cadence
- Search engines or answer engines to track

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use Reddit VOC, YouTube topic monitoring, X/LinkedIn social discussion, and competitor social posts as content-demand proxies.
- Use existing skills such as `reddit-voice-of-customer`, `youtube-topic-monitor`, `category-demand-scout`, and `competitor-gtm-monitor` to support partial research.
- Do not claim rank, traffic, backlink, or answer-engine coverage until backfill APIs exist.

## API Backfill Required

- SERP result API with keyword, locale, device, and freshness controls
- Keyword volume, difficulty, CPC, and trend data
- Rank tracking with historical diffs
- Sitemap crawl and rendered page crawl
- Technical SEO audit fields: status, canonical, title, meta, headings, schema, internal links, indexability
- Backlink and referring-domain data
- GSC, GA4, and answer-engine citation/mention tracking

## Workflow

1. Define the search surface: topics, competitors, pages, locale, and monitoring cadence.
2. Run current proxy research only when SEO APIs are missing, and label it as demand research rather than SEO proof.
3. When backfill APIs are available, collect SERP, rank, page, backlink, and answer-engine evidence.
4. Prioritize fixes and content opportunities by impact, confidence, and implementation effort.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- SEO/AEO visibility brief
- Keyword/topic opportunity table
- Competitor SERP and answer-engine comparison
- Technical/content issues
- Prioritized action plan
- Current API gaps used as caveats

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not present social demand proxies as rankings or traffic.
- Do not create this as a full SEO audit until search, crawl, and analytics APIs are available.
- Separate observed search evidence from content strategy inference.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
