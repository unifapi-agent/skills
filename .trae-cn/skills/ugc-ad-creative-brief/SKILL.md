---
name: ugc-ad-creative-brief
description: "Use this skill when creating UGC, influencer, short-video, ad creative, hook, script, storyboard, or creator brief packages from public audience and competitor evidence."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/ugc-ad-creative-brief
  source: https://github.com/unifapi-agent/skills
  category: Creator Marketing
  runtime_status: agent_native
---

# UGC Ad Creative Brief

## Purpose

Create creator-ready UGC and ad creative briefs with hooks, scripts, proof points, shot lists, and risk notes.

## Required Inputs

- Product, offer, landing page, or campaign context
- Target audience and platform
- Creative goal: awareness, activation, retargeting, comparison, testimonial, launch, or direct response
- Brand/legal constraints, claims, assets, and creator requirements if available

If the user asks for actual video generation, asset upload, or ad launch, state the connector/API gap unless a host tool explicitly supports that task.

## Agent Runtime Coverage

- Use UnifAPI TikTok, Instagram, YouTube, X, Reddit, and creator skills to inspect public audience language, creator formats, and competitor reactions.
- Use host search/fetch to inspect landing pages, competitor ads/pages, and public creative examples.
- Draft briefs, hooks, scripts, shot lists, creator instructions, and claim checklists.
- Do not generate, upload, or run paid ads unless a separate host tool or future connector is explicitly available.

## API Backfill Required

- Creative asset library and rights metadata
- UGC/video generation or editing pipeline
- Creator marketplace and contracting workflow
- Ad account upload, launch, spend, and performance connectors
- Approval queues and brand safety checks

## Workflow

1. Extract offer, proof, audience pain, objections, and forbidden claims.
2. Gather public audience language and winning format patterns.
3. Choose creative angles by funnel stage and platform.
4. Write hooks, scripts, shot lists, and creator notes.
5. Return an approval-ready package with testing plan and risks.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Creative angle matrix
- UGC briefs and scripts
- Hook and CTA variants
- Shot list or storyboard notes
- Claims, risks, and test plan

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not invent testimonials, endorsements, medical/financial claims, or before/after proof.
- Keep paid-ad launch steps separate from creative recommendations.
- Respect creator rights, disclosure needs, and platform ad policies.
- Prefer evidence-backed audience language over generic direct-response formulas.

## Related Skills

- Use `creator-comment-miner` for audience objections and language.
- Use `multi-platform-creator-shortlist` for creator discovery.
- Use `paid-ads-operator` when the user needs ad account execution.
