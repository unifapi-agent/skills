# Using UnifAPI with Claude via MCP

Connect [UnifAPI](https://unifapi.com)'s public-data catalog — Twitter, YouTube, TikTok, Reddit, Google SERP, scrape, news — to Claude (Claude Code, Claude Desktop, or any MCP-compatible client) in under a minute.

## Prerequisites

- A UnifAPI API key — [sign up](https://unifapi.com) for free
- Claude Code, Claude Desktop, or another MCP client

## 1. Add the MCP server

### Claude Code (`~/.claude/mcp.json`)

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

Or use the CLI:

```bash
claude mcp add unifapi --transport sse \
  --url https://mcp.unifapi.com \
  --header "Authorization: Bearer $UNIFAPI_KEY"
```

### Claude Desktop

Settings → Developer → MCP Servers → Add — paste the JSON block above.

## 2. Restart the client

Claude reloads tools on startup. After restart, every UnifAPI endpoint appears as a tool — `twitter.search`, `youtube.videos.transcript`, `google_serp.search`, `scrape.markdown`, and so on.

## 3. Use it

Just ask:

> "Search Google for `claude opus agent benchmarks`, fetch the top 3 results as markdown, and summarize each."

Claude will:

1. Call `google_serp.search`
2. Call `scrape.markdown` three times
3. Synthesize

No glue code in your prompt, no tool definitions to write.

## What tools are exposed?

Every endpoint in the [UnifAPI catalog](https://unifapi.com/apis), grouped by platform:

- `twitter.*`, `youtube.*`, `tiktok.*`, `instagram.*`, `reddit.*`, `threads.*`
- `google_serp.*`, `bing_serp.*`, `google_trends.*`
- `scrape.markdown`, `scrape.structured`
- `news.search`, `news.sources.*`

See [docs/mcp.md](../docs/mcp.md) for the full list.

## Troubleshooting

- **Tools don't appear** — confirm the server is loaded (`/mcp` in Claude Code; Settings → MCP in Claude Desktop). Most issues are a missing `Authorization` header.
- **401 errors** — check `UNIFAPI_KEY` is exported and starts with `sk_live_` or `sk_test_`.
- **Rate-limit errors** — see [docs/authentication.md](../docs/authentication.md) for limits.

[**→ More on MCP**](https://unifapi.com/mcp) · Related: [Using UnifAPI with OpenAI Agents](./using-unifapi-with-openai-agents.md)
