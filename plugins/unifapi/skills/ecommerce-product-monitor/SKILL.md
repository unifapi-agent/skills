---
name: ecommerce-product-monitor
description: "Use this planned skill to track ecommerce products, SKUs, prices, reviews, availability, bundles, affiliate catalogs, and marketplace listings. Current APIs observe social content; full execution needs product APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/ecommerce-product-monitor
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# Ecommerce Product Monitor

## Purpose

Monitor public product and marketplace movement for ecommerce growth, affiliate strategy, competitive pricing, and customer voice.

## Required Inputs

- Products, SKUs, brands, marketplaces, or categories
- Price/review/availability fields
- Competitors and regions
- Monitoring cadence

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use Instagram, TikTok, YouTube, Reddit, and X social content around products as demand and creator proxies.
- Use `instagram-location-signal-monitor`, `tiktok-trend-radar`, and `youtube-topic-monitor` for partial social evidence.
- Do not claim price, stock, review, or SKU coverage without ecommerce APIs.

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

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not infer exact prices or stock from social posts.
- Respect marketplace terms and affiliate disclosure requirements.
- Keep SKU matching confidence visible.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
