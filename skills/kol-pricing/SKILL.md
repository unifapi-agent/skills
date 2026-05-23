---
name: kol-pricing
description: "Use this skill when pricing, ranking, or researching X/Twitter KOLs for a creator marketing campaign, especially when the user provides handles, asks for batch KOL analysis, wants outreach recommendations, or wants an agent-native version of the KOL Pricing framework. Prefer UnifAPI MCP tools for public X data, then run the deterministic pricing workflow before drafting outreach."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agent-skills
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

## Workflow

1. Gather campaign context.
   - Product name, URL, pitch, desired action, estimated LTV.
   - Target KOL tiers, excluded tiers, follower floor, engagement floor, extra keywords.
   - Handles to analyze, or a search query if discovery is needed.
   - If the user does not provide context, ask for minimal campaign inputs. Do not assume the original app's local config files exist in this skills repository.

2. Fetch public X/Twitter data.
   - Prefer the available UnifAPI MCP tools. Look for operations corresponding to:
     - `GET /twitter/users/{screen_name}`
     - `GET /twitter/users/{screen_name}/tweets`
     - `GET /twitter/search` for candidate discovery.
   - For each handle, fetch one profile and recent authored tweets. Ten tweets is enough for the default pricing workflow unless the user asks for deeper evidence.
   - Keep the returned `billing` metadata when available so final reports can mention actual record cost.
   - Do not call `api.x.com` directly unless the user explicitly asks for an official X implementation.

3. Create a snapshot JSON for deterministic analysis.
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
      "profile": { "...": "UnifAPI Twitter user object" },
      "tweets": [{ "...": "UnifAPI Twitter tweet object" }]
    }
  ]
}
```

4. Run the offline pricing script when a reproducible artifact is useful.

```bash
node skills/kol-pricing/scripts/analyze-snapshot.mjs \
  --input /tmp/kol-pricing-input.json \
  --out /tmp/kol-pricing-report.md \
  --json /tmp/kol-pricing-report.json
```

5. Draft outreach with the calling agent, not an external LLM key.
   - Use `dm_brief` from the JSON report.
   - Reference exactly one recent tweet when possible.
   - Keep the tone practitioner, direct, and low-hype.
   - If the recommendation is `skip`, draft a zero-cash affiliate/gift-access option only if the user still wants outreach.

## Output

For single-handle analysis, return:
- Verdict: tier, top pick, cash range, ROI, risk level.
- Evidence: matched keywords, engagement, profile fit, recent tweet signals.
- Recommendation: contract terms and outreach brief.
- Cost: UnifAPI records consumed or the best estimate if billing metadata is unavailable.

For batch analysis, return:
- Ranked table.
- Per-KOL mini reports.
- Top 3 actions: engage, negotiate, skip.
- Optional DM drafts for only the selected KOLs unless the user asks for all.

## Pricing Logic

Read `references/pricing-logic.md` before changing constants, explaining the model, or reviewing pricing behavior. It records the tier matrix, boosts, penalties, ROI formula, top-pick rules, warnings, and DM boundary from the original code.

## Guardrails

- Be clear that pricing is a decision aid, not a guaranteed market rate.
- Do not hide low-confidence inputs. If tweets are unavailable, protected, too old, or too few, report that.
- Do not require `ANTHROPIC_API_KEY`; the agent using this skill can draft copy itself.
- Preserve author attribution when presenting this as an extension of the KOL Pricing framework.
