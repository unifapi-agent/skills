# UnifAPI Plugin

[![skills.sh](https://skills.sh/b/unifapi-agent/skills)](https://skills.sh/unifapi-agent/skills)

Agent-ready workflows and OAuth MCP access for researching public data with UnifAPI. Install the plugin in your AI client to get reusable skills plus the hosted UnifAPI MCP server for live public social, search, scrape, and news data.

Use this repo when you want an agent to produce a ranked table, creator brief, market scan, competitor monitor, lead list, or evidence-backed research summary without wiring every data API by hand.

## Best Path for Most Users

Install UnifAPI from your AI app's plugin or connector UI. You should not need `npx skills` unless you are setting up a developer machine.

| Platform | Non-developer path |
| --- | --- |
| ChatGPT | Connect the UnifAPI app or custom MCP connector from Settings -> Apps & Connectors, then sign in with UnifAPI. |
| OpenAI Codex | Open Plugins in the Codex app, install UnifAPI from Shared with you, Created by you, or a marketplace, then start a new thread. |
| Claude / Claude Desktop | Open Customize -> Plugins or Connectors, install UnifAPI or add the MCP connector, then sign in. |
| Cursor / VS Code / other MCP clients | Add the hosted MCP URL in the client MCP settings and complete OAuth if the client supports it. |

For step-by-step instructions, see [Non-Developer Usage](./docs/non-developer-usage.md).

## What the Plugin Includes

- `skills/unifapi` - public-data research workflows powered by UnifAPI API and MCP access.
- `skills/kol-pricing` - pricing and ranking workflows for X/Twitter KOL campaigns, adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing).
- `.mcp.json` - hosted MCP server configuration for `https://mcp.unifapi.com`.
- `plugins/unifapi` - Codex marketplace bundle containing `.codex-plugin/`, `.mcp.json`, and the skills.
- `.codex-plugin/`, `.claude-plugin/`, and `.cursor-plugin/` manifests for platform-specific plugin distribution.

## Install as a Plugin

### OpenAI Codex

Codex users should install from the Codex app plugin directory whenever UnifAPI is shared to their workspace. The plugin bundles the skills and MCP server configuration, so users only need to authenticate when prompted.

For local or repo-marketplace testing, this repo includes a Codex marketplace file at `.agents/plugins/marketplace.json`.
It installs the self-contained bundle at `plugins/unifapi`.

### Claude Code

Add this repository as a Claude Code marketplace, then install the plugin:

```text
/plugin marketplace add unifapi-agent/skills
/plugin install unifapi@unifapi-skills
/reload-plugins
```

Claude plugin skills are namespaced by the plugin name, for example `/unifapi:unifapi`.

### Skills CLI Fallback

For clients that still install raw skills instead of plugins:

```bash
npx skills add unifapi-agent/skills
```

Then choose the skills you want to install. This is the fallback path, not the recommended path for non-developer users.

## Available Skills

| Skill | Description | Source |
| --- | --- | --- |
| [`unifapi`](./skills/unifapi) | Public-data research workflows powered by UnifAPI API and MCP access | Authored here |
| [`kol-pricing`](./skills/kol-pricing) | Price and rank X/Twitter KOL campaigns | Adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing) |

## Connect MCP

The hosted UnifAPI MCP server gives agents live tool access to UnifAPI public-data operations.

```text
https://mcp.unifapi.com
```

For most users, setup is simple: add the server URL in your agent client, sign in with UnifAPI when the browser opens, then ask the agent to research public data. OAuth is the recommended path because it connects calls to your UnifAPI workspace and credits without asking you to paste tokens into chat.

If the plugin is installed through Codex or Claude, the MCP server may already be included. If your client asks for a connector URL, use `https://mcp.unifapi.com`.

### ChatGPT

Use the UnifAPI app or a custom MCP connector:

```text
Settings -> Apps & Connectors -> Connect or Create
Connector URL: https://mcp.unifapi.com
```

After connecting, select the UnifAPI connector in a chat when you need live public-data research.

### OpenAI Codex

If the plugin is installed, start a new Codex thread and ask for the UnifAPI outcome you want. If you are configuring MCP manually, register the hosted MCP server and complete OAuth:

```bash
codex mcp add unifapi \
  --url https://mcp.unifapi.com
codex mcp login unifapi
```

### Claude / Claude Desktop

Use Claude Connectors:

```text
Customize -> Connectors -> + -> Add custom connector
URL: https://mcp.unifapi.com
Then click Connect to complete OAuth.
```

### Claude Code

Run this in the project where Claude Code should use UnifAPI:

```bash
claude mcp add \
  --transport http \
  unifapi \
  https://mcp.unifapi.com
```

Then follow the browser sign-in flow when Claude Code asks you to authenticate.

For older local-only Claude Desktop setups, `mcp-remote` can bridge the hosted server through `claude_desktop_config.json`:

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

To get an API key:

1. Go to [unifapi.com](https://unifapi.com/) and sign in.
2. Create an API key from the dashboard, then keep it in your MCP client config or secret manager.

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

For lower-level OAuth fields, troubleshooting, billing behavior, and direct HTTP fallback, see [`skills/unifapi/references/mcp.md`](./skills/unifapi/references/mcp.md), [Non-Developer Usage](./docs/non-developer-usage.md), and the [MCP integration docs](https://docs.unifapi.com/mcp).

## Platform Plugin Files

```text
.codex-plugin/plugin.json      OpenAI Codex plugin manifest
.agents/plugins/marketplace.json  Codex repo marketplace metadata
plugins/unifapi/               Codex installable plugin bundle
.claude-plugin/plugin.json     Claude Code plugin manifest
.claude-plugin/marketplace.json   Claude Code marketplace metadata
.cursor-plugin/plugin.json     Cursor plugin metadata
.mcp.json                      Hosted UnifAPI MCP server config
```

For platform-specific packaging decisions and validation commands, see [Plugin Development](./docs/plugin-development.md).

## Editing Skills

Skills marked **Authored here** can be edited directly in this repo.

Skills marked **Adapted from** are maintained directly in this repo, with attribution to their original source. They are not automatically synced from the source repository.

## Prerequisites

- A UnifAPI account when live MCP tools need workspace credits
- An MCP client that supports Streamable HTTP
- OAuth support in the client for the recommended path

## License

MIT
