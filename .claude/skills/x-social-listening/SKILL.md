---
name: x-social-listening
description: "Use this skill when monitoring X/Twitter for keywords, competitors, brands, launch reactions, complaints, or category narratives."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/x-social-listening
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# X Social Listening

## Purpose

Build a real-time-ish public X listening brief with narratives, high-signal posts, accounts to watch, and recommended responses.

## Required Inputs

- Keywords, handles, hashtags, cashtags, or competitors
- Lookback window and languages
- Action goal

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/tweets/search/recent`
- `GET /x/autocomplete`
- `GET /x/tweets/{id}`
- `GET /x/tweets/{id}/quote_tweets`
- `GET /x/tweets/{id}/liking_users`
- `GET /x/users/by/username/{username}`

## Workflow

1. Use autocomplete and recent search to build precise queries.
2. Collect posts and thread/quote context for high-signal items.
3. Group by narrative, sentiment, audience, and actionability.
4. Recommend replies, content, outreach, or watchlist updates.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Listening digest
- Narrative clusters
- High-signal posts/accounts
- Suggested actions
- Queries used

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not claim full firehose coverage.
- Separate high-engagement noise from truly relevant evidence.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
