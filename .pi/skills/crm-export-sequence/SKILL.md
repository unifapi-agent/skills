---
name: crm-export-sequence
description: "Use this skill for Clay-like handoff from research/enrichment into CRM-ready fields, outbound sequences, Slack alerts, or sales engagement using agent-generated tables and planned connector APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/crm-export-sequence
  source: https://github.com/unifapi-agent/skills
  category: GTM
  api_status: api_backfill
  runtime_status: agent_native
---

# CRM Export Sequence

## Purpose

Convert qualified research outputs into CRM-ready records, dedupe decisions, field mappings, and outbound sequence recommendations.

## Required Inputs

- Qualified leads/accounts or source skill output
- CRM or sales engagement destination
- Field mapping and ownership rules
- Sequence goal and compliance constraints

Use host code/file tools to produce CRM-ready CSV/JSON/Markdown tables and sequence drafts. State an API gap only when the user needs confirmed CRM writes, sales-engagement enrollment, Slack/webhook delivery, rollback, or sync status.

## Agent Runtime Coverage

- Produce Markdown/CSV/JSON-style tables and sequence briefs for manual import.
- Use `gtm-table-enrichment`, `outbound-personalization-brief`, `linkedin-founder-lead-list`, and `account-research-brief` as inputs.
- Use JS/TS or Python to normalize field names, dedupe rows, validate required columns, and format exports.
- Do not write to private SaaS systems without connectors.

## API Backfill Required

- Salesforce, HubSpot, Attio, Pipedrive, and Clay-compatible exports
- Salesloft, Outreach, Instantly, Smartlead, or sequence tool connectors
- Dedupe, ownership, lifecycle-stage, and field mapping APIs
- Slack/email/webhook notification destinations
- Audit logs and rollback semantics

## Workflow

1. Validate that the input list is qualified and source-backed.
2. Map fields and dedupe keys before export, creating a local table/file when useful.
3. When connectors exist, create/update records and attach source evidence.
4. Generate sequence recommendations and handoff summary.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- CRM-ready table
- Field mapping
- Dedupe and ownership decisions
- Sequence recommendation
- Export/write audit summary

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not claim CRM writes happened unless a connector confirms it.
- Keep source evidence attached to records.
- Do not bypass user-approved ownership, compliance, or suppression rules.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `gtm-table-enrichment` when the input table needs research, normalization, or row-level enrichment first.
