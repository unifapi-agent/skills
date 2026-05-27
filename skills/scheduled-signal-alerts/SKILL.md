---
name: scheduled-signal-alerts
description: "Use this planned skill when a monitor should run daily, weekly, or on thresholds and notify Slack, email, webhook, or CRM. Current skills define queries only; full execution requires schedules, diffs, storage, and notifications."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/scheduled-signal-alerts
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# Scheduled Signal Alerts

## Purpose

Turn one-off signal workflows into durable monitors with cadence, thresholds, diffs, and alert destinations.

## Required Inputs

- Monitor goal and source skills
- Cadence, threshold, and freshness rules
- Notification destination
- Escalation and suppression criteria

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Define the monitor plan, queries, scoring rubric, and expected output.
- Use existing monitor skills such as `account-signal-monitor`, `competitor-gtm-monitor`, `x-social-listening`, and `crypto-narrative-monitor` as sources.
- Do not claim persistence or notification delivery without monitor infrastructure.

## API Backfill Required

- Saved query and monitor definitions
- Scheduling engine
- Result snapshot and diff storage
- Threshold evaluation
- Slack/email/webhook/CRM notifications
- Alert history, acknowledgement, and suppression state

## Workflow

1. Choose the source skill and define the signal schema.
2. Set cadence, threshold, and dedupe rules.
3. When infrastructure exists, run scheduled checks and compute diffs.
4. Send concise alerts with evidence, severity, and recommended action.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Monitor specification
- Alert schema
- Threshold and dedupe rules
- Latest signal digest
- Notification/audit history when available

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not represent a prompt as a durable scheduled job.
- Avoid noisy alerts by requiring threshold and dedupe rules.
- Preserve evidence and query coverage in every alert.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
