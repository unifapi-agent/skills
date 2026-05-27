---
name: account-research-brief
description: "Use this skill when building an account research brief from public LinkedIn and social data before sales outreach, partnership outreach, or market mapping."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/account-research-brief
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# Account Research Brief

## Purpose

Turn a target company, product, or competitor into a concise account brief with public company facts, current activity, hiring signals, buyer personas, and outreach angles.

## Required Inputs

- LinkedIn company slug, LinkedIn company URL, or a company name with enough context to identify the slug
- Optional product context and target persona
- Optional competitors or keywords

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/companies/{slug}`
- `GET /linkedin/companies/{slug}/posts`
- `GET /linkedin/companies/{slug}/jobs`
- `GET /linkedin/companies/{slug}/member-insights`
- `GET /linkedin/search/people`
- `GET /x/tweets/search/recent`

## Workflow

1. Resolve the company slug and confirm the public entity before analysis.
2. Collect company profile, recent posts, jobs, and relevant public people signals.
3. Score account fit, current initiative signals, likely pain points, and outreach readiness.
4. Write a brief that separates evidence from inference.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Company snapshot
- Recent GTM/activity signals
- Hiring and team-growth clues
- Likely buyer personas
- Outreach angles with evidence links
- Confidence and operations used

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not claim private CRM, revenue, or email data unless the user provides it.
- If only a company name or domain is provided and the LinkedIn slug cannot be confidently identified from context, ask for the LinkedIn company URL or record domain-to-company resolution as a coverage gap.
- When LinkedIn data is missing, use X or public social mentions only as supporting evidence.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
