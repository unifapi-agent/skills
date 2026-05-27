---
name: company-domain-enrichment
description: "Use this planned skill to enrich companies from domains or names with firmographics, category, tech stack, funding, headcount, locations, social handles, and LinkedIn identity. Requires domain/company enrichment APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/company-domain-enrichment
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# Company Domain Enrichment

## Purpose

Turn a domain or company list into a normalized account table for GTM research, scoring, routing, and personalization.

## Required Inputs

- Domains, company names, or LinkedIn company URLs/slugs
- Fields to enrich
- ICP/scoring criteria
- Output format or destination

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- If a LinkedIn slug is known, use LinkedIn company profile, posts, jobs, member insights, and people operations.
- If only a domain is known, ask for the LinkedIn company URL or mark domain resolution as unavailable.
- Use social search only as low-confidence supporting context.

## API Backfill Required

- Domain-to-company resolution
- Firmographics: industry, headcount, geography, revenue band, founding year
- Tech stack and integrations
- Funding and investor data
- Official social-handle discovery
- Company hierarchy and duplicate resolution

## Workflow

1. Normalize input domains/names and identify missing identifiers.
2. Resolve domains to canonical companies when APIs exist.
3. Enrich account fields and score against the ICP.
4. Return a table with source confidence and unresolved rows.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Enriched company table
- ICP/account fit score
- Resolved social and LinkedIn identities
- Missing field report
- Suggested next enrichment APIs

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not infer company identity from a domain without a resolution source.
- Keep confidence per enriched field.
- Do not invent firmographics from social posts.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
