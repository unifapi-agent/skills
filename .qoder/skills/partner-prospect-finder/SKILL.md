---
name: partner-prospect-finder
description: "Use this skill when finding potential integration, affiliate, community, agency, media, or ecosystem partners from public social and LinkedIn signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/partner-prospect-finder
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# Partner Prospect Finder

## Purpose

Build a qualified partner shortlist with evidence for audience overlap, category fit, recent activity, and partnership angle.

## Required Inputs

- Product or ecosystem description
- Partner type
- Keywords, competitors, or seed accounts
- Region or platform preference

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/search/people`
- `GET /linkedin/search/posts`
- `GET /linkedin/companies/{slug}`
- `GET /x/tweets/search/recent`
- `GET /youtube/search`
- `GET /reddit/trending-searches`

## Workflow

1. Translate the partner thesis into platform-specific queries.
2. Find candidate people, companies, creators, or communities.
3. Enrich candidates with public activity and audience/context signals.
4. Rank by relevance, reach, trust, and activation path.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Partner shortlist
- Fit rationale
- Audience/context evidence
- Suggested first ask
- Risks and missing data

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- If an operation is unavailable for a desired platform, record the gap instead of pretending coverage.
- Do not guarantee partner responsiveness.
- This skill can discover partners from public social and professional activity, but it is not a complete company/domain enrichment database without additional APIs.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
