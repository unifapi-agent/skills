---
name: crypto-narrative-monitor
description: "Use this skill when monitoring public crypto or web3 narratives across X, Reddit, YouTube, TikTok, and Threads."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/crypto-narrative-monitor
  source: https://github.com/unifapi-agent/skills
  category: Web3
---

# Crypto Narrative Monitor

## Purpose

Track emerging crypto narratives, token/project mentions, ecosystem debates, and influencer amplification using public social signals.

## Required Inputs

- Token, project, ecosystem, ticker, or narrative keywords
- Channels and watchlist accounts
- Risk tolerance and output goal

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/tweets/search/recent`
- `GET /x/trends/by/woeid/{woeid}`
- `GET /reddit/trending-searches`
- `GET /reddit/posts/{id}/comments`
- `GET /youtube/search`
- `GET /tiktok/search/videos`
- `GET /threads/search/recent`

## Workflow

1. Build exact ticker/project queries plus broader narrative terms.
2. Collect cross-channel posts and videos, then remove ticker/name false positives.
3. Classify narratives as breakout, recurring, controversy, scam-risk, technical, market, or community.
4. Return a monitor digest with confidence and gaps.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Narrative heatmap
- High-signal posts/videos
- KOLs or communities to watch
- Risk flags
- Queries and channels covered

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- This skill does not provide on-chain data, trading advice, or financial recommendations.
- Mark ticker ambiguity and bot-like amplification as risk.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
