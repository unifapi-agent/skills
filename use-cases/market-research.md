# Market & news research with UnifAPI

Programmatic market research that combines search engine results, real-time news, and on-demand web scraping. Live: [unifapi.com/solutions/market-research](https://unifapi.com/solutions/market-research).

## The agent loop

1. **Plan** queries from the research brief
2. **Pull SERPs** for each query → [Google SERP](https://unifapi.com/apis/google-serp) / [Bing SERP](https://unifapi.com/apis/bing-serp)
3. **Pull news** for time-sensitive context → [News Search](https://unifapi.com/apis/news-search)
4. **Scrape the top results** to LLM-ready markdown → [URL → markdown](https://unifapi.com/apis/url-to-markdown)
5. **Synthesize** with the LLM, citing sources

## APIs used

- [Google SERP](https://unifapi.com/apis/google-serp) / [Bing SERP](https://unifapi.com/apis/bing-serp) — query the open web
- [News Search](https://unifapi.com/apis/news-search), [News Sources](https://unifapi.com/apis/news-sources) — real-time press
- [URL → markdown](https://unifapi.com/apis/url-to-markdown) — turn any SERP result into LLM context
- [URL → structured](https://unifapi.com/apis/url-to-data) — extract numbers / tables from financial reports

## Why this shape wins

Deep-research agents (think the OpenAI / Anthropic / Perplexity "deep research" patterns) all share the same three primitives: **SERP → fetch → synthesize**. UnifAPI provides all three under one key, so the agent's tool schema stays small and the bill stays predictable.

Read also: [Unified API for AI agents](../guides/unified-api-for-ai-agents.md).

[**→ Sign up**](https://unifapi.com) · [Browse APIs](https://unifapi.com/apis) · Related: [Competitive intelligence](./competitive-intelligence.md), [Agent web access](./agent-web-access.md)
