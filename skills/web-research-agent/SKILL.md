---
name: web-research-agent
description: "Use this planned skill for sourced web research across company sites, docs, pricing pages, blogs, directories, changelogs, and public pages. Uses social/professional proxies today and names required web search/extraction APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/web-research-agent
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# Web Research Agent

## Purpose

Find, retrieve, extract, and synthesize public web evidence into a sourced research brief or structured table.

## Required Inputs

- Research question or entity list
- Target domains, competitors, or source types
- Freshness requirements
- Fields to extract or decisions to support

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use social and professional-platform evidence for partial context when web search/page fetch is unavailable.
- Use LinkedIn company/posts/jobs and public social discussions to support entity research.
- Ask for URLs directly when the user already knows target pages.

## API Backfill Required

- Web search API with domain, recency, locale, and source filters
- URL fetch and rendered-page extraction
- Structured extraction from HTML, docs, PDFs, changelogs, and pricing pages
- Entity deduplication and source credibility metadata
- Citation and snapshot storage for repeatable research

## Workflow

1. Clarify the decision and extraction fields before searching.
2. Find candidate sources and filter by authority, freshness, and relevance.
3. Extract structured facts with citations and confidence.
4. Return a concise research artifact plus source coverage and gaps.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Sourced research brief
- Structured extraction table
- Source coverage map
- Conflicts and uncertainty
- Recommended follow-up queries

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not fake web search from social-only sources.
- Keep source citations and extraction confidence visible.
- If the user needs fresh web evidence, mark the web-search/page-extraction API gap clearly.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
