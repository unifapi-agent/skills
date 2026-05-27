---
name: outbound-sequence-generator
description: "Use this skill when creating evidence-backed outbound email, LinkedIn, X DM, partner, recruiting, or creator outreach sequences from target rows and personalization hooks."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/outbound-sequence-generator
  source: https://github.com/unifapi-agent/skills
  category: GTM
  runtime_status: agent_native
---

# Outbound Sequence Generator

## Purpose

Turn target rows and public evidence into a multi-step outreach sequence that is ready for review or manual import.

## Required Inputs

- Target people/accounts or a table of rows
- Product, offer, audience, and desired action
- Channel mix and sequence length
- Tone, compliance, and do-not-use constraints

If contact data, CRM enrollment, or sales engagement sending is requested, state the API gap unless a connector or user-provided export exists.

## Agent Runtime Coverage

- Use host code tools to merge, dedupe, and format tables.
- Use UnifAPI LinkedIn, X, Threads, and public social skills for personalization evidence.
- Use `outbound-personalization-brief` to choose hooks before writing copy.
- Produce CSV/Markdown/JSON-ready output; do not send messages or enroll contacts automatically.

## API Backfill Required

- Verified email/contact enrichment
- CRM and sales-engagement connectors
- Sequence enrollment, unsubscribe, and suppression handling
- Reply/status sync and A/B test reporting

## Workflow

1. Segment targets by persona, trigger, and channel.
2. Select one evidence-backed hook per segment or row.
3. Draft step sequence with subject lines, body, CTA, follow-up logic, and variants.
4. Add merge fields and compliance notes for manual import.
5. Return a review-ready sequence package and unresolved data needs.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Sequence steps by segment or row
- Personalization hooks and evidence
- Subject/CTA variants
- Merge-field and import mapping
- Compliance, suppression, and connector gaps

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not invent personal familiarity, private context, or unverifiable claims.
- Do not include manipulative or sensitive personal data.
- Do not send, schedule, or enroll without explicit connector support and approval.
- Keep unsubscribe, opt-out, and jurisdiction-sensitive requirements visible.

## Related Skills

- Use `outbound-personalization-brief` for one-off target research.
- Use `gtm-table-enrichment` for input table cleanup.
- Use `crm-export-sequence` for CRM or sales-engagement handoff.
