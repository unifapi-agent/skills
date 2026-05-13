# News Sources API for AI agents — UnifAPI

[UnifAPI's News Sources API](https://unifapi.com/apis/news-sources) lets AI agents browse and filter news by publication — useful when you want all coverage from a specific outlet rather than a keyword search.

- **Live page:** [unifapi.com/apis/news-sources](https://unifapi.com/apis/news-sources)
- **MCP tools:** `news.sources`, `news.from_source` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `news/sources/list` | List supported outlets with metadata |
| `news/sources/articles` | Recent articles from a given outlet |

## Example

```bash
curl https://api.unifapi.com/v1/news/sources/articles \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"source": "stratechery.com", "since": "30d"}'
```

## What it's for

- [Market research](../use-cases/market-research.md) — curate a specific publication's coverage
- Newsroom-style agents that compare how outlets cover the same event
- Investor research — pull all coverage from a named analyst / outlet

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
