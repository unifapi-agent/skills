---
name: linkedin-ad-intel
description: "Use this skill when researching competitor, category, or account messaging through LinkedIn Ad Library data."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/linkedin-ad-intel
  source: https://github.com/unifapi-agent/skills
  category: GTM
---

# LinkedIn Ad Intel

## Purpose

Summarize what an account or competitor is actively testing in paid LinkedIn messaging and turn it into positioning, offer, and audience insights.

## Required Inputs

- Advertiser/company name or keywords
- Competitor list or category terms
- Optional region or time filters

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /linkedin/search/ads`
- `GET /linkedin/ads/{id}`
- `GET /linkedin/companies/{slug}`
- `GET /linkedin/search/posts`

## Workflow

1. Search relevant ad-library entries and remove weak matches.
2. Group ads by offer, pain point, persona, proof, and CTA.
3. Compare repeated messages against organic company posts.
4. Write a concise ad-intelligence brief.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Active ad themes
- Offer and CTA map
- Audience hypothesis
- Competitive positioning notes
- Ideas to test or avoid

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not claim spend, conversion, or targeting details unless the source exposes them.
- Label creative-performance conclusions as hypotheses.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.
