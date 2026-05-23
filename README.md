# UnifAPI Skills

A collection of skills for AI coding agents following the [Agent Skills](https://agentskills.io) format. Available as a plugin for Claude Code, Cursor, and OpenAI Codex. Includes an OAuth-protected MCP server for live public-data tool access.

## Install

```bash
npx skills add unifapi-agent/skills
```

Then select the skills you wish to install.

## Available Skills

| Skill | Description | Source |
| --- | --- | --- |
| [`unifapi`](./skills/unifapi) | UnifAPI public-data API and OAuth MCP access | Authored here |
| [`kol-pricing`](./skills/kol-pricing) | Price and rank X/Twitter KOL campaigns | Adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing) |

## MCP Server

The plugin includes the hosted [UnifAPI MCP server](https://mcp.unifapi.com), giving agents OAuth-based tool access to public social, search, scrape, and news APIs.

OAuth is the default path. Compatible MCP clients discover protected resource metadata from:

```text
https://mcp.unifapi.com/.well-known/oauth-protected-resource
```

API-key bearer headers are documented only as a fallback for clients that cannot complete OAuth.

## Plugins

This repo serves as a plugin for multiple platforms:

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

For clients without OAuth support, see [`skills/unifapi/references/mcp.md`](./skills/unifapi/references/mcp.md).

## License

MIT
