# Plugin Development

This repo is the plugin source for UnifAPI agent workflows. It keeps raw skills installable, but plugin distribution is the primary path for non-developer users.

## Platform Rules We Follow

### OpenAI Codex

Codex plugins bundle reusable skills, app integrations, and MCP servers. The plugin root must include `.codex-plugin/plugin.json`; skills stay in `skills/`, and MCP server definitions can be referenced from `.mcp.json`.

Codex repo marketplaces use `.agents/plugins/marketplace.json`. Marketplace entries should include:

- `name`
- `source`
- `policy.installation`
- `policy.authentication`
- `category`

This repo keeps a single Codex marketplace entry for `plugins/unifapi`. Codex local marketplaces expect entries to point at a plugin directory, so the bundle mirrors the root `.codex-plugin`, `.mcp.json`, and `skills/` files:

```json
{
  "name": "unifapi",
  "source": {
    "source": "local",
    "path": "./plugins/unifapi"
  },
  "policy": {
    "installation": "AVAILABLE",
    "authentication": "ON_INSTALL"
  },
  "category": "Productivity"
}
```

Public OpenAI distribution is currently tied to the ChatGPT Apps submission flow: build and test the MCP app, submit it for review, and an approved published app can also create the Codex plugin distribution. Workspace-private usage should use developer mode, workspace sharing, or a marketplace source instead of pretending the plugin is publicly listed.

### ChatGPT

ChatGPT distribution should be treated as an Apps SDK / MCP connector path, not as a raw skill install path. Non-developer users should click Connect in Apps & Connectors and complete OAuth. The connector URL is:

```text
https://mcp.unifapi.com
```

The app or connector metadata should describe the user-facing outcomes: public-data research, creator/KOL analysis, market scans, competitor monitoring, and evidence-backed reports.

### Claude Code

Claude Code plugins use `.claude-plugin/plugin.json`. Plugin skills live at `skills/<name>/SKILL.md` in the plugin root and are namespaced by the plugin name after install. MCP server definitions live at `.mcp.json`.

Claude marketplace distribution uses `.claude-plugin/marketplace.json`. Users can add this repo as a marketplace:

```text
/plugin marketplace add unifapi-agent/skills
/plugin install unifapi@unifapi-skills
```

The Claude community marketplace has a separate review flow. Run `claude plugin validate .` before submitting.

### Cursor and Other MCP Clients

Cursor does not replace the plugin manifests above. Keep `.cursor-plugin/` metadata for clients that can read it, and keep `.mcp.json` and `mcp.json` as the portable hosted-MCP definitions.

## Repository Layout

```text
.codex-plugin/plugin.json
.agents/plugins/marketplace.json
plugins/unifapi/
.claude-plugin/plugin.json
.claude-plugin/marketplace.json
.cursor-plugin/plugin.json
.cursor-plugin/marketplace.json
.mcp.json
mcp.json
skills/
docs/non-developer-usage.md
```

When changing `.codex-plugin/`, `.mcp.json`, `skills/`, or docs that bundled skills link to, keep `plugins/unifapi/` in sync before validating Codex marketplace installation.

## Validation

Run these checks after plugin metadata changes:

```bash
python3 /path/to/plugin-creator/scripts/validate_plugin.py .
```

If Claude Code is installed:

```bash
claude plugin validate .
```

For raw skills compatibility:

```bash
DISABLE_TELEMETRY=1 npx skills add unifapi-agent/skills --list
```

## Versioning

The current plugin manifests use `version: "1.0.0"`. If a platform caches by explicit version, bump this field when users must receive an update. For rapid marketplace iteration, verify whether the target platform can use commit SHA versioning before removing explicit versions.

## Official References

- OpenAI Codex plugins: https://developers.openai.com/codex/plugins
- OpenAI Codex plugin build guide: https://developers.openai.com/codex/plugins/build
- OpenAI Codex MCP: https://developers.openai.com/codex/mcp
- OpenAI ChatGPT connector setup: https://developers.openai.com/apps-sdk/deploy/connect-chatgpt
- OpenAI app submission: https://developers.openai.com/apps-sdk/deploy/submission
- Claude Code plugins: https://code.claude.com/docs/en/plugins
- Claude Code plugin marketplaces: https://code.claude.com/docs/en/plugin-marketplaces
- Claude Code plugin discovery and install: https://code.claude.com/docs/en/discover-plugins
