# TikTok API for AI agents — UnifAPI

[UnifAPI's TikTok API](https://unifapi.com/apis/tiktok) gives AI agents access to TikTok videos, profiles, hashtags, sounds, and the trending feed — through one normalized endpoint.

- **Live page:** [unifapi.com/apis/tiktok](https://unifapi.com/apis/tiktok)
- **MCP tools:** `tiktok.*` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `tiktok/videos/get` | Fetch a video by id / share URL |
| `tiktok/videos/comments` | Comments on a video |
| `tiktok/users/get` | Profile by username |
| `tiktok/users/videos` | Recent videos by a user |
| `tiktok/hashtag` | Posts under a hashtag |
| `tiktok/search` | Search videos / users |
| `tiktok/trending` | Currently trending content |

## Example

```bash
curl https://api.unifapi.com/v1/tiktok/trending \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"geo": "US"}'
```

## What it's for

- [Trend discovery](../use-cases/trend-discovery.md) — TikTok moves first
- [Creator discovery](../use-cases/creator-discovery.md) — discover and score creators
- [Social listening](../use-cases/social-listening.md) — brand mentions
- Cultural-signal research agents

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
