---
name: linkedin-hiring-signal-finder
description: "Use this skill when using LinkedIn job postings and job-count movement as buying intent or market-expansion signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/linkedin-hiring-signal-finder
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# LinkedIn Hiring Signal Finder

## Purpose

Detect public hiring signals that imply budget, urgency, new initiatives, stack changes, or market expansion.

## Required Inputs

- Company slugs or keyword search
- Target roles or departments
- Lookback window or freshness threshold

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/companies/{slug}/job-count`
- `GET /linkedin/companies/{slug}/jobs`
- `GET /linkedin/search/jobs`
- `GET /linkedin/jobs/{id}`
- `GET /linkedin/search/locations`
- `GET /linkedin/search/industries`

## Workflow

1. Define which roles indicate intent for the product category.
2. Fetch active jobs and normalize role families, seniority, and location.
3. Group signals by initiative and estimate why-now strength.
4. Recommend account actions and follow-up research.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Hiring-signal table
- Role-family clusters
- Why-now interpretation
- Suggested outreach hook
- Open questions for validation

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Treat job postings as intent clues, not confirmed purchases.
- Do not infer protected characteristics or private employee details.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
