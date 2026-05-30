---
name: competitor-talent-watch
description: "Use this skill when watching competitor hiring, public employee activity, and team composition signals for strategic intelligence."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/competitor-talent-watch
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# Competitor Talent Watch

## Purpose

Turn public LinkedIn jobs and people signals into an interpretation of competitor priorities and team buildout.

## Required Inputs

- Competitor LinkedIn company slugs or company-page URLs
- Function or seniority filters
- Lookback window

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/companies/{slug}/jobs`
- `GET /linkedin/companies/{slug}/job-count`
- `GET /linkedin/companies/{slug}/people`
- `GET /linkedin/search/people`
- `GET /linkedin/users/{username}/experience`

## Workflow

1. Fetch jobs and public people data for each competitor.
2. Classify role families and seniority.
3. Detect clusters that imply product, market, sales, support, or regional expansion.
4. Summarize implications and confidence.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Hiring movement summary
- Team/function clusters
- Strategic interpretation
- Watchlist changes to re-check
- Evidence rows

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Use public professional data only.
- Do not infer employment changes unless the profile or job data supports it.
- If the competitor company slug is unknown, ask for a LinkedIn company URL before running the LinkedIn company operations.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
