# Reddit API for AI agents — UnifAPI

[UnifAPI's Reddit API](https://unifapi.com/apis/reddit) gives AI agents normalized access to subreddits, posts, comments, and search — one bearer key, pay-per-call.

- **Live page:** [unifapi.com/apis/reddit](https://unifapi.com/apis/reddit)
- **MCP tools:** `reddit.*` via the [hosted MCP server](https://unifapi.com/mcp)
- **Pricing:** [pay-per-call](https://unifapi.com/pricing)

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `reddit/subreddit/posts` | Posts in a subreddit by sort |
| `reddit/posts/get` | Single post with metadata |
| `reddit/posts/comments` | Comment tree for a post |
| `reddit/users/get` | User profile + recent activity |
| `reddit/search` | Search subreddits, posts, or comments |

## Example

```bash
curl https://api.unifapi.com/v1/reddit/subreddit/posts \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"subreddit": "LocalLLaMA", "sort": "hot"}'
```

## What it's for

- [Social listening](../use-cases/social-listening.md) — real product feedback
- [Market research](../use-cases/market-research.md) — long-form opinion at scale
- [Trend discovery](../use-cases/trend-discovery.md) — what's bubbling in a niche
- [Competitive intelligence](../use-cases/competitive-intelligence.md) — what users say about your competitors

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
