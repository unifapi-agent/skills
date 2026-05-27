---
name: paid-ads-operator
description: "Use this API-backfill skill to inspect, launch, monitor, or optimize paid ads across Google, Meta, LinkedIn, TikTok, X, or other ad platforms. Today only public LinkedIn Ad Library observation is covered."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/paid-ads-operator
  source: https://github.com/unifapi-agent/skills
  category: "API Backfill"
  api_status: planned
---

# Paid Ads Operator

## Purpose

Turn campaign goals and competitive ad intelligence into safe paid-media recommendations or executed ad operations when connectors exist.

## Required Inputs

- Ad platform and account context
- Campaign objective, audience, budget, and creative
- Competitors or benchmark ads
- Optimization constraints

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use `linkedin-ad-intel` for public competitor creative research.
- Use social/content skills to generate message hypotheses.
- Do not claim account performance, spend, or campaign changes without ad connectors.

## API Backfill Required

- Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, and X Ads read/write APIs
- Spend, impressions, CTR, CPC, conversions, and creative performance data
- Audience and targeting metadata
- Creative upload and campaign creation
- Budget controls, approval workflow, and rollback/audit log

## Workflow

1. Clarify campaign objective and constraints.
2. Use public ad-library/social evidence for creative hypotheses.
3. When ad connectors exist, inspect campaign performance and propose changes.
4. Execute only approved changes and report before/after metrics.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Paid-media brief
- Competitive creative themes
- Campaign optimization recommendations
- Approved change log when available
- Performance caveats

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not infer ad spend or conversion performance from public ad libraries.
- Do not change budgets or launch ads without explicit approval and connector confirmation.
- Keep compliance and brand-safety constraints visible.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this skill waits on API backfill.
