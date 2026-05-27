---
name: product-growth-strategy-brief
description: "Use this skill when creating an Okara-style product strategy, ICP, positioning, competitor, brand voice, or growth-channel playbook from public evidence."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/product-growth-strategy-brief
  source: https://github.com/unifapi-agent/skills
  category: Growth
  runtime_status: agent_native
---

# Product Growth Strategy Brief

## Purpose

Create a compact growth strategy document that turns product context and public market evidence into positioning, ICP, channels, and next actions.

## Required Inputs

- Product name, URL, docs, deck, or short description
- Target customer or current users if known
- Growth goal and time horizon
- Competitors, channels, or regions to include

If product context is thin, inspect provided URLs/files first and ask only for gaps that change strategy quality.

## Agent Runtime Coverage

- Use host search/fetch to inspect the product, docs, pricing, competitors, and public market pages.
- Use UnifAPI social/professional skills for demand signals, competitor activity, creator/community evidence, and channel fit.
- Use local files when the user provides decks, exports, research notes, or analytics.
- Treat durable brand memory, private analytics, and scheduled strategy refresh as API backfill unless provided by the host or user.

## API Backfill Required

- Saved product/brand memory
- Competitor crawl history and scheduled refresh
- Private analytics and CRM connectors
- Strategy workspace, approval state, and campaign calendar
- Brand voice and asset library management

## Workflow

1. Extract product facts, ICP assumptions, offer, proof, and current messaging.
2. Gather public demand, competitor, channel, and objection evidence.
3. Separate what is known, inferred, risky, and missing.
4. Build a strategy brief with positioning, ICP, channels, experiments, and monitor specs.
5. Recommend the next skills to execute the strategy.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Product and ICP snapshot
- Positioning and differentiated claims
- Competitor and category map
- Channel strategy and experiment backlog
- Monitoring queries and next-skill handoff

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not invent traction, customers, revenue, or product features.
- Keep strategy claims tied to evidence or marked as hypotheses.
- Avoid generic growth advice; make every recommendation trace to product, ICP, channel, or signal evidence.
- Name data gaps that would materially change strategy.

## Related Skills

- Use `category-demand-scout` for demand evidence.
- Use `competitor-gtm-monitor` for deeper competitor movement.
- Use `founder-social-post-writer` or `seo-article-writer` when the user wants execution drafts.
