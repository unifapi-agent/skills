---
name: x-community-monitor
description: "Use this skill when monitoring X Communities for category conversations, member lists, moderator activity, media posts, or web3/community signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/x-community-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# X Community Monitor

## Purpose

Create a channel-agent digest for public X Community activity and identify discussions worth joining or tracking.

## Required Inputs

- Community ID or search term
- Topics to watch
- Action constraints

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/communities/search`
- `GET /x/communities/{id}`
- `GET /x/communities/{id}/tweets`
- `GET /x/communities/{id}/members`
- `GET /x/communities/{id}/moderators`
- `GET /x/communities/{id}/media`

## Workflow

1. Find or validate the target community.
2. Fetch posts, media, members, or moderators only as needed.
3. Classify topics, active voices, recurring needs, and moderation context.
4. Recommend observation, engagement, creator outreach, or content angles.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Community snapshot
- Topic digest
- Active accounts to watch
- Engagement opportunities
- Risk notes

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Respect each community context; do not recommend automated posting.
- Do not infer private membership beyond public API results.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
