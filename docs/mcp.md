# MCP server — plug UnifAPI into Claude, Cursor, Codex

[UnifAPI](https://unifapi.com) ships a hosted [Model Context Protocol](https://modelcontextprotocol.io) server. Add one block to your client config and your assistant can search Google, fetch tweets, scrape a URL, or pull TikTok trending data — without you writing a tool wrapper.

Live setup page: [unifapi.com/mcp](https://unifapi.com/mcp).

## Why MCP for a unified data API?

MCP standardizes how an LLM client discovers and calls external tools. UnifAPI exposes its whole catalog through one MCP endpoint, which means:

- Your assistant sees every UnifAPI capability as a structured tool
- No per-endpoint glue code in your client
- Auth is a single bearer header
- Same agent code works against Claude, Cursor, Codex, Windsurf, or any MCP-compatible client

## Setup

### Claude Code

Add to `~/.claude/mcp.json` (or run `claude mcp add`):

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

### Cursor

Settings → MCP → "Add new MCP server" → paste the JSON block above.

### Codex / Windsurf / Continue

Use the same URL and bearer header. Full per-client steps: [unifapi.com/mcp](https://unifapi.com/mcp).

## What tools show up?

Every endpoint in the [UnifAPI catalog](https://unifapi.com/apis) is exposed as an MCP tool, grouped by platform:

- `twitter.*` — Twitter / X
- `youtube.*` — YouTube
- `tiktok.*` — TikTok
- `reddit.*` — Reddit
- `google_serp.*`, `bing_serp.*`, `google_trends.*` — Search
- `scrape.*` — URL → markdown / structured
- `news.*` — News search & sources

## Related

- [Using UnifAPI with Claude via MCP](../guides/using-unifapi-with-claude-mcp.md)
- [Using UnifAPI with OpenAI Agents](../guides/using-unifapi-with-openai-agents.md)
- [Quickstart](./quickstart.md)
