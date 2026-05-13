# Lead & company enrichment with UnifAPI

Enrich a CRM record from the open web — company site, news mentions, social presence, SERP footprint — through one API. Live: [unifapi.com/solutions/lead-enrichment](https://unifapi.com/solutions/lead-enrichment).

## The agent loop

1. **Resolve the domain** — `acme.io` → official site
2. **Scrape** the homepage / about / pricing pages → [URL → markdown](https://unifapi.com/apis/url-to-markdown) / [URL → structured](https://unifapi.com/apis/url-to-data)
3. **SERP-check** the brand for funding, customers, reviews → [Google SERP](https://unifapi.com/apis/google-serp)
4. **News** check for recent moves → [News Search](https://unifapi.com/apis/news-search)
5. **Social** check for product-market signal → [Twitter / X](https://unifapi.com/apis/twitter), [Reddit](https://unifapi.com/apis/reddit)
6. **Compose** the enrichment payload, write back to CRM

## APIs used

- [URL → markdown](https://unifapi.com/apis/url-to-markdown), [URL → structured](https://unifapi.com/apis/url-to-data) — fetch and extract from the company site
- [Google SERP](https://unifapi.com/apis/google-serp) — brand footprint, reviews, listicles
- [News Search](https://unifapi.com/apis/news-search) — funding, hires, launches
- [Twitter / X](https://unifapi.com/apis/twitter), [Reddit](https://unifapi.com/apis/reddit) — community signal

## Public-data only — why that's a feature

Lead enrichment from the open web doesn't need OAuth into anyone's accounts. UnifAPI's server-side key model means the enrichment agent runs unattended — no per-user connection flow blocks the pipeline. If you also need to write enriched records into the user's CRM (Salesforce, HubSpot), pair UnifAPI with [Composio](../comparisons/unifapi-vs-composio.md).

[**→ Sign up**](https://unifapi.com) · [Browse APIs](https://unifapi.com/apis) · Related: [Competitive intelligence](./competitive-intelligence.md), [Market research](./market-research.md)
