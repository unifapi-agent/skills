---
name: token-community-sentiment-pulse
description: "Use this skill when taking a public social sentiment pulse for a token, chain, protocol, NFT collection, or crypto project."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/token-community-sentiment-pulse
  source: https://github.com/unifapi-agent/skills
  category: Web3
---

# Token Community Sentiment Pulse

## Purpose

Summarize public community mood, recurring questions, complaints, catalysts, and risk narratives from social channels.

## Required Inputs

- Project/token names, tickers, official handles, community URLs if known
- Lookback window
- Questions to answer

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/tweets/search/recent`
- `GET /x/communities/search`
- `GET /x/communities/{id}/tweets`
- `GET /reddit/posts/{id}/comments`
- `GET /youtube/search`
- `GET /tiktok/search/videos`

## Workflow

1. Use exact and disambiguated queries to avoid ticker collisions.
2. Collect posts/comments/videos and classify sentiment drivers.
3. Separate holders/community concerns from outsider narratives when evidence allows.
4. Return a pulse with confidence and recommended follow-up.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Sentiment pulse
- Positive/negative/neutral drivers
- Question and complaint clusters
- Influential posts
- Data gaps

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- No on-chain, price, or wallet data is available through this skill.
- Do not turn sentiment into trading advice.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
