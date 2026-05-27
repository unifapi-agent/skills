---
name: youtube-creator-research
description: "Use this skill when researching YouTube channels or videos for sponsorship, partnership, content strategy, or competitive intelligence."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/youtube-creator-research
  source: https://github.com/unifapi-agent/skills
  category: Creator Marketing
---

# YouTube Creator Research

## Purpose

Summarize channel fit, video themes, Shorts activity, related-video context, and sponsor/partnership angles from public YouTube data.

## Required Inputs

- Channel URL/id, video URL/id, or topic search
- Campaign/product context
- Fit criteria

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /youtube/resolve/channel-id`
- `GET /youtube/channels/{channel_id}`
- `GET /youtube/channels/{channel_id}/videos`
- `GET /youtube/channels/{channel_id}/shorts`
- `GET /youtube/videos/{video_id}`
- `GET /youtube/videos/{video_id}/related`
- `GET /youtube/search`

## Workflow

1. Resolve channel or video identifiers.
2. Fetch channel, recent videos, Shorts, and related videos as needed.
3. Classify content themes, audience fit, consistency, and integration opportunities.
4. Return a sponsorship or content-research brief.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Channel/video brief
- Audience and theme fit
- Sponsor angle ideas
- Relevant videos
- Risks and unanswered questions

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not infer private channel analytics.
- Avoid using Shorts-only evidence for long-form sponsorship conclusions without caveats.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
