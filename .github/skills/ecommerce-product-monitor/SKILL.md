---
name: ecommerce-product-monitor
description: "Use this skill to track ecommerce products, SKUs, prices, reviews, availability, bundles, affiliate catalogs, and marketplace listings using host search/fetch plus UnifAPI social demand signals."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/ecommerce-product-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
  api_status: api_backfill
  runtime_status: agent_native
---

# Ecommerce Product Monitor

## Purpose

Monitor public product and marketplace movement for ecommerce growth, affiliate strategy, competitive pricing, and customer voice.

## Required Inputs

- Products, SKUs, brands, marketplaces, or categories
- Price/review/availability fields
- Competitors and regions
- Monitoring cadence

Use host search/fetch for one-off public product page checks and use UnifAPI social/video evidence for demand and creator context. State an API gap when the user needs price history, stock monitoring, SKU matching at scale, affiliate feeds, or normalized marketplace schemas.

## Agent Runtime Coverage

- Fetch public product, review, price, and marketplace listing pages when accessible through the host runtime.
- Use Instagram, TikTok, YouTube, Reddit, and X social content around products as demand and creator proxies.
- Use `instagram-location-signal-monitor`, `tiktok-trend-radar`, and `youtube-topic-monitor` for partial social evidence.
- Do not claim durable price, stock, review, or SKU history without ecommerce APIs.

## API Backfill Required

- Marketplace product search and detail APIs
- Price and availability tracking
- Review extraction and rating history
- SKU/variant matching
- Affiliate catalog feeds and commission metadata
- Retailer compliance and crawl metadata

## Workflow

1. Define product universe, competitors, and fields to monitor.
2. Collect product/price/review data when APIs exist.
3. Correlate product movement with social creator and demand signals.
4. Return pricing, content, affiliate, or inventory recommendations.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Product monitor table
- Price/availability/review changes
- Social demand proxy
- Affiliate or creator opportunities
- Coverage gaps

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not infer exact prices or stock from social posts.
- Respect marketplace terms and affiliate disclosure requirements.
- Keep SKU matching confidence visible.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for demand context and mark price/SKU history as API backfill when needed.
