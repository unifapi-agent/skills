---
name: web-page-change-monitor
description: "Use this skill to compare pricing pages, docs, changelogs, terms, feature pages, app listings, or competitor sites, using host fetch/shell for one-off checks and planned APIs for durable monitoring."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/web-page-change-monitor
  source: https://github.com/unifapi-agent/skills
  category: Research
  api_status: api_backfill
  runtime_status: agent_native
---

# Web Page Change Monitor

## Purpose

Detect meaningful changes on watched public pages and turn them into competitive, product, legal, or GTM alerts.

## Required Inputs

- URLs or domains to watch
- Change types to classify
- Monitoring cadence and alert threshold
- Business context for actionability

Use host fetch/browser, shell, JS/TS, or Python for one-off public page checks and comparisons. State an API gap only when the user needs durable scheduled monitoring, hosted snapshots, diff storage, threshold alerts, or normalized crawl metadata.

## Agent Runtime Coverage

- Fetch known public URLs with the host browser/fetch/shell when available.
- Compare current page text, HTML, JSON, or extracted sections against user-provided baselines or previous local artifacts.
- Use competitor social and LinkedIn posts as launch/change context, not as page-diff proof.
- Do not claim persistent monitoring until saved monitor infrastructure exists.

## API Backfill Required

- Hosted URL fetch and rendered snapshot API
- DOM/text/image diffing
- Crawler with robots/compliance metadata
- Historical snapshot storage
- Saved monitor schedules, thresholds, and notifications
- Change classifiers for pricing, docs, feature, legal, and positioning changes

## Workflow

1. Define watched pages and what counts as meaningful change.
2. Capture current page evidence through host fetch/browser or hosted page APIs when available.
3. Compare against baselines, classify changes, and suppress noise.
4. Return alerts with before/after evidence, recommended response, and any productized API gaps.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Change alert digest
- Before/after summary
- Change category and severity
- Evidence snapshots or excerpts
- Recommended next action

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not represent one-time manual checks as continuous monitoring.
- Respect source compliance and robots metadata when crawler APIs exist.
- Avoid alerting on cosmetic diffs unless the user asked for them.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for supporting launch/change context when page evidence needs market context.
