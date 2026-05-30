---
name: linkedin-people-enrichment
description: "Use this skill when enriching a list of public LinkedIn profile slugs with role, experience, education, posts, skills, and public contact blocks."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/linkedin-people-enrichment
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# LinkedIn People Enrichment

## Purpose

Create a Clay-like public people-enrichment workflow for lead research, candidate mapping, community analysis, or partner discovery.

## Required Inputs

- LinkedIn public identifiers or profile URLs
- Desired enrichment fields
- Use case and scoring criteria

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/users/{username}`
- `GET /linkedin/users/{username}/about`
- `GET /linkedin/users/{username}/experience`
- `GET /linkedin/users/{username}/educations`
- `GET /linkedin/users/{username}/skills`
- `GET /linkedin/users/{username}/contact`
- `GET /linkedin/users/{username}/posts`

## Workflow

1. Normalize profile identifiers.
2. Fetch only the enrichment blocks needed for the user goal.
3. Score or tag profiles using explicit criteria.
4. Return structured rows plus short evidence notes.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Enriched people table
- Role and seniority tags
- Recent public activity
- Fit score
- Missing-field notes

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Use only public contact information returned by the API.
- Do not enrich sensitive categories or create spam-ready output.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
