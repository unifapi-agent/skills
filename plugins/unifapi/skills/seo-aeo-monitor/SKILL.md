---
name: seo-aeo-monitor
description: "Use this skill for SEO, GEO/AEO, SERP visibility, answer-engine mentions, rank tracking, technical SEO, and content gaps using host-agent search/fetch/shell plus UnifAPI demand signals."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/seo-aeo-monitor
  source: https://github.com/unifapi-agent/skills
  category: SEO
  api_status: api_backfill
  runtime_status: agent_native
---

# SEO AEO Monitor

## Purpose

Track whether a product, brand, page, or competitor is discoverable through search engines and answer engines, then produce prioritized content, technical, and distribution actions.

## Required Inputs

- Target domain, brand, product, or URL set
- Competitors and priority topics
- Geography/language and monitoring cadence
- Search engines or answer engines to track

Use host search, fetch/browser, shell, JS/TS, Python, and local repo editing for one-off public SEO checks and technical fixes. State an API gap only when the user needs systematic rank tracking, keyword metrics, backlinks, analytics connectors, historical crawls, or durable AEO monitoring.

## Agent Runtime Coverage

- Fetch and inspect known public pages, robots.txt, sitemap.xml, llms.txt, titles, meta descriptions, canonicals, headings, links, and schema where the host runtime permits.
- Inspect and patch local repository files when the user is working in a codebase and asks for implementation.
- Use host web search for spot-checking SERP/answer visibility, clearly labeled as spot evidence rather than rank tracking.
- Use Reddit VOC, YouTube topic monitoring, X/LinkedIn social discussion, and competitor social posts as content-demand proxies.
- Use existing skills such as `reddit-voice-of-customer`, `youtube-topic-monitor`, `category-demand-scout`, and `competitor-gtm-monitor` to support partial research.
- Do not claim systematic rank, traffic, backlink, or answer-engine coverage until backfill APIs exist.

## API Backfill Required

- SERP result API with keyword, locale, device, and freshness controls
- Keyword volume, difficulty, CPC, and trend data
- Rank tracking with historical diffs
- Sitemap crawl and rendered page crawl
- Technical SEO audit fields: status, canonical, title, meta, headings, schema, internal links, indexability
- Backlink and referring-domain data
- GSC, GA4, and answer-engine citation/mention tracking

## Workflow

1. Define the search surface: topics, competitors, pages, locale, repo scope, and monitoring cadence.
2. Run agent-native page/repo checks and demand research when SEO APIs are missing, and label spot evidence separately from tracked SEO proof.
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

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not present social demand proxies as rankings or traffic.
- Do not present spot SERP checks as durable rank tracking.
- Separate observed search evidence from content strategy inference.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `technical-seo-repo-auditor` when the user wants codebase inspection or implementation of SEO fixes.
