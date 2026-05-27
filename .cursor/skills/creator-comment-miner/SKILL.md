---
name: creator-comment-miner
description: "Use this skill when mining public comments, replies, quotes, or reactions on creator posts for audience fit, objections, questions, sentiment, and campaign ideas. YouTube comments are a gap; use video metadata as context."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/creator-comment-miner
  source: https://github.com/unifapi-agent/skills
  category: Creator Marketing
---

# Creator Comment Miner

## Purpose

Analyze audience response under specific posts to decide whether a creator, topic, or message is worth using. For YouTube, current UnifAPI coverage supports video metadata and related-video context, not comment mining.

## Required Inputs

- Post, video, or shortcode IDs/URLs
- Campaign/product context
- Questions to answer

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /instagram/posts/{shortcode}/comments`
- `GET /tiktok/videos/{id}/comments`
- `GET /youtube/videos/{video_id}`
- `GET /linkedin/posts/{id}/comments`
- `GET /reddit/posts/{id}/comments`
- `GET /x/tweets/{id}/quote_tweets`

## Workflow

1. Fetch comments or quote context for the target content.
2. Cluster questions, objections, praise, confusion, and competitor mentions.
3. Assess whether the audience matches the campaign goal.
4. Recommend creator action, message refinement, or skip.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Audience-response summary
- Question/objection clusters
- Audience-fit assessment
- Campaign message ideas
- Risks
- Source capability notes

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Quote sparingly and anonymize where possible.
- Do not treat comment sentiment as a statistically representative survey.
- Current UnifAPI YouTube coverage does not expose comments; record YouTube comment mining as a coverage gap when needed.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
