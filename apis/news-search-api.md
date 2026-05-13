# News Search API for AI agents — UnifAPI

[UnifAPI's News Search API](https://unifapi.com/apis/news-search) gives AI agents real-time, queryable access to global news articles — one bearer key, pay-per-call.

- **Live page:** [unifapi.com/apis/news-search](https://unifapi.com/apis/news-search)
- **MCP tool:** `news.search` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoint

```bash
curl https://api.unifapi.com/v1/news/search \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{
    "q": "anthropic claude",
    "since": "7d",
    "lang": "en",
    "sources": ["techcrunch.com", "theverge.com"]
  }'
```

## What it's for

- [Market research](../use-cases/market-research.md) — time-sensitive press context
- [Competitive intelligence](../use-cases/competitive-intelligence.md) — funding, hires, launches
- [Social listening](../use-cases/social-listening.md) — extend brand monitoring beyond social
- [Lead enrichment](../use-cases/lead-enrichment.md) — what has been written about a target

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
