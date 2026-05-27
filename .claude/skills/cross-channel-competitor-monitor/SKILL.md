---
name: cross-channel-competitor-monitor
description: "Use this skill when comparing competitor public activity across multiple social channels and producing a unified competitive digest."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/cross-channel-competitor-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Cross Channel Competitor Monitor

## Purpose

Create an Okara-style owned-channel competitor monitor using UnifAPI social operations as the evidence layer.

## Required Inputs

- Competitor handles/slugs per channel
- Category keywords
- Monitoring window

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/users/{id}/tweets`
- `GET /linkedin/companies/{slug}/posts`
- `GET /youtube/channels/{channel_id}/videos`
- `GET /tiktok/users/{id}/videos`
- `GET /instagram/users/{username}/posts`
- `GET /threads/users/{username}/posts`

## Workflow

1. Resolve official accounts on each requested channel.
2. Collect recent posts and videos.
3. Normalize each item by theme, CTA, format, and engagement proxy.
4. Compare cadence, message, content bets, and audience response.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Competitor activity matrix
- Channel-by-channel themes
- Notable campaigns
- Counter-content ideas
- Coverage gaps

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Use only handles or slugs that can be resolved with confidence.
- Do not claim ad, SEO, or newsletter coverage from this skill.
- Use `competitor-gtm-monitor` instead when the main job is broader GTM intelligence such as hiring, LinkedIn ads, launch positioning, or customer reactions.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
