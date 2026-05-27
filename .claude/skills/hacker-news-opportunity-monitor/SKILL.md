---
name: hacker-news-opportunity-monitor
description: "Use this skill when finding Hacker News discussions, Show HN launches, Ask HN questions, competitor mentions, or technical-founder opportunities for helpful participation."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/hacker-news-opportunity-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
  runtime_status: agent_native
---

# Hacker News Opportunity Monitor

## Purpose

Find HN threads where a product, open-source project, technical article, or founder story can help the community, then draft useful comments, launch angles, or monitoring queries.

## Required Inputs

- Product, project, article, or category context
- Target audience and participation constraints
- Optional competitors, keywords, or launch date

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before searching.

## Agent Runtime Coverage

- Use host web search/fetch or browser tools to search Hacker News pages.
- Use public HN endpoints when convenient, such as Algolia HN search and the Firebase item/top/new feeds, after confirming they are reachable in the runtime.
- Use UnifAPI X/Reddit/YouTube/LinkedIn skills only to check whether an HN topic also has broader social demand.

## Workflow

1. Build keyword variants from the product, competitors, pain points, and technical category.
2. Search HN for recent and historically high-signal threads, especially Ask HN, Show HN, Launch HN, and competitor discussions.
3. Read thread context and comments before recommending any action.
4. Classify each opportunity as answer, learn, launch, content, competitor, hiring, investor, or avoid.
5. Draft helpful, non-promotional response angles or Show HN positioning.

## Output Contract

Return a decision-ready artifact, not a raw scrape. Include:

- Ranked HN opportunities
- Thread context and evidence links
- Why the community may care
- Suggested comment, launch, or content angle
- Risk notes and topics to avoid

Also include runtime tools used, query coverage, assumptions, confidence, and UnifAPI operations used when available.

## Guardrails

- Do not recommend drive-by promotion or disguised advertising.
- Do not post or vote on the user's behalf.
- Separate current thread evidence from broader market inference.
- Respect HN norms: technical specificity, founder candor, and no astroturfing.
- If the user needs persistent monitoring or notifications, use `scheduled-signal-alerts` and mark any productized API gaps.

## Related Skills

- Use `web-research-agent` for broader public web research around the same topic.
- Use `reddit-opportunity-finder` when Reddit communities are the better channel.
- Use `social-launch-monitor` for cross-channel launch reaction tracking.
