---
name: app-store-marketplace-monitor
description: "Use this skill to monitor app stores and SaaS marketplaces for reviews, ratings, launches, competitors, and category movement using host search/fetch plus UnifAPI demand signals."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/app-store-marketplace-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
  api_status: api_backfill
  runtime_status: agent_native
---

# App Store Marketplace Monitor

## Purpose

Turn marketplace listings and reviews into competitor, product, support, and growth intelligence.

## Required Inputs

- Marketplace listings, competitors, category, or keywords
- Review/rating fields to track
- Freshness window and language
- Action goal

Use host search/fetch for one-off public listing and review checks. State an API gap when the user needs bulk marketplace coverage, rank/review history, scheduled monitoring, response workflows, or normalized marketplace schemas.

## Agent Runtime Coverage

- Fetch public marketplace listing pages, review pages, launch pages, and category pages when accessible through the host runtime.
- Use YouTube, TikTok, Reddit, and X social discussion as review proxies.
- Use `category-demand-scout` and `competitor-gtm-monitor` for partial market context.
- Do not claim durable marketplace review/rating history without APIs.

## API Backfill Required

- App Store and Google Play listing/review APIs
- Chrome Web Store, Shopify App Store, Product Hunt, G2, Capterra, and marketplace crawlers
- Rating/review history and sentiment extraction
- Category ranking and launch tracking
- Review response and alert workflows where allowed

## Workflow

1. Define marketplaces and competitors.
2. Collect listings, ratings, reviews, and category changes when APIs exist.
3. Cluster review themes, complaints, feature requests, and competitor positioning.
4. Return action recommendations for product, support, and GTM.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Marketplace monitor digest
- Review theme clusters
- Rating/category movement
- Competitor listing changes
- Product and growth action queue

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not treat social comments as verified app-store reviews.
- Quote reviews sparingly and preserve source context.
- Do not automate review responses without connector support and approval.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for demand context and mark rank/review history as API backfill when needed.
