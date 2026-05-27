---
name: company-domain-enrichment
description: "Use this skill to enrich companies from domains or names with firmographics, category, tech stack, funding, headcount, locations, social handles, and LinkedIn identity using host search plus UnifAPI signals."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/company-domain-enrichment
  source: https://github.com/unifapi-agent/skills
  category: GTM
  api_status: api_backfill
  runtime_status: agent_native
---

# Company Domain Enrichment

## Purpose

Turn a domain or company list into a normalized account table for GTM research, scoring, routing, and personalization.

## Required Inputs

- Domains, company names, or LinkedIn company URLs/slugs
- Fields to enrich
- ICP/scoring criteria
- Output format or destination

Use host search/fetch for small-batch public domain resolution and use UnifAPI LinkedIn/social evidence when identifiers are known. State an API gap when the user needs bulk normalized enrichment, proprietary firmographics, provider waterfalls, or guaranteed field coverage.

## Agent Runtime Coverage

- If a LinkedIn slug is known, use LinkedIn company profile, posts, jobs, member insights, and people operations.
- If only a domain is known, use host search/fetch to identify the official company, LinkedIn URL, social handles, and source pages for small batches.
- Use social search as supporting context, with confidence per field.
- For large lists, normalize input/output files with JS/TS or Python before enrichment.

## API Backfill Required

- Domain-to-company resolution
- Firmographics: industry, headcount, geography, revenue band, founding year
- Tech stack and integrations
- Funding and investor data
- Official social-handle discovery
- Company hierarchy and duplicate resolution

## Workflow

1. Normalize input domains/names and identify missing identifiers.
2. Resolve domains to canonical companies with host search/fetch for small batches or APIs when available.
3. Enrich account fields and score against the ICP.
4. Return a table with source confidence and unresolved rows.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Enriched company table
- ICP/account fit score
- Resolved social and LinkedIn identities
- Missing field report
- Suggested next enrichment APIs

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not infer company identity from a domain without a cited resolution source.
- Keep confidence per enriched field.
- Do not invent firmographics from social posts.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for supporting evidence and mark bulk enrichment as API backfill when needed.
