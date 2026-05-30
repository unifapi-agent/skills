# Plugin Development

This repo is the plugin source for UnifAPI agent workflows. It keeps raw skills and provider-native skill trees installable, but plugin distribution is the primary path for non-developer users.

The root `skills/` tree is the source of truth. The Codex marketplace subtree at `plugins/unifapi/` and the provider-native skill trees are generated bundles, similar in spirit to plugin projects that keep canonical skills in one place and emit provider-specific install trees during build.

## Platform Rules We Follow

### OpenAI Codex

Codex plugins bundle reusable skills, app integrations, and MCP servers. The plugin root must include `.codex-plugin/plugin.json`; skills stay in `skills/`, and MCP server definitions can be referenced from `.mcp.json`.

Codex repo marketplaces use `.agents/plugins/marketplace.json`. Marketplace entries should include:

- `name`
- `source`
- `policy.installation`
- `policy.authentication`
- `category`

This repo keeps a single Codex marketplace entry for `plugins/unifapi`. Codex local marketplaces expect entries to point at a plugin directory, so the bundle mirrors the root `.codex-plugin`, `.mcp.json`, `skills/`, and linked `docs/` files:

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

### Provider-Native Skill Trees

Some agent clients discover skills from provider-specific directories rather than plugin manifests. To cover those paths, this repo generates copies of the canonical root `skills/` tree into the common harness locations:

| Harness | Generated skills directory |
| --- | --- |
| Codex repo/user installs | `.agents/skills/` |
| Claude Code | `.claude/skills/` |
| Cursor | `.cursor/skills/` |
| Gemini CLI | `.gemini/skills/` |
| GitHub Copilot / VS Code agent skills | `.github/skills/` |
| Kiro | `.kiro/skills/` |
| OpenCode | `.opencode/skills/` |
| Pi | `.pi/skills/` |
| Qoder | `.qoder/skills/` |
| Trae | `.trae/skills/` and `.trae-cn/skills/` |
| Rovo Dev | `.rovodev/skills/` |

These directories are generated distribution output. They intentionally duplicate the skill package files so repository snapshots and marketplace caches do not depend on symlinks. The generator also copies `docs/` beside each provider `skills/` directory because several skill references use relative links back to repo documentation.

## Repository Layout

```text
.codex-plugin/plugin.json
.agents/plugins/marketplace.json
plugins/unifapi/                 # generated Codex marketplace bundle
.agents/skills/                  # generated Codex repo/user skill tree
.agents/docs/                    # generated docs for provider-relative skill links
.claude/skills/                  # generated Claude Code skill tree
.claude/docs/                    # generated docs for provider-relative skill links
.cursor/skills/                  # generated Cursor skill tree
.cursor/docs/                    # generated docs for provider-relative skill links
.gemini/skills/                  # generated Gemini CLI skill tree
.gemini/docs/                    # generated docs for provider-relative skill links
.github/skills/                  # generated GitHub Copilot skill tree
.github/docs/                    # generated docs for provider-relative skill links
.kiro/skills/                    # generated Kiro skill tree
.kiro/docs/                      # generated docs for provider-relative skill links
.opencode/skills/                # generated OpenCode skill tree
.opencode/docs/                  # generated docs for provider-relative skill links
.pi/skills/                      # generated Pi skill tree
.pi/docs/                        # generated docs for provider-relative skill links
.qoder/skills/                   # generated Qoder skill tree
.qoder/docs/                     # generated docs for provider-relative skill links
.trae/skills/                    # generated Trae skill tree
.trae/docs/                      # generated docs for provider-relative skill links
.trae-cn/skills/                 # generated Trae China skill tree
.trae-cn/docs/                   # generated docs for provider-relative skill links
.rovodev/skills/                 # generated Rovo Dev skill tree
.rovodev/docs/                   # generated docs for provider-relative skill links
.claude-plugin/plugin.json
.claude-plugin/marketplace.json
.cursor-plugin/plugin.json
.cursor-plugin/marketplace.json
.mcp.json
mcp.json
skills/
docs/non-developer-usage.md
scripts/build
```

When changing `.codex-plugin/`, `.mcp.json`, `skills/`, or docs that bundled skills link to, regenerate the plugin and provider bundles before validation:

```bash
node scripts/build
```

Do not edit files under `plugins/unifapi/skills`, `plugins/unifapi/docs`, `plugins/unifapi/.codex-plugin`, or provider-native `*/skills` output by hand unless you are debugging the generated output. Edit the root source files and sync.

## Validation

Run these checks after plugin metadata changes:

```bash
node scripts/build --check
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
