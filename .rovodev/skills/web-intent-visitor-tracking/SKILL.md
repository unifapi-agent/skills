---
name: web-intent-visitor-tracking
description: "Use this API-backfill skill for Clay-style web intent, anonymous visitor identification, buying-intent scoring, account deanonymization, and website visitor alerts."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/web-intent-visitor-tracking
  source: https://github.com/unifapi-agent/skills
  category: "API Backfill"
  api_status: planned
---

# Web Intent Visitor Tracking

## Purpose

Identify and prioritize accounts showing intent from website behavior, then enrich and route them to sales or growth workflows.

## Required Inputs

- Website/domain to track
- Intent events and scoring rules
- Target accounts or ICP
- Destination for alerts or exports

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use public account/social signals as external intent proxies only.
- Use `account-signal-monitor`, `linkedin-hiring-signal-finder`, and `category-demand-scout` for off-site intent clues.
- Do not claim website visitor identification without first-party tracking.

## API Backfill Required

- First-party website tracking script or server-side event ingestion
- Anonymous visitor-to-company identification
- Intent scoring and session/page path aggregation
- Domain/company enrichment
- CRM/Slack/webhook routing and suppression rules
- Consent, privacy, and retention controls

## Workflow

1. Define intent events and scoring thresholds.
2. When tracking APIs exist, collect visitor/account events and enrich companies.
3. Prioritize accounts by fit and intent strength.
4. Route alerts or CRM updates with evidence and privacy metadata.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Web intent account list
- Intent score and evidence
- Fit plus intent prioritization
- Routing/export recommendations
- Privacy and consent caveats

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not deanonymize visitors or imply tracking without consented first-party data.
- Do not mix private website analytics with public UnifAPI OAuth.
- Keep privacy and retention constraints explicit.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `account-signal-monitor` for public account activity as an intent proxy.
- Use `linkedin-hiring-signal-finder` for hiring-driven buying-intent clues.
- Use `category-demand-scout` when the user needs market demand rather than first-party web intent.
