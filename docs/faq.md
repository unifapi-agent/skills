# Frequently asked questions

Common questions about [UnifAPI](https://unifapi.com) — the unified public-data API for AI agents.

## What is UnifAPI?

UnifAPI is a **unified API for AI agents** that bundles public-data sources — Twitter / X, YouTube, TikTok, Instagram, Reddit, Threads, Google SERP, Bing SERP, Google Trends, web scrape, and news — behind one HTTP surface, one API key, and one bill. It exists so agent builders stop writing throwaway glue code for each vendor.

## Is UnifAPI an LLM gateway?

No. **LLM gateways** like OpenRouter, Portkey, LiteLLM, and Helicone route model inference (chat / completion calls) across providers. **UnifAPI routes the tool calls** that an agent makes to read the open web. The two are complementary — most production agents use both.

Read more: [LLM gateway vs unified data API](../guides/llm-gateway-for-agents.md).

## How is UnifAPI different from RapidAPI?

[RapidAPI](./../comparisons/unifapi-vs-rapidapi.md) is a marketplace of thousands of third-party APIs with inconsistent shapes, docs, and per-vendor subscriptions. UnifAPI is a **curated, normalized** catalog of public-data APIs with one shape, one key, one bill, and pay-per-call pricing.

## How is UnifAPI different from Composio?

[Composio](./../comparisons/unifapi-vs-composio.md) connects an agent to a **user's own SaaS accounts** (Gmail, Slack, Salesforce) via OAuth. UnifAPI delivers **public data** from the open web — no OAuth, no per-user connection flow. The two solve different sides of agent integration.

## How is UnifAPI different from Apify, Bright Data, or Firecrawl?

Those are **scraping platforms** — you run actors, manage proxies, or buy datasets. UnifAPI is **API-first**: every capability is a callable HTTP endpoint with a fixed credit cost. See [vs Apify](./../comparisons/unifapi-vs-apify.md), [vs Bright Data](./../comparisons/unifapi-vs-bright-data.md), [vs Firecrawl](./../comparisons/unifapi-vs-firecrawl.md).

## Does UnifAPI need OAuth?

No. UnifAPI exposes **public** data only. There is no per-user auth dance — your agent uses one server-side bearer key for every endpoint.

## What's the pricing model?

Pay-per-call, billed in credits. There is **no monthly subscription**, no minimum, and no hard request cap — your only ceiling is your credit balance. See [pricing](./pricing.md).

## Can I use UnifAPI with LangChain / LlamaIndex / Vercel AI SDK / OpenAI Agents?

Yes. UnifAPI ships an OpenAPI spec and a hosted MCP server, so any framework that consumes either works out of the box. See the [OpenAI Agents guide](../guides/using-unifapi-with-openai-agents.md) and the [Claude MCP guide](../guides/using-unifapi-with-claude-mcp.md).

## Which platforms are supported?

v1 covers 13 platforms across four categories:

- **Social:** Twitter / X, YouTube, TikTok, Instagram, Reddit, Threads
- **Search & SERP:** Google SERP, Bing SERP, Google Trends
- **Web scrape:** URL → markdown, URL → structured data
- **News:** News search, News sources

The full list: [unifapi.com/apis](https://unifapi.com/apis).

## Is there a free tier?

Yes — the Free plan includes a monthly credit grant with no credit card required. [Sign up](https://unifapi.com).

## Where do I report a bug or request an API?

Open an issue on this repository, or [contact us](https://unifapi.com).
