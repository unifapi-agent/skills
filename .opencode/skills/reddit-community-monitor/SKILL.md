---
name: reddit-community-monitor
description: "Use this skill when monitoring specific subreddits or Reddit topics for recurring questions, complaints, competitor mentions, and demand signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/reddit-community-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Reddit Community Monitor

## Purpose

Turn Reddit community activity into a periodic social-listening digest for product, support, growth, or founder-led marketing.

## Required Inputs

- Subreddits, keywords, or competitor names
- Signal categories
- Freshness window

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /reddit/subreddits/{name}`
- `GET /reddit/posts/{id}`
- `GET /reddit/posts/{id}/comments`
- `GET /reddit/feed/popular`
- `GET /reddit/trending-searches`

## Workflow

1. Collect candidate posts and comments from target communities.
2. Deduplicate repeated topics and classify sentiment or intent.
3. Extract recurring language users use for pain points.
4. Recommend content, support, product, or outreach actions.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Community signal digest
- Recurring questions
- Complaint and praise themes
- Competitor mentions
- Recommended actions

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not treat Reddit as statistically representative of a market.
- Keep quotes short and avoid exposing unnecessary personal details.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
