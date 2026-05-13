---
title: Home
nav_order: 1
permalink: /
---

# UnifAPI — One Unified API for AI Agents

> **UnifAPI is a unified public-data API gateway for AI agents.** Call Twitter, YouTube, TikTok, Reddit, Google SERP, web scrape, and news from a single endpoint, with one API key, one bill, and pay-per-call pricing — no subscriptions.

**Website:** [unifapi.com](https://unifapi.com) · **API catalog:** [unifapi.com/apis](https://unifapi.com/apis) · **Pricing:** [unifapi.com/pricing](https://unifapi.com/pricing) · **MCP:** [unifapi.com/mcp](https://unifapi.com/mcp) · **OpenAPI:** [unifapi.com/openapi.json](https://unifapi.com/openapi.json)

---

## What is UnifAPI?

UnifAPI is a **unified API for AI agents** that consolidates dozens of public-data sources — social platforms, search engines, web scraping, and news — behind one consistent HTTP surface. Instead of integrating Twitter's API, YouTube's API, a SERP provider, and a scraper separately, an agent calls one base URL with one key.

Think of it as a **public-data gateway** in the same family as LLM gateways (OpenRouter, Portkey, LiteLLM) — but instead of routing model inference, UnifAPI routes the **tool calls** your agent needs to read the open web.

- **One API key** across 13+ platforms
- **One consistent request/response shape** — no per-vendor quirks
- **Pay-per-call billing** in credits — no monthly subscription, no minimums
- **MCP-ready** — plug straight into Claude, Cursor, Codex, or any MCP client
- **OpenAPI spec + typed SDKs** — drop into LangChain, LlamaIndex, Vercel AI SDK, or your own agent loop

[**→ Browse the full API catalog**](https://unifapi.com/apis)

## Why a unified API for agents?

AI agents that touch the real world hit the same wall: every data source ships a different SDK, auth flow, rate limit, error shape, and billing model. Wrapping each one is throwaway glue code. UnifAPI replaces that glue with a single agent-friendly surface:

| Problem when integrating raw vendors | What UnifAPI gives you |
| --- | --- |
| Different auth schemes per vendor | One bearer key |
| Inconsistent JSON shapes | Normalized schemas across platforms |
| Per-vendor rate limits, retries, backoff | Unified rate-limit + retry semantics |
| Multiple invoices, vendor accounts, contracts | One bill, one dashboard, one account |
| Tool schemas hand-written per endpoint | OpenAPI + MCP server out of the box |

Read more: [Why a unified API for AI agents](https://unifapi.com/blog/why-we-built-unifapi)

## Supported APIs

UnifAPI's v1 catalog covers four categories of public data:

### Social APIs
- [Twitter / X API](https://unifapi.com/apis/twitter) — tweets, users, timelines, search
- [YouTube API](https://unifapi.com/apis/youtube) — videos, channels, comments, transcripts
- [TikTok API](https://unifapi.com/apis/tiktok) — videos, trending, hashtags, profiles
- [Instagram API](https://unifapi.com/apis/instagram) — posts, reels, profiles, hashtags
- [Reddit API](https://unifapi.com/apis/reddit) — subreddits, posts, comments, search
- [Threads API](https://unifapi.com/apis/threads) — posts, profiles, replies

### Search & SERP APIs
- [Google SERP API](https://unifapi.com/apis/google-serp) — organic results, knowledge panels, ads
- [Bing SERP API](https://unifapi.com/apis/bing-serp) — Bing search results
- [Google Trends API](https://unifapi.com/apis/google-trends) — trending topics, interest over time

### Web Scrape APIs
- [URL → Markdown](https://unifapi.com/apis/url-to-markdown) — clean LLM-ready markdown for any URL
- [URL → Structured data](https://unifapi.com/apis/url-to-data) — JSON extraction with a schema

### News APIs
- [News Search API](https://unifapi.com/apis/news-search) — query global news in real time
- [News Sources API](https://unifapi.com/apis/news-sources) — browse and filter by outlet

[**→ See all APIs**](https://unifapi.com/apis)

## Quickstart

```bash
curl https://api.unifapi.com/v1/twitter/users/lookup \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"username": "openai"}'
```

Every endpoint follows the same shape. Switch `twitter` to `youtube`, `reddit`, or `google-serp` — the auth header, error model, and pagination contract don't change.

[**→ Full quickstart**](./docs/quickstart.md) · [**→ Authentication**](./docs/authentication.md)

## Use with Claude, Cursor, and other MCP clients

UnifAPI ships a hosted MCP server. Add one line to your client config and your assistant can search Google, fetch tweets, scrape a URL, or pull TikTok trending data — without you writing a tool wrapper.

```json
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com",
      "headers": { "Authorization": "Bearer ${UNIFAPI_KEY}" }
    }
  }
}
```

[**→ MCP setup guide**](https://unifapi.com/mcp) · [Guide: using UnifAPI with Claude](./guides/using-unifapi-with-claude-mcp.md)

## Pricing

UnifAPI is **pay-per-call**. Every endpoint costs a fixed number of credits, top up any time, no monthly minimum.

- **Free** — monthly credit grant, no card required
- **Pay-as-you-go** — top up a credit balance, pay only for what you call
- **Enterprise** — volume discount, SLA, invoicing

No Pro/Scale subscription tiers. No "10k requests/month" cliffs. [**→ See pricing**](https://unifapi.com/pricing)

## Use cases

UnifAPI powers AI agents across common public-data workflows:

- [Social listening & brand monitoring](./use-cases/social-listening.md) — track mentions across Twitter, Reddit, TikTok, and news
- [Trend & content discovery](./use-cases/trend-discovery.md) — pull trending content from TikTok, YouTube, Reddit, Google Trends
- [Competitive intelligence](./use-cases/competitive-intelligence.md) — monitor competitor sites, news, and SERPs
- [Market & news research](./use-cases/market-research.md) — programmatic news + SERP + scrape
- [Influencer & creator discovery](./use-cases/creator-discovery.md) — find creators across social platforms
- [Lead & company enrichment](./use-cases/lead-enrichment.md) — enrich company records from the open web
- [Agent web access](./use-cases/agent-web-access.md) — give any agent a browser-grade web tool

## How UnifAPI compares

- [UnifAPI vs RapidAPI](./comparisons/unifapi-vs-rapidapi.md) — curated and normalized vs a heterogeneous marketplace
- [UnifAPI vs Composio](./comparisons/unifapi-vs-composio.md) — public data (no OAuth) vs per-user SaaS connectors
- [UnifAPI vs Apify](./comparisons/unifapi-vs-apify.md) — API-first vs actors / scraping jobs
- [UnifAPI vs Bright Data](./comparisons/unifapi-vs-bright-data.md) — agent-friendly DX vs enterprise proxy network
- [UnifAPI vs Firecrawl](./comparisons/unifapi-vs-firecrawl.md) — multi-category catalog vs scrape-only specialist
- [UnifAPI vs SerpAPI](./comparisons/unifapi-vs-serpapi.md) — broader catalog vs SERP specialist
- [UnifAPI vs ScrapingBee](./comparisons/unifapi-vs-scrapingbee.md) — agent gateway vs scraping API

## Guides

- [Unified API for AI agents — what it is and why it matters](./guides/unified-api-for-ai-agents.md)
- [LLM gateway vs unified data API for agents](./guides/llm-gateway-for-agents.md)
- [Pay-per-call vs subscription APIs](./guides/pay-per-call-vs-subscription-apis.md)
- [Using UnifAPI with Claude via MCP](./guides/using-unifapi-with-claude-mcp.md)
- [Using UnifAPI with OpenAI Agents / function calling](./guides/using-unifapi-with-openai-agents.md)

## FAQ

**Is UnifAPI an LLM gateway?**
No. LLM gateways (OpenRouter, Portkey, LiteLLM, Helicone) route **model inference**. UnifAPI routes the **tool calls** your agent uses to read the open web — social, search, scrape, news. The two are complementary: most production agents use both.

**Does UnifAPI need OAuth into my users' accounts?**
No. UnifAPI exposes **public** data only — no per-user auth dance. If you need OAuth into a user's Gmail / Slack / Salesforce, see Composio. See [UnifAPI vs Composio](./comparisons/unifapi-vs-composio.md).

**Can I use UnifAPI with LangChain / LlamaIndex / Vercel AI SDK?**
Yes. UnifAPI ships an OpenAPI spec and a hosted MCP server, so any framework that consumes either works out of the box.

**Is there a monthly subscription?**
No. UnifAPI is pay-per-call. Top up credits when you need them. [See pricing](https://unifapi.com/pricing).

**How is UnifAPI different from a scraping platform like Apify or Bright Data?**
UnifAPI is API-first: every capability is a callable HTTP endpoint. Scraping platforms expose actors or proxy networks you run yourself. See [UnifAPI vs Apify](./comparisons/unifapi-vs-apify.md).

**Where do I get an API key?**
Sign up at [unifapi.com](https://unifapi.com). The Free plan gives you a monthly credit grant, no card required.

---

## Links

- Website: <https://unifapi.com>
- API catalog: <https://unifapi.com/apis>
- Pricing: <https://unifapi.com/pricing>
- MCP server: <https://unifapi.com/mcp>
- OpenAPI spec: <https://unifapi.com/openapi.json>
- Blog: <https://unifapi.com/blog>
- Documentation: this repository's [`docs/`](./docs/) folder

## License

MIT — see [LICENSE](./LICENSE).
