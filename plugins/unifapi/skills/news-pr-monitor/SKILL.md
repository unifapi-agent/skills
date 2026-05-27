---
name: news-pr-monitor
description: "Use this planned skill to monitor funding, launches, executive changes, incidents, regulation, PR, and market narratives. Uses social proxy signals today and names required news/search APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/news-pr-monitor
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# News PR Monitor

## Purpose

Produce a trusted news and PR digest that separates publisher evidence, social amplification, and recommended GTM response.

## Required Inputs

- Companies, people, markets, or topics to watch
- Source types and geographies
- Freshness window
- Alert severity rules

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use LinkedIn company posts, X search, Reddit discussion, and YouTube/TikTok mentions as public reaction proxies.
- Use `social-launch-monitor` and `competitor-gtm-monitor` for partial coverage.
- Do not claim publisher/news coverage without news APIs.

## API Backfill Required

- News search and press-release feeds
- Publisher/source metadata and credibility signals
- Entity extraction and deduplication
- Funding/executive/regulatory/event classification
- Historical monitoring and alerting

## Workflow

1. Define tracked entities and event categories.
2. Collect publisher/news evidence when available, then social amplification.
3. Cluster duplicate stories and classify business relevance.
4. Return a digest with recommended response or follow-up research.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- News/PR digest
- Event classification
- Primary sources and amplification
- Business impact assessment
- Recommended action queue

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not treat social mentions as verified news.
- Separate official announcements, publisher reports, and community speculation.
- Flag unverified or single-source claims.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
