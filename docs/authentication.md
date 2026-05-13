---
title: Authentication
nav_order: 2
parent: Docs
---

# Authentication

[UnifAPI](https://unifapi.com) uses bearer-token authentication. One key authorizes every endpoint in the [API catalog](https://unifapi.com/apis) — no per-platform OAuth, no per-user auth dance.

## Bearer token

Pass your key in the `Authorization` header:

```http
Authorization: Bearer sk_live_...
```

```bash
curl https://api.unifapi.com/v1/reddit/subreddit/posts \
  -H "Authorization: Bearer $UNIFAPI_KEY" \
  -d '{"subreddit": "LocalLLaMA"}'
```

## Key types

| Prefix | Purpose |
| --- | --- |
| `sk_live_` | Server-side production calls |
| `sk_test_` | Sandbox; doesn't consume real credits |

Manage keys in your UnifAPI dashboard.

## Why no per-user OAuth?

UnifAPI exposes **public data only**. You don't need a user to "connect their Twitter account" — the API reads what is already public on the open web. If your product needs OAuth into the user's own SaaS accounts (their Gmail, Slack, Salesforce), see [UnifAPI vs Composio](../comparisons/unifapi-vs-composio.md).

## Rate limits

Limits are applied per key per minute and per credit balance. Hitting a limit returns HTTP 429 with `Retry-After`.

## Rotating a key

Rotate any time from the dashboard — old keys remain valid for a 24-hour grace window so you can roll the new one through your agents without downtime.

## Related

- [Quickstart](./quickstart.md)
- [Pricing & credits](./pricing.md)
- [FAQ](./faq.md)
