# URL → Markdown API for AI agents — UnifAPI

[UnifAPI's URL → Markdown API](https://unifapi.com/apis/url-to-markdown) turns any web URL into LLM-ready markdown, stripping boilerplate, ads, and nav. Built for AI agents that need to read the open web at scale.

- **Live page:** [unifapi.com/apis/url-to-markdown](https://unifapi.com/apis/url-to-markdown)
- **MCP tool:** `scrape.markdown` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoint

```bash
curl https://api.unifapi.com/v1/scrape/markdown \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{
    "url": "https://news.ycombinator.com/item?id=123",
    "render_js": true,
    "include_links": true
  }'
```

Returns:

```json
{
  "url": "...",
  "title": "...",
  "markdown": "# Title\n\nBody...",
  "metadata": { "author": "...", "published_at": "..." }
}
```

## What it's for

- [Agent web access](../use-cases/agent-web-access.md) — the "fetch" primitive in any deep-research agent
- [Competitive intelligence](../use-cases/competitive-intelligence.md) — diff a competitor's pricing page on a schedule
- [Market research](../use-cases/market-research.md) — pull SERP top results into LLM context
- [Lead enrichment](../use-cases/lead-enrichment.md) — read a company's homepage / about / pricing

## How it compares

- vs [Firecrawl](../comparisons/unifapi-vs-firecrawl.md) — UnifAPI bundles scrape with social / SERP / news
- vs [ScrapingBee](../comparisons/unifapi-vs-scrapingbee.md) — UnifAPI returns LLM-ready markdown, not raw HTML

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
