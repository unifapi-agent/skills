---
name: market-map-from-social
description: "Use this skill when building a lightweight market map from public social discussions, LinkedIn companies/people, creators, communities, and videos."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/market-map-from-social
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# Market Map From Social

## Purpose

Map the visible ecosystem around a category: companies, creators, communities, narratives, alternatives, and open questions.

## Required Inputs

- Market/category definition
- Seed competitors, keywords, or communities
- Desired map dimensions

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/search/people`
- `GET /linkedin/search/posts`
- `GET /x/tweets/search/recent`
- `GET /x/communities/search`
- `GET /reddit/subreddits/{name}`
- `GET /youtube/search`
- `GET /tiktok/search/videos`

## Workflow

1. Define the map axes before collecting data.
2. Gather public entities and discussions across channels.
3. Group entities by role: vendor, creator, community, buyer, expert, alternative, or unknown.
4. Return a visualizable market map in Markdown tables.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Market map tables
- Entity roles
- Narrative clusters
- Gaps and unknowns
- Recommended deeper research

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- This is not a complete company database.
- Avoid overclaiming from sparse social evidence.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
