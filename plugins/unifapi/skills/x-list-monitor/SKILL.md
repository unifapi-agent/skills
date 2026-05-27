---
name: x-list-monitor
description: "Use this skill when monitoring public X Lists for curated accounts, ecosystem narratives, KOL activity, or competitor watchlists."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/x-list-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# X List Monitor

## Purpose

Turn an X List into a repeatable monitor for market narratives, influential posts, and accounts worth researching.

## Required Inputs

- X List ID or search query
- Narratives or accounts to watch
- Output cadence or threshold

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/lists/search`
- `GET /x/lists/{id}/members`
- `GET /x/lists/{id}/followers`
- `GET /x/lists/{id}/tweets`
- `GET /x/users/{id}/tweets`

## Workflow

1. Resolve the list and inspect members before relying on it.
2. Collect recent list tweets and member metadata.
3. Rank posts and accounts by relevance, freshness, and influence.
4. Return a digest plus changes to watch next.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- List snapshot
- Top narratives
- High-signal posts
- Accounts to follow or research
- Next watch queries

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- A public list reflects curator bias, not the whole market.
- Do not present list followers as customers or leads without additional evidence.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
