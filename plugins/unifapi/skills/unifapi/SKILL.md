---
name: unifapi
description: "Use when working with UnifAPI public-data APIs or MCP: OAuth setup, operation discovery, public social/professional data calls, auth troubleshooting, and MCP OAuth vs API-key fallback. Use before asking for credentials."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills
  source: https://github.com/unifapi-agent/skills
  openclaw:
    links:
      repository: https://github.com/unifapi-agent/skills
      documentation: https://docs.unifapi.com/mcp
---

# UnifAPI

## Default Path: OAuth MCP

Use the hosted MCP server first:

```text
https://mcp.unifapi.com
```

Let the MCP client complete browser OAuth when it asks. Do not ask the user to paste OAuth tokens into chat. Do not ask for an API key unless the client cannot complete OAuth and the task genuinely needs live UnifAPI calls.

Read [references/mcp.md](references/mcp.md) for OAuth protected-resource metadata, client setup, and the API-key fallback.

## References

- [references/mcp.md](references/mcp.md) - OAuth protected-resource metadata, client setup, and API-key fallback.
- [references/public-data.md](references/public-data.md) - when UnifAPI is the right data boundary and where current coverage ends.
- [references/http-api.md](references/http-api.md) - direct HTTP integration guidance.
- [references/twitter-x.md](references/twitter-x.md) - current X/Twitter route map and response shapes.

## Agent Workflow

1. Name the artifact the user wants: ranked table, creator brief, social listening report, market scan, GTM account brief, channel-agent digest, web3 narrative monitor, or another decision output.
2. Use MCP tools such as `list_operations` and `get_operation` to find exact public-data operations and schemas.
3. Call live APIs through `call_api` only for evidence you need.
4. Return an artifact, not a raw dump. Include evidence, assumptions, confidence, operations used, and billing metadata when available.
5. If a live call fails with `401 unauthorized`, restart OAuth or use the documented API-key fallback if OAuth is unavailable.

## Public-Data Boundary

UnifAPI is for public data. The current public API surface is strongest for social profiles and posts, comments, communities, videos, LinkedIn company and people signals, jobs, public ad-library records, and creator or market conversations.

OAuth authorizes the UnifAPI workspace and credit balance. It does not grant access to a user's private Twitter/X, Google, CRM, email, or SaaS accounts. Use a connector platform when the workflow needs private user-authorized SaaS data.

Read [references/public-data.md](references/public-data.md) when choosing whether UnifAPI is the right data path.

For strong user needs that the current API does not fully cover, such as SEO, generic web search, scraping, news, email enrichment, CRM sync, publishing, paid ads, or on-chain web3 data, record the limitation using [../../docs/api-coverage-gaps.md](../../docs/api-coverage-gaps.md) instead of promising unsupported coverage.

## Direct HTTP

Prefer MCP for agent workflows. Use direct HTTP only when the user is building an integration, running scripts, or using a client that cannot call MCP tools.

Read [references/http-api.md](references/http-api.md) before writing direct HTTP calls.
