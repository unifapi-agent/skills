---
title: Threads API
nav_order: 6
parent: APIs
---

# Threads API for AI agents — UnifAPI

[UnifAPI's Threads API](https://unifapi.com/apis/threads) gives AI agents access to Threads (Meta) posts, profiles, and replies through one normalized endpoint.

- **Live page:** [unifapi.com/apis/threads](https://unifapi.com/apis/threads)
- **MCP tools:** `threads.*` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `threads/users/get` | Profile by username |
| `threads/users/posts` | Recent posts on a profile |
| `threads/posts/get` | Single post |
| `threads/posts/replies` | Reply tree |
| `threads/search` | Search posts |

## Example

```bash
curl https://api.unifapi.com/v1/threads/users/posts \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"username": "zuck"}'
```

## What it's for

- [Social listening](../use-cases/social-listening.md) — Threads is increasingly a brand surface
- [Trend discovery](../use-cases/trend-discovery.md) — early-stage conversation signal
- [Creator discovery](../use-cases/creator-discovery.md) — cross-platform creator coverage

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
