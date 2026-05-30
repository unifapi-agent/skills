---
name: threads-opportunity-monitor
description: "Use this skill when monitoring Threads for recent or top posts, creator profiles, replies, and discussion opportunities."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/threads-opportunity-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Threads Opportunity Monitor

## Purpose

Find Threads conversations and accounts worth following, replying to, or using for content inspiration.

## Required Inputs

- Topic, keyword, creator, or brand
- Recent vs top search preference
- Action goal

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /threads/search/recent`
- `GET /threads/search/top`
- `GET /threads/search/profiles`
- `GET /threads/users/{username}`
- `GET /threads/users/{username}/posts`
- `GET /threads/users/{username}/replies`
- `GET /threads/users/{username}/reposts`

## Workflow

1. Search posts or profiles based on the goal.
2. Enrich high-signal accounts with public posts/replies/reposts.
3. Cluster discussion themes and active voices.
4. Recommend response, follow, or content actions.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Threads opportunity digest
- Accounts to watch
- Conversation themes
- Suggested replies or posts
- Coverage caveats

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not automate engagement or posting.
- Threads coverage should be treated as channel-specific, not whole-market sentiment.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
