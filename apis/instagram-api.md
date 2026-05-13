---
title: Instagram API
nav_order: 4
parent: APIs
---

# Instagram API for AI agents — UnifAPI

[UnifAPI's Instagram API](https://unifapi.com/apis/instagram) gives AI agents public access to Instagram profiles, posts, reels, and hashtags through one normalized endpoint.

- **Live page:** [unifapi.com/apis/instagram](https://unifapi.com/apis/instagram)
- **MCP tools:** `instagram.*` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `instagram/users/get` | Profile by username |
| `instagram/users/posts` | Posts on a profile |
| `instagram/users/reels` | Reels on a profile |
| `instagram/posts/get` | Single post by shortcode |
| `instagram/hashtag` | Top + recent posts for a hashtag |
| `instagram/search` | Search users / hashtags |

## Example

```bash
curl https://api.unifapi.com/v1/instagram/users/get \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"username": "natgeo"}'
```

## What it's for

- [Creator discovery](../use-cases/creator-discovery.md) — score creators for brand fit
- [Trend discovery](../use-cases/trend-discovery.md) — hashtag trends
- [Social listening](../use-cases/social-listening.md) — brand mentions

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
