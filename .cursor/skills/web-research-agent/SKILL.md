---
name: web-research-agent
description: "Use this skill for sourced web research across company sites, docs, pricing pages, blogs, directories, changelogs, and public pages using host-agent search/fetch plus UnifAPI signals."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/web-research-agent
  source: https://github.com/unifapi-agent/skills
  category: Research
  api_status: api_backfill
  runtime_status: agent_native
---

# Web Research Agent

## Purpose

Find, retrieve, extract, and synthesize public web evidence into a sourced research brief or structured table.

## Required Inputs

- Research question or entity list
- Target domains, competitors, or source types
- Freshness requirements
- Fields to extract or decisions to support

If the host agent has search, fetch/browser, shell, or code execution, use those capabilities directly for one-off public web research. State an API gap only when the user needs hosted repeatability, bulk extraction, saved snapshots, compliance metadata, or normalized UnifAPI schemas.

## Agent Runtime Coverage

- Use host web search and URL fetch/browser fetch to discover and read public pages.
- Use shell, JS/TS, or Python for small-batch extraction from HTML, JSON, docs, CSVs, or public pages.
- Use LinkedIn company/posts/jobs and public social discussions from UnifAPI as supporting context.
- Ask for target URLs directly when the user already knows the source set.

## API Backfill Required

- Productized web search API with domain, recency, locale, and source filters
- Hosted URL fetch and rendered-page extraction
- Structured extraction from HTML, docs, PDFs, changelogs, and pricing pages
- Entity deduplication and source credibility metadata
- Citation and snapshot storage for repeatable research

## Workflow

1. Clarify the decision and extraction fields before searching.
2. Find candidate sources with host search/fetch and UnifAPI social/professional signals where useful.
3. Extract structured facts with citations, source timestamps, and confidence.
4. Return a concise research artifact plus source coverage and productized API gaps when relevant.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Sourced research brief
- Structured extraction table
- Source coverage map
- Conflicts and uncertainty
- Recommended follow-up queries

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not fake web search from social-only sources.
- Keep source citations and extraction confidence visible.
- If the host runtime cannot search/fetch or the user needs bulk/persistent research, mark the web-search/page-extraction API gap clearly.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `company-domain-enrichment` when the research output needs structured company fields.
- Use `news-pr-monitor` for time-sensitive public events and announcements.
- Use `web-page-change-monitor` when the task is comparing page versions.
