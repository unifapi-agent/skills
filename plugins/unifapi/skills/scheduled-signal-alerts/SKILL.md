---
name: scheduled-signal-alerts
description: "Use this skill when a monitor should run daily, weekly, or on thresholds and notify Slack, email, webhook, or CRM. Host scheduling may handle simple follow-ups; product alerts need APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/scheduled-signal-alerts
  source: https://github.com/unifapi-agent/skills
  category: Growth
  api_status: api_backfill
  runtime_status: host_scheduling_optional
---

# Scheduled Signal Alerts

## Purpose

Turn one-off signal workflows into durable monitors with cadence, thresholds, diffs, and alert destinations.

## Required Inputs

- Monitor goal and source skills
- Cadence, threshold, and freshness rules
- Notification destination
- Escalation and suppression criteria

If the host agent supports reminders, automations, or recurring jobs, use that host-native mechanism for simple follow-ups when appropriate. State an API gap when the user needs cross-agent persistence, shared alert history, diff storage, webhook/CRM delivery, or product-owned monitor infrastructure.

## Current Coverage

- Define the monitor plan, queries, scoring rubric, and expected output.
- Use existing monitor skills such as `account-signal-monitor`, `competitor-gtm-monitor`, `x-social-listening`, and `crypto-narrative-monitor` as sources.
- Use host-native scheduling only when the runtime provides it and the user wants that local/thread-level behavior.
- Do not claim UnifAPI-owned persistence or notification delivery without monitor infrastructure.

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
- Use current social/professional-platform skills as the monitor sources and mark product alerting as API backfill when needed.
