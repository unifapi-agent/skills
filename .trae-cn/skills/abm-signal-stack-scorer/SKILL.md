---
name: abm-signal-stack-scorer
description: "Use this skill when ranking target accounts by stacked ABM buying signals from public activity, hiring, content, ads, news, web intent proxies, or user-provided CRM context."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/abm-signal-stack-scorer
  source: https://github.com/unifapi-agent/skills
  category: GTM
  runtime_status: agent_native
---

# ABM Signal Stack Scorer

## Purpose

Combine several weak public signals into a ranked account-priority queue for sales, marketing, customer success, or founder-led outbound.

## Required Inputs

- Target account list, ICP, or account segment
- Signal types and scoring weights
- Lookback window and action threshold
- Intended play: outbound, ads, content, event invite, partner motion, or customer expansion

If the user has not provided a target segment or scoring goal, ask for those before building a scorecard.

## Agent Runtime Coverage

- Use host search/fetch for news, launches, pricing/page changes, and public web intent proxies.
- Use UnifAPI LinkedIn, X, Reddit, YouTube, TikTok, Instagram, and Threads skills for public activity signals.
- Use user-provided CRM, CSV, product, or analytics exports only when the user supplies them.
- Treat web intent, CRM ownership, suppression lists, and private analytics as API/backfill or user-provided data.

## API Backfill Required

- Persistent signal storage and decay
- Web intent and first-party event ingestion
- CRM/account ownership and suppression connectors
- Scheduled scoring runs and alert delivery
- Configurable scoring models with audit logs

## Workflow

1. Define the scorecard before collecting evidence.
2. Normalize accounts and known aliases, domains, LinkedIn slugs, and social handles.
3. Gather only the signals needed for the scorecard.
4. Score fit, intent, urgency, reachability, and risk separately.
5. Recommend the next play and explain which signal would change the priority.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Ranked account queue
- Signal stack per account
- Fit, intent, urgency, and risk scores
- Recommended play and owner handoff
- Missing data and API backfill needs

Also include runtime tools used, UnifAPI operations used, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not present lack of public signals as proof an account has no intent.
- Do not mix private CRM or analytics data unless the user provides it or a future connector authorizes it.
- Keep score formulas inspectable and avoid black-box ranking.
- Mark suppression, compliance, or territory checks as unresolved unless supported by user-provided data.

## Related Skills

- Use `account-signal-monitor` for a single signal digest.
- Use `lead-account-scoring-agent` for row-level lead or account scoring.
- Use `scheduled-signal-alerts` when the score should run repeatedly.
