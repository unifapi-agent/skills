---
title: Bing SERP API
nav_order: 8
parent: APIs
---

# Bing SERP API for AI agents — UnifAPI

[UnifAPI's Bing SERP API](https://unifapi.com/apis/bing-serp) returns structured Bing search results — organic, news, images — for AI agents.

- **Live page:** [unifapi.com/apis/bing-serp](https://unifapi.com/apis/bing-serp)
- **MCP tools:** `bing_serp.*` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `bing-serp/search` | Bing organic + features |
| `bing-serp/news` | Bing News results |
| `bing-serp/images` | Image results |

## Example

```bash
curl https://api.unifapi.com/v1/bing-serp/search \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"q": "open source llm agents", "mkt": "en-US"}'
```

## What it's for

- Diversifying SERP sources beyond Google in [market-research agents](../use-cases/market-research.md)
- Cross-checking [competitive intelligence](../use-cases/competitive-intelligence.md) results
- Coverage redundancy when Google rate-limits

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
