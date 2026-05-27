---
name: cross-channel-content-brief
description: "Use this skill when turning public social research into a content brief for X, LinkedIn, Reddit, TikTok, YouTube, Instagram, or Threads."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/cross-channel-content-brief
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Cross Channel Content Brief

## Purpose

Find what a market is already discussing and convert it into channel-specific content ideas, angles, examples, and caveats.

## Required Inputs

- Topic, product, competitor, or audience
- Target channels
- Content goal

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/tweets/search/recent`
- `GET /linkedin/search/posts`
- `GET /reddit/posts/{id}/comments`
- `GET /youtube/search`
- `GET /tiktok/search/videos`
- `GET /instagram/search`
- `GET /threads/search/top`

## Workflow

1. Gather channel-specific examples for the topic.
2. Cluster what works by format, hook, proof, and objection.
3. Create channel-specific brief sections instead of one generic post.
4. Include evidence and anti-patterns.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Content opportunity map
- Channel-specific briefs
- Example angles
- Objections to address
- Evidence used

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not plagiarize creators or copy posts verbatim.
- If a channel lacks data, recommend a gap or manual research path.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
