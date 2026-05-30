---
name: news-pr-monitor
description: "Use this skill to monitor funding, launches, executive changes, incidents, regulation, PR, and market narratives using host-agent search/fetch plus UnifAPI social amplification."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/news-pr-monitor
  source: https://github.com/unifapi-agent/skills
  category: Research
  api_status: api_backfill
  runtime_status: agent_native
---

# News PR Monitor

## Purpose

Produce a trusted news and PR digest that separates publisher evidence, social amplification, and recommended GTM response.

## Required Inputs

- Companies, people, markets, or topics to watch
- Source types and geographies
- Freshness window
- Alert severity rules

Use host web search/fetch for one-off publisher and press-release research. State an API gap only when the user needs hosted news feeds, source normalization, deduplication at scale, historical monitoring, or alert delivery.

## Agent Runtime Coverage

- Use host web search/fetch to find public articles, press releases, funding announcements, regulatory pages, and incident posts.
- Use LinkedIn company posts, X search, Reddit discussion, and YouTube/TikTok mentions as public reaction and amplification signals.
- Use `social-launch-monitor` and `competitor-gtm-monitor` for partial coverage.
- Do not claim scheduled publisher/news monitoring without news or monitor APIs.

## API Backfill Required

- Productized news search and press-release feeds
- Publisher/source metadata and credibility signals
- Entity extraction and deduplication
- Funding/executive/regulatory/event classification
- Historical monitoring and alerting

## Workflow

1. Define tracked entities and event categories.
2. Collect publisher/news evidence with host search/fetch or news APIs when available, then social amplification.
3. Cluster duplicate stories and classify business relevance.
4. Return a digest with recommended response or follow-up research.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- News/PR digest
- Event classification
- Primary sources and amplification
- Business impact assessment
- Recommended action queue

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not treat social mentions as verified news.
- Separate official announcements, publisher reports, and community speculation.
- Flag unverified or single-source claims.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `social-launch-monitor` for launch reaction tracking.
- Use `competitor-gtm-monitor` when the news belongs in a competitor digest.
- Use `web-page-change-monitor` when the trigger is a changed page, changelog, or docs update.
