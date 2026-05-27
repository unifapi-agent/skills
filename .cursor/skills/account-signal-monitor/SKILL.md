---
name: account-signal-monitor
description: "Use this skill when monitoring target accounts for public trigger events such as hiring, new posts, campaigns, creator mentions, or product narratives."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/account-signal-monitor
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# Account Signal Monitor

## Purpose

Produce a repeatable account-monitoring report that highlights actionable public signals for sales, partnerships, customer success, or investor relations.

## Required Inputs

- LinkedIn company slugs, LinkedIn company URLs, official social handles, or account names with enough context to identify them
- Signal types to monitor
- Lookback window and action threshold

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/companies/{slug}/posts`
- `GET /linkedin/companies/{slug}/jobs`
- `GET /linkedin/companies/{slug}/job-count`
- `GET /linkedin/search/posts`
- `GET /x/tweets/search/recent`
- `GET /youtube/search`

## Workflow

1. Normalize account identifiers and aliases.
2. Collect recent company posts, jobs, and cross-channel mentions.
3. Classify each signal as hiring, launch, partnership, content, complaint, competitor, or unknown.
4. Rank accounts by freshness, relevance, and likely business action.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Ranked account-signal table
- Per-account evidence bullets
- Recommended next action
- Suggested outreach timing
- Monitoring query list

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- This is public-signal monitoring, not CRM change-data capture.
- Do not present missing signals as proof that nothing happened.
- Do not imply UnifAPI can resolve arbitrary domains into company records unless a current operation exists; ask for slugs/handles or record that as a coverage gap.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
