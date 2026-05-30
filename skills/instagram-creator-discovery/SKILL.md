---
name: instagram-creator-discovery
description: "Use this skill when discovering and qualifying Instagram creators or brand advocates from public profiles, posts, reels, tagged posts, and comments."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/instagram-creator-discovery
  source: https://github.com/unifapi-agent/skills
  category: Creator Marketing
---

# Instagram Creator Discovery

## Purpose

Build a creator shortlist with public evidence of niche fit, content format, engagement quality, and collaboration angle.

## Required Inputs

- Niche or campaign brief
- Seed usernames, hashtags, locations, or keywords
- Follower/format constraints

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /instagram/search`
- `GET /instagram/users/{username}`
- `GET /instagram/users/{username}/posts`
- `GET /instagram/users/{username}/reels`
- `GET /instagram/users/{username}/tagged-posts`
- `GET /instagram/posts/{shortcode}/comments`

## Workflow

1. Find candidates through search, seeds, tagged posts, or reels.
2. Fetch profile and recent content for likely matches.
3. Score niche fit, content quality, engagement authenticity, and brand-safety signals.
4. Return a shortlist with collaboration ideas.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Creator shortlist
- Fit and risk scores
- Recent-content evidence
- Suggested collaboration format
- Questions before outreach

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not price Instagram deals with the X-only kol-pricing model unless adapted explicitly.
- Respect public profile boundaries and avoid sensitive inferences.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
