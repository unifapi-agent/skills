---
name: backlink-mention-monitor
description: "Use this skill when checking backlinks, referring domains, brand mentions, competitor mentions, link opportunities, and PR/link-building gaps from public web evidence or user exports."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/backlink-mention-monitor
  source: https://github.com/unifapi-agent/skills
  category: SEO
  runtime_status: agent_native
---

# Backlink Mention Monitor

## Purpose

Turn public web mentions and user-provided backlink exports into a link, PR, and authority-building action brief.

## Required Inputs

- Brand/domain, competitor domains, or target pages
- Target market, language, and freshness window
- Whether the user has backlink exports from Ahrefs, Semrush, GSC, or another tool
- Goal: reclaim links, find mentions, compare competitors, or build outreach targets

Use host search/fetch for one-off checks. State an API gap when the user needs a complete backlink index, new/lost link history, authority metrics, or automated outreach.

## Agent Runtime Coverage

- Use web search operators, publisher searches, news search, and known pages for public mention discovery.
- Parse user-provided backlink/referring-domain CSV exports with JS/TS or Python.
- Use `news-pr-monitor`, `web-research-agent`, and public social skills for amplification context.
- Do not claim complete backlink coverage without a backlink index or user export.

## API Backfill Required

- Backlink and referring-domain index
- New/lost link history
- Authority, spam, anchor-text, and link-type metrics
- Unlinked mention detection at scale
- Outreach/CRM handoff and response tracking

## Workflow

1. Separate owned domain, competitor domains, brand aliases, and target pages.
2. Collect mentions, linking pages, or export rows based on available inputs.
3. Classify each item as linked mention, unlinked mention, competitor-only link, risky link, or outreach prospect.
4. Prioritize by relevance, authority proxy, freshness, and conversion value.
5. Return a link-building or monitoring action queue with evidence.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Backlink/mention digest
- Linked and unlinked mentions
- Competitor link gaps
- Outreach or reclaim priorities
- API/data gaps and confidence

Also include runtime tools used, UnifAPI operations used, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not promise complete backlink coverage from ordinary web search.
- Avoid recommending spammy or paid-link tactics.
- Keep outreach targets grounded in source relevance and explicit evidence.
- Separate observed links from inferred authority.

## Related Skills

- Use `seo-aeo-monitor` for broader search visibility and answer-engine checks.
- Use `news-pr-monitor` for funding, launch, and publisher narratives.
- Use `web-page-change-monitor` when tracking specific partner or directory pages.
