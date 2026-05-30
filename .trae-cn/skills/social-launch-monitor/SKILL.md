---
name: social-launch-monitor
description: "Use this skill when tracking launch reactions for a product, feature, token, campaign, or announcement across public social channels."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/social-launch-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Social Launch Monitor

## Purpose

Summarize launch awareness, questions, objections, supporters, detractors, and response opportunities.

## Required Inputs

- Launch name, URL, handles, or keywords
- Channels to include
- Launch window

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/tweets/search/recent`
- `GET /reddit/posts/{id}/comments`
- `GET /threads/search/recent`
- `GET /youtube/search`
- `GET /tiktok/search/videos`
- `GET /linkedin/search/posts`

## Workflow

1. Build exact and fuzzy queries for the launch.
2. Collect public mentions across supported channels.
3. Classify mentions as announcement, question, praise, complaint, misunderstanding, competitor comparison, or influencer amplification.
4. Recommend responses and content follow-ups.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Launch reaction digest
- Top questions and objections
- Influential amplifiers
- Response queue
- Follow-up content ideas

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not imply complete coverage outside supported social APIs.
- Flag likely false positives and ambiguous mentions.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
