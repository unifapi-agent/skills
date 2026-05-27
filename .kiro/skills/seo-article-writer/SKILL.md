---
name: seo-article-writer
description: "Use this skill when producing SEO/GEO/AEO article briefs, outlines, drafts, metadata, internal-link plans, or CMS-ready content from public demand evidence."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/seo-article-writer
  source: https://github.com/unifapi-agent/skills
  category: SEO
  runtime_status: agent_native
---

# SEO Article Writer

## Purpose

Produce an evidence-backed article package that can move from search intent or audience demand into editorial review.

## Required Inputs

- Domain/product and target audience
- Topic, keyword, query set, or content gap
- Desired content format and depth
- Brand voice, claims, and internal pages to use if known

If keyword volume, rank, CMS publish, or live analytics are requested, state the API gap unless those data are provided by the user or a connector.

## Agent Runtime Coverage

- Use host search/fetch to inspect SERPs, competing pages, product pages, docs, and internal-link candidates.
- Use UnifAPI Reddit, YouTube, X, TikTok, LinkedIn, and other public signals for user language and demand.
- Use local repo/file access for known site content, metadata, schema, and internal links.
- Produce briefs, outlines, drafts, metadata, FAQ sections, and CMS handoff files.

## API Backfill Required

- Keyword volume, rank tracking, and difficulty data
- Answer-engine citation tracking
- CMS connectors and publish approval queues
- Plagiarism/originality and editorial workflow checks
- Content performance feedback from GA/GSC

## Workflow

1. Identify intent, audience, angle, and success metric.
2. Collect SERP, competitor, product, and customer-language evidence.
3. Build an outline that answers the query better than thin competitor content.
4. Draft content only after claims, examples, and internal links are selected.
5. Return an editorial package with metadata and verification notes.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Search/content brief
- Title, meta description, slug, and schema suggestions
- Outline or full draft, depending on request
- Internal/external links and source notes
- Publish checklist and API/data gaps

Also include runtime tools used, UnifAPI operations used, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not keyword-stuff or write unsupported claims.
- Cite or link factual claims that matter.
- Separate draft copy from CMS-ready publish status.
- Avoid copying competitor structure or prose too closely.

## Related Skills

- Use `seo-aeo-monitor` to find search or answer-engine gaps.
- Use `reddit-voice-of-customer` for customer language.
- Use `technical-seo-repo-auditor` when the article requires repo/CMS metadata fixes.
