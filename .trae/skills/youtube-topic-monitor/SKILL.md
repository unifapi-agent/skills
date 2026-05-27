---
name: youtube-topic-monitor
description: "Use this skill when monitoring YouTube search, trending videos, related videos, or creator uploads for a product category or narrative."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/youtube-topic-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# YouTube Topic Monitor

## Purpose

Create a periodic YouTube digest of videos, channels, questions, formats, and content gaps around a topic.

## Required Inputs

- Topic or keyword set
- Target region/category if available
- Competitors or seed videos

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /youtube/search`
- `GET /youtube/trending`
- `GET /youtube/videos/{video_id}`
- `GET /youtube/videos/{video_id}/related`
- `GET /youtube/channels/{channel_id}/videos`

## Workflow

1. Search the topic and optionally compare trending or related videos.
2. Group videos by angle, audience, depth, and format.
3. Identify channels repeatedly appearing in the topic area.
4. Recommend content gaps, creator targets, and monitoring queries.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Topic digest
- Top videos/channels
- Narrative and format clusters
- Content gaps
- Watchlist

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not claim keyword volume or SEO ranking coverage.
- Use YouTube public data as discovery evidence, not a full search analytics suite.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
