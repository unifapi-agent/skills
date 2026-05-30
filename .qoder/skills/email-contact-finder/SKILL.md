---
name: email-contact-finder
description: "Use this skill for public contact paths, contact-readiness checks, and planned verified work email/phone enrichment. Host search can find public paths; verification needs APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/email-contact-finder
  source: https://github.com/unifapi-agent/skills
  category: GTM
  api_status: api_backfill
  runtime_status: agent_native
---

# Email Contact Finder

## Purpose

Find compliant contact paths for qualified leads and explain confidence, source, and outreach readiness.

## Required Inputs

- People, companies, domains, LinkedIn profiles, or roles
- Allowed contact types
- Compliance constraints and geography
- Verification threshold

Use host search/fetch for public contact paths and UnifAPI public profile evidence when available. State an API gap when the user needs verified work emails, phone enrichment, deliverability checks, suppression lists, or bulk contact waterfalls.

## Agent Runtime Coverage

- Use LinkedIn public contact blocks only when the API returns them.
- Use host search/fetch for public contact, about, team, press, careers, docs, GitHub, and social profile pages.
- Recommend public social/profile outreach when email is unavailable.
- Use existing lead/person enrichment skills for qualification before contact discovery.

## API Backfill Required

- Email finder and verifier
- Role-based email discovery
- Phone enrichment where legally allowed
- Catch-all and deliverability detection
- Suppression/opt-out list integration
- Compliance metadata by source and geography

## Workflow

1. Qualify the lead first so contact discovery is not spam-ready bulk output.
2. Search public contact paths with host search/fetch and verify deliverability when APIs exist.
3. Attach source, confidence, and compliance notes to every contact.
4. Return safe next-step recommendations.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Contact readiness table
- Verified emails or public contact paths
- Source and verification confidence
- Compliance flags
- Recommended outreach channel

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not invent email patterns.
- Do not output spam-ready bulk contact lists without qualification and compliance notes.
- Respect opt-out and suppression metadata when available.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `gtm-table-enrichment` when contact readiness is part of a larger account or lead table.
