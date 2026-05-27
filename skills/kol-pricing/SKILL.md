---
name: kol-pricing
description: "Use when pricing, ranking, or researching X/Twitter KOLs for creator marketing: handle batches, campaign fit, outreach recs, and Markdown/Tailwind reports. Requires product context and deterministic UnifAPI-backed pricing."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/kol-pricing
  source: https://github.com/unifapi-agent/skills
  original_source: https://github.com/Antoniaiaiaiaia/kol-pricing
  original_author: "Antonia (@antoniayly)"
---

# KOL Pricing

## Overview

Analyze X/Twitter KOLs as an agent workflow instead of a local click-through app. The agent fetches public profile and tweet data through UnifAPI MCP tools when available, applies the KOL Pricing framework deterministically, then produces campaign-ready pricing, ROI, warnings, and outreach briefs.

Core principle: keep the original framework's tiering and pricing logic as the source of truth. Use the calling agent's model for synthesis and DM copy; do not require a separate LLM provider key for the core analysis.

Attribution: this skill is adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing), originally by Antonia (@antoniayly). See [references/original-license.md](references/original-license.md).

## References

- [references/pricing-logic.md](references/pricing-logic.md) - tier matrix, boosts, penalties, ROI formula, top-pick rules, warnings, and DM boundary.
- [references/original-license.md](references/original-license.md) - original MIT license notice and attribution.
- [../unifapi/references/twitter-x.md](../unifapi/references/twitter-x.md) - current UnifAPI X/Twitter route map.

## Workflow

1. Resolve product context first.
   - Treat the promoted product as required input before fetching KOL data or pricing a campaign.
   - If the current conversation does not include product information, stop and ask for it. Accept a product/docs URL, pasted text, or a local/attached text/PDF/document file. A concise manual summary is also fine.
   - Ask for only the missing essentials: product name, URL if available, value proposition, target customer, desired action, and estimated LTV if known. Do not proceed from handles alone.
   - When the user provides a URL or file, extract product context from that source first, then ask a follow-up only for details still missing.

2. Gather campaign constraints.
   - Target KOL tiers, excluded tiers, follower floor, engagement floor, extra keywords.
   - Handles to analyze, or a search query if discovery is needed.
   - Do not assume the original app's local config files exist in this skills repository.

3. Fetch public X/Twitter data.
   - Prefer the available UnifAPI MCP tools. Look for operations corresponding to:
     - `GET /x/users/by/username/{username}` for profile lookup by handle.
     - `GET /x/users/{id}/tweets` for recent authored posts after resolving the handle to `data.id`.
     - `GET /x/tweets/search/recent` and `GET /x/autocomplete` for candidate discovery.
   - For each handle, fetch one profile and recent authored tweets. Ten tweets is enough for the default pricing workflow unless the user asks for deeper evidence.
   - Read follower and engagement metrics from `public_metrics`, not old flat fields.
   - Keep the returned `billing` metadata when available so final reports can mention actual record cost.
   - Do not call `api.x.com` directly unless the user explicitly asks for an official X implementation.

4. Create a snapshot JSON for deterministic analysis.
   - Use this shape:

```json
{
  "product": {
    "name": "YourProduct",
    "tagline": "What you do, in one line.",
    "pitch": "Short product pitch.",
    "desired_action": "sign up",
    "ltv_usd": 120,
    "twitter_handle": "@yourhandle",
    "url": "https://example.com"
  },
  "ideal_kols": {
    "preferred_tiers": ["T", "B"],
    "excluded_tiers": [],
    "extra_keywords": ["sdk", "agent"],
    "min_followers": 1000,
    "engagement_floor_pct": 0.5
  },
  "handles": [
    {
      "handle": "example",
      "profile": { "...": "UnifAPI X user object from response.data" },
      "tweets": [{ "...": "UnifAPI X tweet object from response.data[]" }]
    }
  ]
}
```

   - The analyzer also accepts whole UnifAPI response envelopes as `profile_response` and `tweets_response`, which is useful when preserving `request_id`, `pagination`, and `billing` beside the normalized report.

5. Run the offline pricing script when a reproducible artifact is useful. Generate Markdown, JSON, and Tailwind HTML artifacts from the same snapshot.

```bash
node skills/kol-pricing/scripts/analyze-snapshot.mjs \
  --input /tmp/kol-pricing-input.json \
  --out /tmp/kol-pricing-report.md \
  --json /tmp/kol-pricing-report.json \
  --html /tmp/kol-pricing-report.html
```

6. Draft outreach with the calling agent, not an external LLM key.
   - Use `dm_brief` from the JSON report.
   - Reference exactly one recent tweet when possible.
   - Keep the tone practitioner, direct, and low-hype.
   - If the recommendation is `skip`, draft a zero-cash affiliate/gift-access option only if the user still wants outreach.

## Output

Always produce a text report in chat or Markdown and, when writing artifacts, also produce an HTML report styled with Tailwind. The HTML must use the same analysis results as the text report, avoid placeholder/mock data, and mirror the original app's result modules: profile header, warnings panel, tier verdict, collaboration matrix, top-pick ROI card, contract requirements, outreach brief, and audit trail. For batch reports, prepend a records-style ranked table and top actions before the per-KOL modules.

For single-handle analysis, return:
- Verdict: tier, top pick, cash range, ROI, risk level.
- Evidence: matched keywords, engagement, profile fit, recent tweet signals.
- Recommendation: contract terms and outreach brief.
- Cost: UnifAPI records consumed or the best estimate if billing metadata is unavailable.
- HTML report path when an artifact was generated.

For batch analysis, return:
- Ranked table.
- Per-KOL mini reports.
- Top 3 actions: engage, negotiate, skip.
- Optional DM drafts for only the selected KOLs unless the user asks for all.
- HTML report path when an artifact was generated.

## Pricing Logic

Read `references/pricing-logic.md` before changing constants, explaining the model, or reviewing pricing behavior. It records the tier matrix, boosts, penalties, ROI formula, top-pick rules, warnings, and DM boundary from the original code.

## Guardrails

- Be clear that pricing is a decision aid, not a guaranteed market rate.
- Do not hide low-confidence inputs. If tweets are unavailable, protected, too old, or too few, report that.
- Do not require `ANTHROPIC_API_KEY`; the agent using this skill can draft copy itself.
- Preserve author attribution when presenting this as an extension of the KOL Pricing framework.
