---
name: persona-classification-agent
description: "Use this skill when classifying people, leads, creators, or accounts into personas, buying roles, segments, seniority, functions, or ICP buckets from public/profile evidence."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/persona-classification-agent
  source: https://github.com/unifapi-agent/skills
  category: GTM
  runtime_status: agent_native
---

# Persona Classification Agent

## Purpose

Classify rows into useful personas or buying roles with evidence and confidence so downstream enrichment, scoring, and outbound use the right messaging.

## Required Inputs

- People/accounts/creator rows or profile URLs
- Persona taxonomy or permission to propose one
- Product category and target buyer context
- Required output fields and confidence threshold

If the taxonomy is missing, propose a compact taxonomy and ask for confirmation only when the choice materially changes the workflow.

## Agent Runtime Coverage

- Use host code tools for batch classification over CSV/JSON/Markdown tables.
- Use UnifAPI LinkedIn profile, company, post, and public social operations when profile identifiers exist.
- Use host search/fetch for public bios, team pages, and profile pages.
- Treat private employment history, CRM fields, and contact identity resolution as API backfill unless user-provided.

## API Backfill Required

- Cross-platform identity resolution
- Bulk people/company enrichment
- Persistent table execution with row-level retries
- CRM/contact object connectors and dedupe keys
- Persona taxonomy management and evaluation sets

## Workflow

1. Define taxonomy, allowed labels, evidence fields, and abstain conditions.
2. Normalize names, companies, profile URLs, and row IDs.
3. Collect only public/profile evidence needed for classification.
4. Classify with confidence and one-sentence rationale.
5. Route low-confidence or conflicting rows to manual review.

## Output Contract

Return a decision-ready artifact, not a raw dump. Include:

- Classified table or file path
- Persona/role label and confidence
- Evidence snippets or URLs
- Ambiguous rows and recommended review
- Suggested next workflow per persona

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not infer protected or sensitive attributes.
- Use abstain/unknown labels when evidence is weak.
- Keep role classification distinct from authority to buy.
- Do not treat job titles as perfect persona labels without context.

## Related Skills

- Use `buyer-committee-mapper` for a target-account buying committee.
- Use `lead-account-scoring-agent` after persona labels are assigned.
- Use `outbound-sequence-generator` for persona-specific messaging.
