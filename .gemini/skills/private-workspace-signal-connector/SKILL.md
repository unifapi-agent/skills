---
name: private-workspace-signal-connector
description: "Use this API-backfill skill when workflows need private SaaS context from Slack, Notion, Drive, GitHub, Linear, Zendesk, Intercom, email, calendar, CRM, analytics, or product events. Requires private connectors."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/private-workspace-signal-connector
  source: https://github.com/unifapi-agent/skills
  category: "API Backfill"
  api_status: planned
---

# Private Workspace Signal Connector

## Purpose

Combine private customer/workspace signals with public UnifAPI signals while respecting source permissions, auditability, and data boundaries.

## Required Inputs

- Private systems to connect
- Public-data skills to combine with
- Permission and retention requirements
- Decision or alert to produce

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use public UnifAPI skills only, and ask the user to provide private context manually if needed.
- Keep public and private evidence separated in outputs.
- Do not ask users to paste secrets into chat.

## API Backfill Required

- OAuth connectors for Slack, Notion, Google Drive, GitHub, Linear, Zendesk, Intercom, email, calendar, CRM, analytics, and product events
- Per-source scopes, audit logs, and retention rules
- Cross-source entity resolution
- Permission-aware retrieval and redaction
- Connector health and sync status

## Workflow

1. Clarify which private sources are required and why.
2. Verify connector scopes and data boundaries before retrieval.
3. Combine private and public evidence with source labels.
4. Return a decision artifact and audit trail.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Private-plus-public signal brief
- Source coverage and permissions
- Cross-source entity map
- Decision recommendation
- Audit and retention notes

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not use UnifAPI MCP OAuth as if it grants private SaaS access.
- Do not ask users to paste API keys or private exports unless explicitly needed as a fallback.
- Keep source permissions and sensitive data handling visible.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this skill waits on API backfill.
