---
name: instagram-location-signal-monitor
description: "Use this skill when monitoring Instagram locations for local brand, event, retail, hospitality, creator, or competitor signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/instagram-location-signal-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Instagram Location Signal Monitor

## Purpose

Use public Instagram location posts and nearby locations to surface local trends, creators, UGC, and event activity.

## Required Inputs

- Location ID or location name to resolve externally
- Topic, brand, or event keywords
- Lookback window

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /instagram/locations/{id}`
- `GET /instagram/locations/{id}/posts`
- `GET /instagram/locations/{id}/nearby`
- `GET /instagram/posts/{shortcode}`
- `GET /instagram/posts/{shortcode}/comments`

## Workflow

1. Validate the location and nearby context.
2. Collect posts and comments tied to that location.
3. Classify content as event, venue, customer proof, creator, competitor, or noise.
4. Recommend local growth or monitoring actions.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Location activity digest
- Creators or posts to review
- Local themes
- Engagement opportunities
- Manual follow-up needs

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not track private location behavior or individuals.
- If location ID cannot be resolved from current inputs, ask for a post/location URL or mark the gap.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
