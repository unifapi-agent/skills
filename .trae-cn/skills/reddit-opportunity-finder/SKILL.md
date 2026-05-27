---
name: reddit-opportunity-finder
description: "Use this skill when finding Reddit conversations where a product, startup, open-source project, or content idea can help without spamming."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/reddit-opportunity-finder
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Reddit Opportunity Finder

## Purpose

Identify relevant Reddit threads, questions, pain points, and community norms for helpful participation or content planning.

## Required Inputs

- Product context or topic
- Subreddits or seed keywords
- Participation constraints

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /reddit/trending-searches`
- `GET /reddit/feed/popular`
- `GET /reddit/subreddits/{name}`
- `GET /reddit/posts/{id}`
- `GET /reddit/posts/{id}/comments`

## Workflow

1. Find relevant subreddits or threads through seeds and trending queries.
2. Read the post and comments before recommending any action.
3. Classify opportunities as answer, learn, content, competitor, support, or avoid.
4. Draft helpful response angles that respect community norms.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Ranked Reddit opportunities
- Pain-point summary
- Suggested response or content angle
- Community-risk notes
- Links/evidence

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not recommend drive-by promotion.
- If subreddit rules are not available through the API, say they must be checked manually.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
