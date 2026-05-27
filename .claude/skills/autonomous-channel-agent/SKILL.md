---
name: autonomous-channel-agent
description: "Use this API-backfill skill for Okara-style agents that find opportunities, draft actions, route approvals, schedule, publish, reply, or follow up. Research works today; execution needs scheduling/publishing APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/autonomous-channel-agent
  source: https://github.com/unifapi-agent/skills
  category: "API Backfill"
  api_status: planned
---

# Autonomous Channel Agent

## Purpose

Coordinate channel research, content drafting, approval, scheduling, publishing, and response tracking for growth channels.

## Required Inputs

- Channel, brand voice, and campaign goal
- Approval workflow and risk limits
- Publishing cadence and destinations
- Source monitor skills to use

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use current channel skills to find opportunities and draft suggested posts/replies.
- Return an approval-ready action queue, not executed actions.
- Use social listening and content-brief skills as inputs.

## API Backfill Required

- Social posting/reply APIs for supported channels
- CMS/newsletter publishing connectors
- Approval queue and reviewer state
- Brand voice and asset library
- Scheduling, retries, and moderation workflow
- Performance feedback and response monitoring

## Workflow

1. Select source monitors and opportunity criteria.
2. Generate drafts and classify risk before any action.
3. When approval/publishing APIs exist, route drafts through approval and schedule/publish.
4. Monitor responses and update next actions.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Channel action queue
- Drafts with evidence and risk level
- Approval state
- Publishing/schedule log when available
- Follow-up recommendations

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not publish or reply without explicit connector support and user approval rules.
- Keep human approval in the path for risky channels.
- Do not automate spam or policy-violating engagement.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `cross-channel-content-brief` to draft channel-specific content ideas.
- Use `reddit-opportunity-finder` or `x-social-listening` to find reply opportunities before publishing APIs exist.
- Use `scheduled-signal-alerts` when the task is alerting rather than autonomous execution.
