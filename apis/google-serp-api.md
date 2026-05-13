---
title: Google SERP API
nav_order: 7
parent: APIs
---

# Google SERP API for AI agents — UnifAPI

[UnifAPI's Google SERP API](https://unifapi.com/apis/google-serp) returns structured Google search results — organic, ads, knowledge panel, related searches — for AI agents that need to read the open web.

- **Live page:** [unifapi.com/apis/google-serp](https://unifapi.com/apis/google-serp)
- **MCP tools:** `google_serp.*` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `google-serp/search` | Standard SERP — organic + features |
| `google-serp/images` | Image search results |
| `google-serp/news` | Google News SERP |
| `google-serp/maps` | Maps / local pack |
| `google-serp/shopping` | Shopping results |

## Example

```bash
curl https://api.unifapi.com/v1/google-serp/search \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"q": "best ai agent frameworks 2026", "geo": "US"}'
```

## What it's for

- [Market research](../use-cases/market-research.md) — the canonical first step in deep-research agents
- [Agent web access](../use-cases/agent-web-access.md) — search-then-fetch loop
- [Competitive intelligence](../use-cases/competitive-intelligence.md) — keyword position tracking
- [Lead enrichment](../use-cases/lead-enrichment.md) — find a company's footprint

Compared with specialists: [UnifAPI vs SerpAPI](../comparisons/unifapi-vs-serpapi.md).

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
