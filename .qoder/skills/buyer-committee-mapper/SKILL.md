---
name: buyer-committee-mapper
description: "Use this skill when mapping likely public buyer, influencer, champion, and blocker personas at a target company from LinkedIn and social signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/buyer-committee-mapper
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# Buyer Committee Mapper

## Purpose

Create a public buyer-committee map that helps a seller or founder decide who to research, follow, or personalize outreach toward.

## Required Inputs

- Target company or LinkedIn company slug
- Product category and target buyer
- Optional titles, regions, seniority filters

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/search/people`
- `GET /linkedin/users/{username}`
- `GET /linkedin/users/{username}/about`
- `GET /linkedin/users/{username}/posts`
- `GET /linkedin/users/{username}/experience`
- `GET /x/tweets/search/recent`

## Workflow

1. Define the likely buying roles before searching.
2. Search LinkedIn people by company, title, and persona keywords.
3. Enrich public profiles and recent posts only for candidates that pass the role screen.
4. Classify candidates into economic buyer, technical buyer, champion, practitioner, partner, or uncertain.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Buyer-committee map
- Role classification with evidence
- Personalization hooks
- Missing-role gaps
- Confidence level per person

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not scrape private contact data or infer sensitive attributes.
- Avoid naming someone as a decision maker unless public evidence supports the role.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
