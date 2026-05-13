# Quickstart — Call any API with one key

Get an AI agent calling Twitter, Google SERP, a URL scraper, and the news in under five minutes with [UnifAPI](https://unifapi.com) — a unified public-data API for AI agents.

## 1. Get an API key

Sign up at [unifapi.com](https://unifapi.com). The Free plan includes a monthly credit grant, no credit card.

```bash
export UNIFAPI_KEY="sk_live_..."
```

## 2. Call your first endpoint

Every UnifAPI endpoint follows the same shape: `https://api.unifapi.com/v1/<platform>/<endpoint>`.

```bash
# Fetch a Twitter / X user
curl https://api.unifapi.com/v1/twitter/users/lookup \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"username": "openai"}'
```

Swap the platform — same auth, same error model, same pagination contract:

```bash
# Google SERP
curl https://api.unifapi.com/v1/google-serp/search \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"q": "best ai agent frameworks 2026"}'

# URL → LLM-ready markdown
curl https://api.unifapi.com/v1/scrape/markdown \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"url": "https://news.ycombinator.com"}'
```

## 3. Use it from your agent

UnifAPI ships an OpenAPI spec and a hosted MCP server, so it drops into any agent stack:

- **LangChain / LlamaIndex** — import the OpenAPI tool loader, point it at `https://api.unifapi.com/openapi.json`
- **Vercel AI SDK / OpenAI Agents SDK** — register endpoints as tools via the typed SDK
- **Claude Code / Cursor / Codex** — add the MCP server: see [MCP setup](./mcp.md)

## 4. Track usage

Every call returns a `X-UnifAPI-Credits-Used` header. Live usage and credit balance are visible in your UnifAPI dashboard.

## Next steps

- [Authentication](./authentication.md) — keys, scopes, rotation
- [Pricing & credits](./pricing.md) — how billing works
- [MCP setup](./mcp.md) — use UnifAPI from Claude, Cursor, Codex
- [FAQ](./faq.md)
- [Browse the API catalog](https://unifapi.com/apis)
