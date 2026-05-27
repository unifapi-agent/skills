---
name: linkedin-founder-lead-list
description: "Use this skill when building a founder/operator lead list from public LinkedIn profiles, company pages, posts, and hiring signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/linkedin-founder-lead-list
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# LinkedIn Founder Lead List

## Purpose

Find and qualify founders or operators who match a product ICP using public LinkedIn search and activity signals.

## Required Inputs

- ICP definition
- Keywords or company category
- Geography, company size, or title constraints
- Desired lead count

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/search/people`
- `GET /linkedin/users/{username}`
- `GET /linkedin/users/{username}/about`
- `GET /linkedin/users/{username}/experience`
- `GET /linkedin/users/{username}/posts`
- `GET /linkedin/companies/{slug}`

## Workflow

1. Translate the ICP into LinkedIn people-search filters and keywords.
2. Collect candidate profiles, experience, and recent posts.
3. Score each lead for ICP fit, urgency, credibility, and reachable public context.
4. Return a prioritized list with why-now angles.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Ranked lead list
- ICP fit score
- Public evidence
- Personalization angle
- Do-not-contact caveats

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not invent email addresses or private contact info.
- Keep the output usable even when profiles have sparse public activity.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
