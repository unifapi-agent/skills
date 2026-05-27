---
name: web3-kol-watchlist
description: "Use this skill when building or monitoring a web3 KOL watchlist across X, YouTube, TikTok, LinkedIn, and Threads."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/web3-kol-watchlist
  source: https://github.com/unifapi-agent/skills
  category: Web3
---

# Web3 KOL Watchlist

## Purpose

Rank public web3 voices by topical relevance, recent activity, influence proxies, and campaign or research usefulness.

## Required Inputs

- Narrative or project context
- Seed KOL handles/channels
- Platforms and scoring criteria

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/users/by/username/{username}`
- `GET /x/users/{id}/tweets`
- `GET /youtube/channels/{channel_id}/videos`
- `GET /tiktok/users/{id}/videos`
- `GET /linkedin/users/{username}/posts`
- `GET /threads/users/{username}/posts`

## Workflow

1. Normalize handles/channels and verify public identity evidence.
2. Collect recent posts or videos for each KOL.
3. Score topical fit, consistency, engagement proxy, risk, and usefulness.
4. Return a watchlist with next monitor queries.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Ranked KOL watchlist
- Topic tags
- Recent evidence
- Risk flags
- Campaign/research use cases

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not provide investment recommendations.
- Do not assume the same person controls cross-platform accounts without evidence.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
