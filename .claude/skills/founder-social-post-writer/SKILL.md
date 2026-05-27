---
name: founder-social-post-writer
description: "Use this skill when drafting founder-led posts for X, LinkedIn, Threads, or similar channels from public signals, brand voice, product proof, and channel constraints."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/founder-social-post-writer
  source: https://github.com/unifapi-agent/skills
  category: Growth
  runtime_status: agent_native
---

# Founder Social Post Writer

## Purpose

Create publish-ready but approval-gated founder or operator social post drafts that are grounded in real product context and current public signals.

## Required Inputs

- Founder/operator voice samples or brand voice notes
- Product, audience, and campaign goal
- Target platforms and post count
- Source material, claims, links, or launch context

If voice samples or product proof are missing, ask for them or write in a neutral operator voice with explicit assumptions.

## Agent Runtime Coverage

- Use UnifAPI X, LinkedIn, Threads, Reddit, YouTube, TikTok, and Instagram skills to gather current channel signals.
- Use host search/fetch to inspect product pages, docs, launches, or competitor posts.
- Draft posts, hooks, reply angles, and scheduling suggestions.
- Do not publish, schedule, or reply automatically without a future write connector and approval queue.

## API Backfill Required

- Social account OAuth for posting and scheduling
- Durable brand/persona memory
- Approval queues and moderation logs
- Private analytics for performance feedback
- Asset library and campaign calendar connectors

## Workflow

1. Establish voice, audience, platform constraints, and claims that are safe to use.
2. Gather current public signals only when they improve relevance.
3. Choose post angles: lesson, build-in-public, launch, customer insight, objection, contrarian take, or recap.
4. Draft platform-specific variants with hook, body, CTA, and optional reply/comment ideas.
5. Return an approval-ready set with evidence and risks.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Draft posts by platform
- Voice and positioning notes
- Evidence or source material used
- Risky claims to verify
- Suggested cadence or follow-up replies

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not fabricate customer stories, metrics, founder experiences, or endorsements.
- Keep promotional claims tied to evidence or mark them for approval.
- Do not recommend spammy engagement or automated posting.
- Preserve platform-specific norms without copying another creator's voice too closely.

## Related Skills

- Use `cross-channel-content-brief` when the user needs strategy before drafting.
- Use `x-social-listening` or `linkedin-company-content-monitor` for channel evidence.
- Use `autonomous-channel-agent` when the user asks for scheduling or publishing.
