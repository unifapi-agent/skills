# UnifAPI Skills

[![skills.sh](https://skills.sh/b/unifapi-agent/skills)](https://skills.sh/unifapi-agent/skills)

Agent-ready workflows for researching public data with UnifAPI. Install the skills to give your agent reusable task prompts, then connect the hosted MCP server when the task needs live public social, search, scrape, or news data.

Use this repo when you want an agent to produce a ranked table, creator brief, market scan, competitor monitor, lead list, or evidence-backed research summary without wiring every data API by hand.

## Install Skills

```bash
npx skills add unifapi-agent/skills
```

Then choose the skills you want to install.

## Available Skills

| Skill | Description | Source |
| --- | --- | --- |
| [`unifapi`](./skills/unifapi) | Public-data research workflows powered by UnifAPI API and MCP access | Authored here |
| [`kol-pricing`](./skills/kol-pricing) | Price and rank X/Twitter KOL campaigns | Adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing) |

## Connect MCP

The hosted UnifAPI MCP server gives agents live tool access to UnifAPI public-data operations:

```text
https://mcp.unifapi.com
```

For most users, setup is simple: add the server URL in your agent client, sign in with UnifAPI when the browser opens, then ask the agent to research public data. OAuth is the recommended path because it connects calls to your UnifAPI workspace and credits without asking you to paste tokens into chat.

### Claude Code

Run this in the project where Claude Code should use UnifAPI:

```bash
claude mcp add \
  --transport http \
  unifapi \
  https://mcp.unifapi.com
```

Then follow the browser sign-in flow when Claude Code asks you to authenticate.

### OpenAI Codex

Register the hosted MCP server:

```bash
codex mcp add unifapi \
  --url https://mcp.unifapi.com
```

Codex starts OAuth after the server is added.

### Claude Desktop

Use Claude Desktop Connectors:

```text
Customize -> Connectors -> + -> Add custom connector
URL: https://mcp.unifapi.com
Then click Connect to complete OAuth.
```

For older local-only setups, `mcp-remote` can bridge the hosted server through `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "unifapi": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.unifapi.com"]
    }
  }
}
```

### Cursor

Add this in Cursor MCP settings or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

### VS Code

Add this to `.vscode/mcp.json` or your user MCP configuration:

```json
{
  "servers": {
    "unifapi": {
      "type": "http",
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

### Other MCP Clients

Use Streamable HTTP with the canonical server URL:

```json
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

## What Agents Can Do

With the `unifapi` skill and MCP connected, an agent can:

- search public-data operations and choose the right one for the job
- analyze Twitter/X KOLs, creator profiles, public posts, comments, and trends
- build influencer shortlists, pricing ranges, competitor snapshots, or market briefs
- call live public-data APIs only when evidence is needed
- return decision-ready artifacts instead of raw API dumps

MCP is for live data access. The skills are for workflow guidance: what to ask, which evidence to gather, and how to shape the result.

## API-Key Fallback

Use an API key only when your MCP client cannot complete OAuth or explicitly asks for static headers.

```json
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com",
      "headers": {
        "Authorization": "Bearer YOUR_UNIFAPI_KEY"
      }
    }
  }
}
```

UnifAPI also accepts `X-API-Key` and `X-UnifAPI-Key` headers for clients that cannot set `Authorization`, but `Authorization: Bearer ...` is preferred.

For lower-level OAuth fields, troubleshooting, billing behavior, and direct HTTP fallback, see [`skills/unifapi/references/mcp.md`](./skills/unifapi/references/mcp.md) and the [MCP integration docs](https://docs.unifapi.com/mcp).

## Platform Plugins

This repo can be installed as a plugin in multiple agent platforms:

- **Claude Code** - `.claude-plugin/`
- **Cursor** - `.cursor-plugin/`
- **OpenAI Codex** - `.codex-plugin/`

## Editing Skills

Skills marked **Authored here** can be edited directly in this repo.

Skills marked **Adapted from** are maintained directly in this repo, with attribution to their original source. They are not automatically synced from the source repository.

## Prerequisites

- A UnifAPI account when live MCP tools need workspace credits
- An MCP client that supports Streamable HTTP
- OAuth support in the client for the recommended path

## License

MIT
