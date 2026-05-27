---
name: linkedin-company-content-monitor
description: "Use this skill when monitoring LinkedIn company-page posts for competitor messaging, campaign cadence, and content themes."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/linkedin-company-content-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# LinkedIn Company Content Monitor

## Purpose

Convert company-page posting activity into a channel-agent style digest with themes, notable posts, and recommended response content.

## Required Inputs

- LinkedIn company slugs or company-page URLs to monitor
- Topics or competitors
- Lookback window

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/companies/{slug}/posts`
- `GET /linkedin/posts/{id}`
- `GET /linkedin/posts/{id}/comments`
- `GET /linkedin/posts/{id}/reactions`
- `GET /linkedin/search/posts`

## Workflow

1. Fetch recent company posts and optionally comments or reactions for high-signal posts.
2. Classify posts by theme, funnel stage, persona, and CTA.
3. Detect new or repeated narratives.
4. Draft response ideas, counter-positioning, or content opportunities.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Posting cadence summary
- Theme map
- High-signal posts
- Suggested response angles
- Watchlist queries

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not overfit on vanity engagement alone.
- Separate observed copy from strategic inference.
- If the user gives only a domain or loose company name, ask for the LinkedIn company URL unless the slug is already known from context.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
