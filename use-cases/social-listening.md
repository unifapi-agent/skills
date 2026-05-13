# Social listening & brand monitoring with UnifAPI

Build an AI agent that tracks brand mentions, sentiment, and emerging conversation across Twitter / X, Reddit, TikTok, and news — through a single API. Live use-case page: [unifapi.com/solutions/social-listening](https://unifapi.com/solutions/social-listening).

## The problem

A traditional social-listening stack stitches together a Twitter scraper, a Reddit client, a TikTok provider, and a news API — each with its own shape, auth, rate limits, and billing. The agent code becomes 60% glue and 40% product.

## The UnifAPI shape

One key, four calls, one consistent JSON shape:

```bash
# Mentions on Twitter / X
curl https://api.unifapi.com/v1/twitter/search \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"q": "\"Acme Corp\"", "since": "24h"}'

# Mentions on Reddit
curl https://api.unifapi.com/v1/reddit/search \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"q": "Acme Corp", "subreddit": "all", "since": "24h"}'

# Discussion on TikTok
curl https://api.unifapi.com/v1/tiktok/search \
  -d '{"q": "Acme Corp"}' \
  -H "Authorization: Bearer $UNIFAPI_KEY"

# Press coverage
curl https://api.unifapi.com/v1/news/search \
  -d '{"q": "Acme Corp", "since": "24h"}' \
  -H "Authorization: Bearer $UNIFAPI_KEY"
```

Pipe the four streams into the agent's reasoning loop. Same auth, same error model, same pagination.

## APIs used

- [Twitter / X API](https://unifapi.com/apis/twitter) — search, replies, user timelines
- [Reddit API](https://unifapi.com/apis/reddit) — subreddit & global search, comments
- [TikTok API](https://unifapi.com/apis/tiktok) — video search, hashtag, profile
- [News Search API](https://unifapi.com/apis/news-search) — real-time press coverage

## Typical agent loop

1. **Discover** — scheduled UnifAPI calls every N minutes for the brand keywords
2. **Classify** — pass results through an LLM (model routed by your [LLM gateway](../guides/llm-gateway-for-agents.md) of choice) for sentiment + topic
3. **Enrich** — for high-priority hits, scrape the linked URL via [URL → markdown](https://unifapi.com/apis/url-to-markdown)
4. **Notify** — post to Slack, file a ticket, or escalate

## Why pay-per-call wins here

Social listening volume is bursty — a launch week is 100× a normal day. UnifAPI's [pay-per-call pricing](https://unifapi.com/pricing) lets the bill match the load. Subscription-based vendors force you to size for peak and overpay in the troughs.

## Related

- [Trend discovery](./trend-discovery.md) — broader version of this loop, without the brand filter
- [Competitive intelligence](./competitive-intelligence.md) — same plumbing pointed at a competitor
- [UnifAPI vs RapidAPI](../comparisons/unifapi-vs-rapidapi.md)

[**→ Get started free**](https://unifapi.com) · [Browse APIs](https://unifapi.com/apis)
