---
name: campaign-reaction-analyst
description: "Use this skill when analyzing public reaction to a marketing campaign, announcement, founder post, video, ad concept, or content series."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/campaign-reaction-analyst
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Campaign Reaction Analyst

## Purpose

Combine public comments, quotes, replies, posts, and videos into a structured reaction analysis for campaign iteration.

## Required Inputs

- Campaign assets or post/video IDs
- Target audience and goal
- Channels to analyze

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/tweets/{id}/quote_tweets`
- `GET /linkedin/posts/{id}/comments`
- `GET /reddit/posts/{id}/comments`
- `GET /instagram/posts/{shortcode}/comments`
- `GET /tiktok/videos/{id}/comments`
- `GET /youtube/videos/{video_id}`

## Workflow

1. Fetch reaction surfaces for the provided assets.
2. Cluster praise, confusion, objections, jokes, comparison, and purchase intent.
3. Identify whether the campaign message landed with the intended audience.
4. Recommend edits, follow-up posts, or support responses.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Reaction analysis
- Message clarity score
- Objection clusters
- Audience-fit notes
- Next iteration recommendations

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not use a single channel as proof of overall campaign performance.
- Do not produce engagement manipulation tactics.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
