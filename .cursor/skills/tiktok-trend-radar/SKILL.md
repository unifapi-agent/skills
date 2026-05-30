---
name: tiktok-trend-radar
description: "Use this skill when researching TikTok trends, hashtags, sounds, videos, creators, or category narratives for growth and creator marketing."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/tiktok-trend-radar
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# TikTok Trend Radar

## Purpose

Turn TikTok search and trend signals into content ideas, creator leads, and campaign opportunities.

## Required Inputs

- Topic, product, hashtag, music track, or seed creator
- Region/language if relevant
- Output goal

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /tiktok/search/videos`
- `GET /tiktok/search/hashtags`
- `GET /tiktok/hashtags/{id}/videos`
- `GET /tiktok/music/{id}/videos`
- `GET /tiktok/users/resolve`
- `GET /tiktok/users/{id}/videos`
- `GET /tiktok/videos/{id}/comments`

## Workflow

1. Search for relevant videos, hashtags, or sounds.
2. Resolve creators or tags for deeper sampling.
3. Cluster patterns by hook, format, sound, comment demand, and audience.
4. Recommend trend participation, creator outreach, or watchlist actions.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Trend radar
- Hashtags/sounds/videos to watch
- Creator candidates
- Comment insights
- Content recommendations

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not guarantee trend durability.
- Do not copy creator concepts without transformation and attribution awareness.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
