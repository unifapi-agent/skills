---
name: gtm-table-enrichment
description: "Use this skill when enriching CSV, JSON, Markdown, or spreadsheet-style GTM lists with public company, people, market, social, or web evidence using agent code, search/fetch, and UnifAPI signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/gtm-table-enrichment
  source: https://github.com/unifapi-agent/skills
  category: GTM
  runtime_status: agent_native
---

# GTM Table Enrichment

## Purpose

Turn a rough list of companies, people, creators, partners, competitors, or accounts into a source-backed enriched table for GTM decisions.

## Required Inputs

- Input rows as CSV, JSON, Markdown table, spreadsheet, or pasted list
- Entity type: company, person, creator, partner, competitor, account, or mixed
- Fields to add and required confidence threshold
- Output format and whether manual CRM import is expected

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, ICP, destination, or enrichment fields before running a broad enrichment.

## Agent Runtime Coverage

- Use JS/TS or Python to normalize, dedupe, join, and validate tabular data.
- Use host search/fetch/browser for public web evidence and known URLs.
- Use UnifAPI public social/professional skills for LinkedIn, X, Reddit, YouTube, TikTok, Instagram, Threads, and creator signals.
- Use local files when the user provides CSV/JSON/Markdown/spreadsheet exports.

## API Backfill Required

- Bulk company/domain enrichment
- Email finder/verifier and phone/contact enrichment
- CRM/sales-engagement write APIs
- Persistent table runtime with row-level retries and lineage
- Private workspace connectors and suppression lists

## Workflow

1. Normalize input rows, dedupe obvious duplicates, and define stable IDs.
2. Choose enrichment fields and source priority before fetching.
3. Enrich in small batches with cited evidence and per-field confidence.
4. Produce an output table plus unresolved rows, conflicts, and suggested next data providers.
5. If CRM handoff is needed, use `crm-export-sequence` for field mapping and manual or connector-based export.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Enriched table or file path when a local file was created
- Added fields with source URLs and confidence
- Unresolved/conflicting rows
- Dedupe decisions
- Recommended next enrichment or handoff step

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not invent missing fields; leave blank or mark unresolved with a reason.
- Do not claim email verification, CRM writes, or private-data enrichment without a connector or user-provided export.
- Keep source evidence per enriched row or per field group.
- Respect robots/source terms and avoid scraping private or paywalled data.
- Prefer deterministic scripts for repetitive transforms and keep manual inference clearly labeled.

## Related Skills

- Use `company-domain-enrichment` for company/domain resolution.
- Use `email-contact-finder` only to scope future email/contact enrichment until contact APIs exist.
- Use `crm-export-sequence` for CRM field mapping, dedupe, and sequence handoff.
