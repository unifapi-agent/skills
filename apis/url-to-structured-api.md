---
title: URL → Structured API
nav_order: 11
parent: APIs
---

# URL → Structured Data API for AI agents — UnifAPI

[UnifAPI's URL → Structured API](https://unifapi.com/apis/url-to-data) turns any URL into a typed JSON object matching a schema you supply — an LLM-extraction call wrapped as one endpoint.

- **Live page:** [unifapi.com/apis/url-to-data](https://unifapi.com/apis/url-to-data)
- **MCP tool:** `scrape.structured` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoint

```bash
curl https://api.unifapi.com/v1/scrape/structured \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{
    "url": "https://example.com/pricing",
    "schema": {
      "type": "object",
      "properties": {
        "plans": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {"type": "string"},
              "price_usd_monthly": {"type": "number"},
              "features": {"type": "array", "items": {"type": "string"}}
            }
          }
        }
      }
    }
  }'
```

Returns JSON matching the schema, ready to drop into a database or another agent step.

## What it's for

- [Competitive intelligence](../use-cases/competitive-intelligence.md) — extract pricing tables, feature matrices
- [Lead enrichment](../use-cases/lead-enrichment.md) — pull company facts from a homepage / about page
- [Market research](../use-cases/market-research.md) — turn research sources into structured rows
- Any agent step that needs reliable JSON, not free-form text

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
