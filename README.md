# UnifAPI Plugin

[![skills.sh](https://skills.sh/b/unifapi-agent/skills)](https://skills.sh/unifapi-agent/skills)

Agent-ready workflows and OAuth MCP access for researching public data with UnifAPI. Install the plugin in your AI client to get reusable skills, agent-native search/fetch/code workflows, and the hosted UnifAPI MCP server for live public social and professional-platform data.

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
- GTM workflow skills - account research, signal monitoring, LinkedIn lead discovery, buyer mapping, enrichment, and competitor intelligence.
- Growth workflow skills - social listening, Reddit opportunities, launch monitoring, content briefs, demand scouting, and channel digests.
- Creator workflow skills - Instagram, YouTube, multi-platform creator shortlists, comment mining, and KOL campaign analysis.
- Web3 workflow skills - crypto narrative monitoring, token-community sentiment, launch watch, and web3 KOL watchlists using public social signals.
- Agent-native web/SEO/table skills - high-demand web research, HN monitoring, technical SEO, page diffs, news/PR, marketplace, ecommerce, and table enrichment workflows that can use the host agent's search, fetch, shell, and code execution.
- API-backfill skills - high-demand CRM/export, contact discovery, scheduling, publishing, ads, on-chain, community, web intent, and private-workspace workflows with explicit product/API backfill requirements.
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

The plugin now ships a broad hybrid Workflow Portfolio: Clay-style public-data workflows for find/enrich/score/signals, with Okara-style channel-agent outputs such as opportunity briefs, monitors, drafts, and action plans.

| Group | Skills |
| --- | --- |
| Platform | [`unifapi`](./skills/unifapi) |
| GTM | [`account-research-brief`](./skills/account-research-brief), [`account-signal-monitor`](./skills/account-signal-monitor), [`buyer-committee-mapper`](./skills/buyer-committee-mapper), [`company-domain-enrichment`](./skills/company-domain-enrichment), [`competitor-gtm-monitor`](./skills/competitor-gtm-monitor), [`competitor-talent-watch`](./skills/competitor-talent-watch), [`gtm-table-enrichment`](./skills/gtm-table-enrichment), [`linkedin-ad-intel`](./skills/linkedin-ad-intel), [`linkedin-founder-lead-list`](./skills/linkedin-founder-lead-list), [`linkedin-hiring-signal-finder`](./skills/linkedin-hiring-signal-finder), [`linkedin-people-enrichment`](./skills/linkedin-people-enrichment), [`market-map-from-social`](./skills/market-map-from-social), [`outbound-personalization-brief`](./skills/outbound-personalization-brief), [`partner-prospect-finder`](./skills/partner-prospect-finder) |
| Growth | [`campaign-reaction-analyst`](./skills/campaign-reaction-analyst), [`category-demand-scout`](./skills/category-demand-scout), [`cross-channel-competitor-monitor`](./skills/cross-channel-competitor-monitor), [`cross-channel-content-brief`](./skills/cross-channel-content-brief), [`hacker-news-opportunity-monitor`](./skills/hacker-news-opportunity-monitor), [`instagram-location-signal-monitor`](./skills/instagram-location-signal-monitor), [`linkedin-company-content-monitor`](./skills/linkedin-company-content-monitor), [`reddit-community-monitor`](./skills/reddit-community-monitor), [`reddit-opportunity-finder`](./skills/reddit-opportunity-finder), [`reddit-voice-of-customer`](./skills/reddit-voice-of-customer), [`social-launch-monitor`](./skills/social-launch-monitor), [`threads-opportunity-monitor`](./skills/threads-opportunity-monitor), [`tiktok-trend-radar`](./skills/tiktok-trend-radar), [`x-community-monitor`](./skills/x-community-monitor), [`x-list-monitor`](./skills/x-list-monitor), [`x-social-listening`](./skills/x-social-listening), [`youtube-topic-monitor`](./skills/youtube-topic-monitor) |
| Agent-Native Web & SEO | [`app-store-marketplace-monitor`](./skills/app-store-marketplace-monitor), [`ecommerce-product-monitor`](./skills/ecommerce-product-monitor), [`news-pr-monitor`](./skills/news-pr-monitor), [`seo-aeo-monitor`](./skills/seo-aeo-monitor), [`technical-seo-repo-auditor`](./skills/technical-seo-repo-auditor), [`web-page-change-monitor`](./skills/web-page-change-monitor), [`web-research-agent`](./skills/web-research-agent) |
| Creator Marketing | [`creator-comment-miner`](./skills/creator-comment-miner), [`instagram-creator-discovery`](./skills/instagram-creator-discovery), [`kol-pricing`](./skills/kol-pricing), [`multi-platform-creator-shortlist`](./skills/multi-platform-creator-shortlist), [`youtube-creator-research`](./skills/youtube-creator-research) |
| Web3 | [`crypto-narrative-monitor`](./skills/crypto-narrative-monitor), [`token-community-sentiment-pulse`](./skills/token-community-sentiment-pulse), [`web3-kol-watchlist`](./skills/web3-kol-watchlist), [`web3-launch-watch`](./skills/web3-launch-watch) |
| API Backfill | [`autonomous-channel-agent`](./skills/autonomous-channel-agent), [`crm-export-sequence`](./skills/crm-export-sequence), [`discord-telegram-community-monitor`](./skills/discord-telegram-community-monitor), [`email-contact-finder`](./skills/email-contact-finder), [`paid-ads-operator`](./skills/paid-ads-operator), [`private-workspace-signal-connector`](./skills/private-workspace-signal-connector), [`scheduled-signal-alerts`](./skills/scheduled-signal-alerts), [`web-intent-visitor-tracking`](./skills/web-intent-visitor-tracking), [`web3-onchain-monitor`](./skills/web3-onchain-monitor) |

`kol-pricing` is adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing). The other workflow skills are authored here.

Agent-native skills exist because target runtimes already provide search, fetch, shell, and code execution. API-backfill skills exist because the user demand is strong even when some product APIs are not ready yet. Each backfill skill exposes the product/API work needed for full hosted execution.

For strong user requests that the current API does not yet cover, see [API Coverage Gaps](./docs/api-coverage-gaps.md).
For the demand and quality review behind this portfolio, see [Skill Portfolio Review](./docs/skill-portfolio-review.md).

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
- analyze Twitter/X KOLs, creator profiles, public posts, comments, communities, and trends
- build GTM account briefs, LinkedIn lead lists, buyer maps, competitor monitors, and hiring-signal reports
- find Reddit opportunities, mine voice-of-customer language, monitor launches, and draft channel-specific content briefs
- create creator shortlists across X, Instagram, TikTok, YouTube, LinkedIn, Threads, and Reddit
- monitor web3 narratives, token communities, launch reactions, and public KOL watchlists using social signals
- use the host agent's search, fetch, shell, and code execution for web research, HN opportunities, page checks, technical SEO, marketplace/product checks, and GTM table enrichment
- define API-backfill workflows for CRM/export, scheduling, publishing, ads, on-chain, private connectors, and contact data while listing the API work needed for full hosted execution
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
