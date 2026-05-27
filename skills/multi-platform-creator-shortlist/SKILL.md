---
name: multi-platform-creator-shortlist
description: "Use this skill when building a creator shortlist across X, Instagram, TikTok, YouTube, LinkedIn, Threads, or Reddit from public signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/multi-platform-creator-shortlist
  source: https://github.com/unifapi-agent/skills
  category: Creator Marketing
---

# Multi Platform Creator Shortlist

## Purpose

Find and rank creators across supported public social channels for campaigns, partnerships, podcasts, launches, or affiliate programs.

## Required Inputs

- Campaign/product context
- Target platforms
- Niche keywords or seed creators
- Budget or collaboration type if known

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/tweets/search/recent`
- `GET /instagram/search`
- `GET /tiktok/search/users`
- `GET /youtube/search`
- `GET /linkedin/search/people`
- `GET /threads/search/profiles`
- `GET /reddit/users/{username}`

## Workflow

1. Define creator-fit criteria before discovery.
2. Search platform-specific sources and normalize candidates.
3. Enrich only likely matches with profile and recent content.
4. Rank by fit, audience context, evidence quality, and activation path.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Cross-platform creator shortlist
- Platform and handle map
- Fit/risk scores
- Suggested collaboration format
- Next data needed

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Use kol-pricing only for X/Twitter cash pricing unless a separate platform model is created.
- Do not merge identities across platforms unless evidence is strong.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
