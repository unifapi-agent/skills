---
title: YouTube API
nav_order: 2
parent: APIs
---

# YouTube API for AI agents — UnifAPI

[UnifAPI's YouTube API](https://unifapi.com/apis/youtube) gives AI agents normalized access to YouTube videos, channels, comments, transcripts, and trending lists — one bearer key, pay-per-call.

- **Live page:** [unifapi.com/apis/youtube](https://unifapi.com/apis/youtube)
- **MCP tools:** `youtube.*` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call credits](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `youtube/videos/get` | Fetch a video by id |
| `youtube/videos/transcript` | LLM-ready transcript with timestamps |
| `youtube/videos/comments` | Comments on a video |
| `youtube/channels/get` | Channel profile and stats |
| `youtube/channels/videos` | Recent uploads on a channel |
| `youtube/search` | Search videos / channels / playlists |
| `youtube/trending` | Trending videos by region / category |

## Example

```bash
curl https://api.unifapi.com/v1/youtube/videos/transcript \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"video_id": "dQw4w9WgXcQ"}'
```

## What it's for

- [Trend discovery](../use-cases/trend-discovery.md) — surface hot videos in a niche
- [Creator discovery](../use-cases/creator-discovery.md) — score channels for partnerships
- [Market research](../use-cases/market-research.md) — long-tail product feedback in comments
- Research agents that want **transcripts** as a primary source

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
