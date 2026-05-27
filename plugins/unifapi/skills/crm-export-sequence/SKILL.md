---
name: crm-export-sequence
description: "Use this planned skill for Clay-like handoff from research/enrichment into CRM fields, outbound sequences, Slack alerts, or sales engagement. Produces tables/drafts today; full execution requires CRM/export/write APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/crm-export-sequence
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# CRM Export Sequence

## Purpose

Convert qualified research outputs into CRM-ready records, dedupe decisions, field mappings, and outbound sequence recommendations.

## Required Inputs

- Qualified leads/accounts or source skill output
- CRM or sales engagement destination
- Field mapping and ownership rules
- Sequence goal and compliance constraints

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Produce Markdown/CSV-style tables and sequence briefs for manual import.
- Use `outbound-personalization-brief`, `linkedin-founder-lead-list`, and `account-research-brief` as inputs.
- Do not write to private SaaS systems without connectors.

## API Backfill Required

- Salesforce, HubSpot, Attio, Pipedrive, and Clay-compatible exports
- Salesloft, Outreach, Instantly, Smartlead, or sequence tool connectors
- Dedupe, ownership, lifecycle-stage, and field mapping APIs
- Slack/email/webhook notification destinations
- Audit logs and rollback semantics

## Workflow

1. Validate that the input list is qualified and source-backed.
2. Map fields and dedupe keys before export.
3. When connectors exist, create/update records and attach source evidence.
4. Generate sequence recommendations and handoff summary.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- CRM-ready table
- Field mapping
- Dedupe and ownership decisions
- Sequence recommendation
- Export/write audit summary

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not claim CRM writes happened unless a connector confirms it.
- Keep source evidence attached to records.
- Do not bypass user-approved ownership, compliance, or suppression rules.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
