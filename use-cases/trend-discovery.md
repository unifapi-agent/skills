# Trend & content discovery with UnifAPI

Build an AI agent that surfaces what's trending across TikTok, YouTube, Reddit, and Google — through one unified API. Live page: [unifapi.com/solutions/trend-discovery](https://unifapi.com/solutions/trend-discovery).

## The shape

```bash
# What's trending on TikTok
curl https://api.unifapi.com/v1/tiktok/trending \
  -H "Authorization: Bearer $UNIFAPI_KEY"

# Rising searches on Google Trends
curl https://api.unifapi.com/v1/google-trends/rising \
  -d '{"geo": "US"}' \
  -H "Authorization: Bearer $UNIFAPI_KEY"

# Hot YouTube videos in a category
curl https://api.unifapi.com/v1/youtube/trending \
  -d '{"category": "Entertainment", "geo": "US"}' \
  -H "Authorization: Bearer $UNIFAPI_KEY"

# Hot Reddit posts on a topic
curl https://api.unifapi.com/v1/reddit/subreddit/posts \
  -d '{"subreddit": "ArtificialInteligence", "sort": "hot"}' \
  -H "Authorization: Bearer $UNIFAPI_KEY"
```

## APIs used

- [TikTok API](https://unifapi.com/apis/tiktok)
- [YouTube API](https://unifapi.com/apis/youtube)
- [Reddit API](https://unifapi.com/apis/reddit)
- [Google Trends API](https://unifapi.com/apis/google-trends)

## Who builds this

- Content teams looking for video / post ideas
- Investor-side analysts watching consumer attention shifts
- Creator-economy tools mining what's working *right now*

## Why one API matters

Trends move in hours, not weeks. A trend-discovery agent that has to authenticate to four vendors, normalize four schemas, and reconcile four billing dashboards is too slow to ship. UnifAPI collapses that to one HTTP surface so the agent stays focused on signal extraction.

[**→ See the catalog**](https://unifapi.com/apis) · [Sign up](https://unifapi.com) · Related: [Social listening](./social-listening.md), [Creator discovery](./creator-discovery.md)
