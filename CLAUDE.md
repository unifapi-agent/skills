# UnifAPI Skills

Distribution repo for UnifAPI agent skills.

## Repository Shape

- `skills/unifapi/` - authored here. Platform skill for UnifAPI public-data APIs and OAuth MCP.
- `skills/kol-pricing/` - adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing). Maintained here as a skill package, not as an app mirror.

## Auth Defaults

Use MCP OAuth by default for `https://mcp.unifapi.com`. Do not ask users to paste OAuth tokens or API keys unless the client cannot complete OAuth and the user explicitly needs the API-key fallback.

## Editing Skills

Keep `SKILL.md` concise and put detailed operational guidance in `references/`. Scripts should be deterministic and runnable without requiring a separate LLM provider key.

When updating `kol-pricing`, preserve attribution to the original repository and keep the deterministic pricing behavior aligned with the adapted framework.
