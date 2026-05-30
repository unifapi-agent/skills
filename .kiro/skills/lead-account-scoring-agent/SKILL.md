---
name: lead-account-scoring-agent
description: "Use this skill when scoring leads, contacts, accounts, creators, partners, or companies against an ICP using public evidence, provided tables, and explicit scorecards."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/lead-account-scoring-agent
  source: https://github.com/unifapi-agent/skills
  category: GTM
  runtime_status: agent_native
---

# Lead Account Scoring Agent

## Purpose

Create an inspectable scorecard that ranks rows by fit, intent, reachability, and recommended action.

## Required Inputs

- Rows to score, or a source list to build first
- ICP and disqualifiers
- Score dimensions and weights, or permission to propose them
- Action thresholds and output format

If the user asks for scoring without a clear ICP, define or request the scorecard before collecting more data.

## Agent Runtime Coverage

- Use JS/TS or Python to score local CSV/JSON/Markdown tables.
- Use host search/fetch and UnifAPI social/professional skills to fill evidence gaps.
- Use user-provided CRM or enrichment fields only when supplied.
- Treat private intent, contact verification, and proprietary firmographics as API backfill unless provided.

## API Backfill Required

- Persistent scoring functions and versioned scorecards
- Bulk enrichment and provider waterfalls
- CRM ownership, suppression, stage, and sequence connectors
- Model evaluation, calibration, and audit logs

## Workflow

1. Define the scorecard, weights, minimum evidence, and disqualifiers.
2. Normalize rows and create stable row IDs.
3. Enrich only fields that affect the score.
4. Score each row with reasons and missing-data penalties.
5. Recommend action buckets: act now, nurture, research more, exclude, or hold.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Scored table or output file path
- Score breakdown and rationale
- Missing data and conflicts
- Action bucket per row
- Scorecard assumptions and calibration notes

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Keep score logic visible and adjustable.
- Do not hide missing evidence behind a single confidence score.
- Do not make sensitive demographic or protected-class inferences.
- Do not claim CRM readiness without dedupe, suppression, and ownership checks.

## Related Skills

- Use `icp-account-list-builder` when the user needs accounts discovered first.
- Use `persona-classification-agent` for buyer/persona labels.
- Use `crm-export-sequence` for downstream field mapping or sequence handoff.
