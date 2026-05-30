---
name: technical-seo-repo-auditor
description: "Use this skill when auditing or fixing technical SEO in a local codebase or known website: metadata, sitemap, robots, canonicals, schema, internal links, performance basics, and indexability."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/technical-seo-repo-auditor
  source: https://github.com/unifapi-agent/skills
  category: SEO
  runtime_status: agent_native
---

# Technical SEO Repo Auditor

## Purpose

Audit a local repo or public site for technical SEO issues and, when the user wants implementation, patch the codebase and verify the result.

## Required Inputs

- Target repo, route, domain, or URL set
- Framework or app location when not obvious
- SEO goal: indexing, rich results, AEO/GEO visibility, landing-page quality, or migration safety
- Whether to only report issues or implement fixes

If the user asks for a repo fix, inspect the actual codebase before proposing changes. If the target is only a public URL, use host fetch/browser/shell and clearly label any checks that cannot be verified without source access.

## Agent Runtime Coverage

- Use `rg`, shell, JS/TS, Python, browser/fetch, and local framework commands directly.
- Inspect route metadata, generated head tags, sitemap/robots generation, structured data, canonical URLs, redirects, image alt text, and internal linking.
- Patch source files when requested, then run focused tests, build checks, or page rendering checks when available.
- Use `seo-aeo-monitor` for broader content, rank, or AEO strategy.

## Workflow

1. Map the app structure, route system, metadata source of truth, and generated SEO assets.
2. Check indexability basics: status codes, robots, sitemap, canonical, title, meta description, hreflang when relevant, and noindex rules.
3. Check structured data, Open Graph/Twitter metadata, heading structure, internal links, and obvious performance/rendering blockers.
4. If implementing, patch the shared generator/source of truth rather than one generated output page.
5. Verify with the narrowest meaningful command or rendered-page check, then report residual risks.

## Output Contract

Return a concise audit or patch summary. Include:

- Issues found, ordered by impact
- Files or URLs affected
- Fixes applied or recommended
- Verification commands/results
- Residual risks and API/data gaps

Also include runtime tools used, assumptions, confidence, and whether any UnifAPI/social evidence informed prioritization.

## Guardrails

- Do not claim rank, traffic, Core Web Vitals field data, backlinks, or GSC/GA4 findings without real data.
- Do not edit generated artifacts when a source generator exists.
- Preserve unrelated local changes in the worktree.
- Avoid broad redesigns unless the user asked for content or UX changes.
- If the user wants ongoing rank/AEO monitoring, use `seo-aeo-monitor` and mark the required API backfill.

## Related Skills

- Use `seo-aeo-monitor` for strategy, SERP/AEO planning, and demand research.
- Use `web-page-change-monitor` for public page comparisons.
- Use `web-research-agent` for competitor page and docs research.
