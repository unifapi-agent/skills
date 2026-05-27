---
name: reddit-voice-of-customer
description: "Use this skill when mining Reddit posts and comments for customer language, pain points, objections, alternatives, and content ideas."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/reddit-voice-of-customer
  source: https://github.com/unifapi-agent/skills
  category: Growth
---

# Reddit Voice Of Customer

## Purpose

Create a voice-of-customer brief that helps with landing-page copy, positioning, content, sales scripts, or product discovery.

## Required Inputs

- Topic, product category, or competitor
- Subreddits or thread URLs/IDs
- Desired copy or research output

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /reddit/posts/{id}`
- `GET /reddit/posts/{id}/comments`
- `GET /reddit/users/{username}/posts`
- `GET /reddit/users/{username}/comments`
- `GET /reddit/trending-searches`

## Workflow

1. Gather threads and comments relevant to the product problem.
2. Extract natural language around pains, desired outcomes, objections, and alternatives.
3. Cluster themes by frequency and intensity.
4. Turn findings into copy, FAQ, or research recommendations.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- VOC theme clusters
- Representative short excerpts
- Objections and desired outcomes
- Copy angles
- Research caveats

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Respect public-data boundaries and quote minimally.
- Do not deanonymize users or combine data for identity inference.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
