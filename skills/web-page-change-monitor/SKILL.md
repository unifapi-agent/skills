---
name: web-page-change-monitor
description: "Use this planned skill to monitor pricing pages, docs, changelogs, terms, feature pages, app listings, or competitor sites for changes. Defines current proxy options and required crawl/diff/alert APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/web-page-change-monitor
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# Web Page Change Monitor

## Purpose

Detect meaningful changes on watched public pages and turn them into competitive, product, legal, or GTM alerts.

## Required Inputs

- URLs or domains to watch
- Change types to classify
- Monitoring cadence and alert threshold
- Business context for actionability

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use competitor social and LinkedIn posts as partial launch/change proxies.
- Use direct user-provided page text if the user pastes it into the conversation.
- Do not claim persistent monitoring until saved monitor infrastructure exists.

## API Backfill Required

- URL fetch and rendered snapshot API
- DOM/text/image diffing
- Crawler with robots/compliance metadata
- Historical snapshot storage
- Saved monitor schedules, thresholds, and notifications
- Change classifiers for pricing, docs, feature, legal, and positioning changes

## Workflow

1. Define watched pages and what counts as meaningful change.
2. Capture baseline snapshots when page APIs exist.
3. Compare new snapshots, classify changes, and suppress noise.
4. Return alerts with before/after evidence and recommended response.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Change alert digest
- Before/after summary
- Change category and severity
- Evidence snapshots or excerpts
- Recommended next action

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not represent one-time manual checks as continuous monitoring.
- Respect source compliance and robots metadata when crawler APIs exist.
- Avoid alerting on cosmetic diffs unless the user asked for them.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
