---
name: outbound-personalization-brief
description: "Use this skill when turning public social and professional signals into outreach personalization for sales, partnerships, recruiting, or creator outreach."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/outbound-personalization-brief
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# Outbound Personalization Brief

## Purpose

Generate a concise, evidence-backed personalization brief before writing outbound messages.

## Required Inputs

- Person or company target
- Product context
- Channel and outreach goal
- Tone constraints

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/users/{username}/posts`
- `GET /linkedin/users/{username}/about`
- `GET /linkedin/users/{username}/experience`
- `GET /x/users/by/username/{username}`
- `GET /x/users/{id}/tweets`
- `GET /threads/users/{username}/posts`

## Workflow

1. Collect recent public posts and profile facts.
2. Find one to three relevant hooks tied to the product context.
3. Score hook quality by specificity, recency, and relevance.
4. Draft message angles only after evidence is selected.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Personalization hooks
- Evidence quotes or paraphrases
- Do-use and avoid angles
- Short outreach draft
- Confidence level

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not fabricate familiarity or private context.
- Avoid sensitive personal data and manipulative personalization.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
