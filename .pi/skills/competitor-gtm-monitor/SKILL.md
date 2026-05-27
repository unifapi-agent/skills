---
name: competitor-gtm-monitor
description: "Use this skill when monitoring competitors for public GTM changes across LinkedIn, X, Reddit, YouTube, TikTok, Instagram, and Threads."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/competitor-gtm-monitor
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# Competitor GTM Monitor

## Purpose

Produce an evidence-backed competitor digest focused on GTM strategy signals: launches, positioning shifts, hiring, LinkedIn ads, campaign themes, and customer/community reactions.

## Required Inputs

- Competitor names, handles, and company slugs
- Keywords and category terms
- Monitoring window and priority topics

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/companies/{slug}/posts`
- `GET /linkedin/companies/{slug}/jobs`
- `GET /linkedin/search/ads`
- `GET /x/tweets/search/recent`
- `GET /reddit/posts/{id}/comments`
- `GET /youtube/search`
- `GET /tiktok/search/videos`

## Workflow

1. Resolve competitor aliases and official handles.
2. Collect public signals across the strongest available channels.
3. Classify evidence as launch, pricing, positioning, hiring, campaign, customer proof, complaint, or noise.
4. Return a ranked digest with recommended counter-moves.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Competitor signal digest
- Positioning shift notes
- Campaign/ad themes
- Customer reaction evidence
- Recommended actions

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not claim full web, SEO, or ad-spend coverage with the current API surface.
- Show query coverage so users can see blind spots.
- Use `cross-channel-competitor-monitor` instead when the main job is comparing owned-channel posting cadence across known handles.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
