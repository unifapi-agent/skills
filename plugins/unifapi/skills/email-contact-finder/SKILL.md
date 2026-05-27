---
name: email-contact-finder
description: "Use this planned skill for verified work emails, role emails, phone numbers, public contact paths, and outbound contact readiness. Current coverage is public LinkedIn contact blocks; full execution needs finder/verifier APIs."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/email-contact-finder
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# Email Contact Finder

## Purpose

Find compliant contact paths for qualified leads and explain confidence, source, and outreach readiness.

## Required Inputs

- People, companies, domains, LinkedIn profiles, or roles
- Allowed contact types
- Compliance constraints and geography
- Verification threshold

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use LinkedIn public contact blocks only when the API returns them.
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
2. Search public contact paths and verify deliverability when APIs exist.
3. Attach source, confidence, and compliance notes to every contact.
4. Return safe next-step recommendations.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Contact readiness table
- Verified emails or public contact paths
- Source and verification confidence
- Compliance flags
- Recommended outreach channel

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not invent email patterns.
- Do not output spam-ready bulk contact lists without qualification and compliance notes.
- Respect opt-out and suppression metadata when available.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
