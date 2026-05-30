---
name: category-demand-scout
description: "Use this skill when scouting demand for a product category from public questions, complaints, trends, videos, and professional posts."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/category-demand-scout
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Category Demand Scout

## Purpose

Create an early demand map for founders, product marketers, investors, or growth teams using public social evidence.

## Required Inputs

- Category, problem, or product idea
- Target audience
- Channels or geographies

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /reddit/trending-searches`
- `GET /reddit/feed/popular`
- `GET /x/tweets/search/recent`
- `GET /linkedin/search/posts`
- `GET /youtube/search`
- `GET /tiktok/search/videos`
- `GET /threads/search/top`

## Workflow

1. Translate the idea into user-language queries and competitor alternatives.
2. Collect cross-channel evidence of pain, workarounds, buying intent, and skepticism.
3. Cluster demand themes and rank by evidence strength.
4. Return a go/no-go research brief plus next validation steps.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Demand theme map
- Pain and workaround evidence
- Audience segments
- Competitor/alternative mentions
- Validation plan

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not call this market size or keyword volume.
- Flag channel bias and query limitations.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
