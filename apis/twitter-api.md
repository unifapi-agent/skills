# Twitter / X API for AI agents — UnifAPI

[UnifAPI's Twitter / X API](https://unifapi.com/apis/twitter) gives an AI agent server-side access to public Twitter data — tweets, users, timelines, replies, search — through one normalized HTTP endpoint, billed per call.

- **Live page:** [unifapi.com/apis/twitter](https://unifapi.com/apis/twitter)
- **Auth:** one bearer key, no per-user OAuth
- **Pricing:** [pay-per-call credits](https://unifapi.com/pricing)
- **MCP tools:** exposed via the [hosted MCP server](https://unifapi.com/mcp) as `twitter.*`

## Endpoints (v1)

| Endpoint | Description |
| --- | --- |
| `twitter/users/lookup` | Get a user's profile by username or id |
| `twitter/users/tweets` | Fetch a user's recent tweets |
| `twitter/tweets/get` | Fetch a single tweet by id |
| `twitter/tweets/replies` | Replies to a tweet |
| `twitter/search` | Search tweets by query / filters |
| `twitter/users/followers` | A user's followers (where public) |
| `twitter/users/following` | Who a user follows |

## Example

```bash
curl https://api.unifapi.com/v1/twitter/search \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"q": "ai agents", "since": "24h", "lang": "en"}'
```

## What it's for

- [Social listening](../use-cases/social-listening.md) — brand mentions, sentiment
- [Trend discovery](../use-cases/trend-discovery.md) — what people are talking about
- [Creator discovery](../use-cases/creator-discovery.md) — find and score creators
- [Competitive intelligence](../use-cases/competitive-intelligence.md) — track competitor announcements
- [Lead enrichment](../use-cases/lead-enrichment.md) — public social footprint of a company

## Why UnifAPI's Twitter API

The official paid API tier is expensive and rate-locked. Most agent builders end up wiring a third-party scraping vendor — at which point you're juggling N vendors. UnifAPI gives you one bearer key, one normalized shape, [MCP-ready](https://unifapi.com/mcp) tool definitions, and pay-per-call billing.

Alternatives compared: [UnifAPI vs RapidAPI](../comparisons/unifapi-vs-rapidapi.md) · [vs Apify](../comparisons/unifapi-vs-apify.md)

[**→ Start free**](https://unifapi.com) · [Browse all APIs](https://unifapi.com/apis)
