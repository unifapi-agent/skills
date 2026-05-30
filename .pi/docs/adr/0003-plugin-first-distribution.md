# Plugin-First Distribution

UnifAPI Skills should present itself as a plugin source first and a raw skills repository second. Non-developer users should install UnifAPI through ChatGPT, Codex, Claude, Cursor, or another client UI, then complete OAuth against `https://mcp.unifapi.com`.

The `npx skills add unifapi-agent/skills` path remains supported for developer workflows and raw skill compatibility, but it should not be the main onboarding CTA.

This keeps the repo aligned with current agent platform distribution models: plugin directories, marketplace entries, workspace sharing, and MCP connector OAuth.
