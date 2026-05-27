---
name: icp-account-list-builder
description: "Use this skill when building a Clay-style ICP account list from a market, persona, keyword, category, competitor set, or web/social evidence."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/icp-account-list-builder
  source: https://github.com/unifapi-agent/skills
  category: GTM
  runtime_status: agent_native
---

# ICP Account List Builder

## Purpose

Find and qualify target companies that match an ICP, then return a source-backed account list suitable for enrichment, scoring, or outbound planning.

## Required Inputs

- Product or offer
- ICP criteria: segment, geography, company size, buyer role, industry, triggers, exclusions
- Desired account count and required fields
- Source preferences or disallowed sources

If the ICP is vague, ask for target customer, use case, and exclusion criteria before building a broad list.

## Agent Runtime Coverage

- Use host search/fetch for company discovery from web pages, directories, launch sites, app stores, job pages, and public lists.
- Use UnifAPI LinkedIn, X, Reddit, YouTube, TikTok, Instagram, and Threads skills for public evidence and trigger signals.
- Use JS/TS or Python to dedupe, normalize domains, and score rows.
- State an API gap when the user needs a complete proprietary company database or bulk normalized firmographics.

## API Backfill Required

- Company search and domain-to-company resolution
- Firmographic filters for headcount, revenue, funding, geography, and tech stack
- Social-handle discovery and cross-platform identity resolution
- Persistent table runs, source lineage, and export connectors

## Workflow

1. Convert ICP criteria into search queries, source types, and disqualifiers.
2. Collect candidate companies from several source families.
3. Normalize domains, names, LinkedIn slugs, and social handles.
4. Score ICP fit and trigger strength with evidence.
5. Return the list plus enrichment and handoff recommendations.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- ICP account table
- Fit and trigger score per account
- Evidence URLs and confidence
- Excluded or ambiguous candidates
- Recommended next enrichment or outbound step

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not claim complete market coverage from web search alone.
- Do not invent firmographics that are not visible or user-provided.
- Keep exclusions and uncertainty explicit.
- Respect source terms and avoid scraping private or paywalled data.

## Related Skills

- Use `company-domain-enrichment` to enrich known companies or domains.
- Use `lead-account-scoring-agent` to score an existing table.
- Use `gtm-table-enrichment` for row-level enrichment and file output.
