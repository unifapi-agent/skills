# Non-Developer Usage

Use this guide when you want UnifAPI in ChatGPT, Codex, Claude, Cursor, or another AI client without running developer setup commands.

## What to Install

Prefer this order:

1. Install the UnifAPI plugin from your AI app's plugin directory or a workspace-shared listing.
2. If there is no plugin listing, add the UnifAPI MCP connector.
3. Use the `npx skills` command only when a developer or support teammate is setting up raw skills for you.

The plugin gives the agent workflow guidance. The MCP connector gives the agent live UnifAPI tools.

## MCP Connector

Use this URL anywhere the AI client asks for an MCP server or connector URL:

```text
https://mcp.unifapi.com
```

Choose OAuth or "Sign in with UnifAPI" when the client asks how to authenticate. OAuth is the default path. It connects the MCP session to your UnifAPI workspace and credits without asking you to paste tokens into chat.

UnifAPI OAuth authorizes UnifAPI usage only. It does not grant access to your private Twitter/X, Google, Slack, CRM, email, or other SaaS accounts.

## ChatGPT

Use the UnifAPI app or connector when it is shared to your workspace or listed in Apps & Connectors.

1. Open ChatGPT settings.
2. Go to Apps & Connectors.
3. Choose UnifAPI, then click Connect.
4. Sign in with UnifAPI when the browser opens.
5. In a new chat, add the UnifAPI connector when the task needs live public data.

If UnifAPI is not listed yet, ask your workspace admin or developer to create a custom MCP connector with:

```text
https://mcp.unifapi.com
```

## OpenAI Codex

Use the Codex app plugin directory.

1. Open Plugins in the Codex app.
2. Find UnifAPI under Shared with you, Created by you, or your workspace marketplace.
3. Click Add to Codex.
4. Sign in with UnifAPI if Codex asks you to connect the MCP server.
5. Start a new Codex thread and describe the outcome you want.

Good prompts:

```text
Use UnifAPI to build a public-data market scan for this product category.
```

```text
Use UnifAPI to rank these X handles for a creator campaign and explain the pricing logic.
```

## Claude / Claude Desktop

Use Plugins when UnifAPI is available as a plugin. Use Connectors when you only need the MCP server.

Plugin path:

1. Open Claude or Claude Desktop.
2. Go to Customize.
3. Open Plugins and browse or search for UnifAPI.
4. Click Install.
5. Start a new conversation and ask for the public-data workflow you need.

Connector path:

1. Open Customize.
2. Open Connectors.
3. Add a custom connector.
4. Use `https://mcp.unifapi.com` as the connector URL.
5. Click Connect and sign in with UnifAPI.

## Claude Code

Claude Code is a terminal product, so this path is usually for technical users. If you are comfortable with Claude Code commands, add the marketplace and install the plugin:

```text
/plugin marketplace add unifapi-agent/skills
/plugin install unifapi@unifapi-skills
/reload-plugins
```

After install, UnifAPI skills are available under the plugin namespace, for example `/unifapi:unifapi`.

## Cursor, VS Code, and Other MCP Clients

Open the client's MCP settings and add:

```json
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

Some clients use `servers` instead of `mcpServers`. Keep the same server URL and choose HTTP or Streamable HTTP when asked for a transport.

## API-Key Fallback

Use an API key only if your client cannot complete OAuth.

1. Go to [unifapi.com](https://unifapi.com/) and sign in.
2. Create an API key from the dashboard.
3. Store it in your client config or secret manager.

Preferred header:

```text
Authorization: Bearer YOUR_UNIFAPI_KEY
```

Do not paste secrets into an AI chat. Keep API keys in the client's connector settings, local config, or a secret manager.

## Troubleshooting

If the connector cannot load, check that the URL is exactly `https://mcp.unifapi.com`.

If you see `401 unauthorized`, reconnect the UnifAPI connector or restart the OAuth sign-in flow.

If the client asks for tools or approvals, allow read-only public-data tools for research tasks. Write or account-changing tools are not part of the normal UnifAPI public-data workflow.

If a request fails because of credits or billing, sign in to UnifAPI and check the workspace credit balance.
