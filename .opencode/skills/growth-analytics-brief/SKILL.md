---
name: growth-analytics-brief
description: "Use this skill when analyzing GA4, Google Search Console, product analytics, campaign exports, traffic reports, or SEO/content performance data supplied by the user."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/growth-analytics-brief
  source: https://github.com/unifapi-agent/skills
  category: Growth
  runtime_status: agent_native
---

# Growth Analytics Brief

## Purpose

Turn analytics exports and public context into a prioritized growth, SEO, content, or funnel-performance brief.

## Required Inputs

- Export files, pasted tables, screenshots with data, or a clear statement that no private analytics are available
- Domain/product, business goal, and comparison period
- Metrics to prioritize: traffic, conversions, queries, pages, campaigns, signups, activation, revenue, or retention

If the user asks for GA/GSC/private analytics without providing data or an authorized connector, state the gap and use only public/provided evidence.

## Agent Runtime Coverage

- Use JS/TS, Python, or spreadsheet tools to parse CSV/JSON/Markdown exports.
- Use host search/fetch to inspect public pages and competitor context.
- Use `seo-aeo-monitor`, `technical-seo-repo-auditor`, and social demand skills to explain possible causes.
- Do not claim live GA4, GSC, warehouse, or product analytics access without a connector or user-provided export.

## API Backfill Required

- GA4, Google Search Console, ad platform, product analytics, warehouse, and attribution connectors
- Scheduled metric snapshots
- Segment definitions and anomaly detection
- Dashboard and alert delivery
- Experiment and campaign metadata joins

## Workflow

1. Inventory available metrics, dimensions, date ranges, and known tracking limitations.
2. Normalize data and compare against the requested baseline period.
3. Identify top movers, leaks, winners, and anomalies.
4. Join public page, SEO, content, or social evidence where useful.
5. Recommend prioritized actions and what data would confirm the hypothesis.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Executive growth analytics brief
- Top metric movers and anomalies
- Likely causes with evidence
- Priority action list
- Data quality and connector gaps

Also include runtime tools used, UnifAPI operations used, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not infer precise private metrics from public traffic estimates.
- Keep analytics source names, date ranges, and filters explicit.
- Separate observed metric changes from causal hypotheses.
- Flag sampling, attribution, timezone, bot traffic, and tracking changes when relevant.

## Related Skills

- Use `seo-aeo-monitor` for search visibility and query/content opportunities.
- Use `technical-seo-repo-auditor` for codebase-level SEO fixes.
- Use `scheduled-signal-alerts` when analytics monitoring should repeat.
