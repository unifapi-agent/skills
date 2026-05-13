# Google Trends API for AI agents — UnifAPI

[UnifAPI's Google Trends API](https://unifapi.com/apis/google-trends) gives AI agents structured trending-topic and interest-over-time data through one normalized endpoint.

- **Live page:** [unifapi.com/apis/google-trends](https://unifapi.com/apis/google-trends)
- **MCP tools:** `google_trends.*` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `google-trends/rising` | Currently-rising queries by geo |
| `google-trends/interest-over-time` | Time-series interest for a query |
| `google-trends/related-queries` | Related rising / top queries |
| `google-trends/by-region` | Geographic interest distribution |

## Example

```bash
curl https://api.unifapi.com/v1/google-trends/interest-over-time \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"q": "ai agents", "geo": "US", "timeframe": "12m"}'
```

## What it's for

- [Trend discovery](../use-cases/trend-discovery.md) — leading indicator for consumer interest
- [Market research](../use-cases/market-research.md) — quantify whether a topic is rising
- Investor / analyst agents tracking attention shifts

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
