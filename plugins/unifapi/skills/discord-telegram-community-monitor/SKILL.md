---
name: discord-telegram-community-monitor
description: "Use this planned skill to monitor Discord, Telegram, Discourse, GitHub Discussions, or other communities for growth, support, web3, and product signals. Current coverage uses Reddit, X Communities, and Threads."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/discord-telegram-community-monitor
  source: https://github.com/unifapi-agent/skills
  category: "Future Core"
  api_status: planned
---

# Discord Telegram Community Monitor

## Purpose

Track community questions, sentiment, incidents, launches, support pain, and influential members across high-signal private or semi-public communities.

## Required Inputs

- Communities/channels/forums to monitor
- Access model and permissions
- Topics and signal categories
- Cadence and alert thresholds

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use Reddit, X Communities, Threads, and public social platforms as partial community proxies.
- Ask users to provide exported text or public URLs when connectors are unavailable.
- Do not claim Discord/Telegram coverage without connectors.

## API Backfill Required

- Discord bot/OAuth connector with channel permissions
- Telegram public/private channel connector where allowed
- Discourse/forum and GitHub Discussions APIs
- Member/message/thread metadata with compliance controls
- Saved monitors, diffs, and notifications

## Workflow

1. Define community boundaries and permissions.
2. Collect messages/threads through allowed connectors when available.
3. Cluster questions, incidents, feature requests, sentiment, and influential voices.
4. Return a digest and action queue for support, growth, or community teams.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Community signal digest
- Questions and incident clusters
- Influential members or threads
- Recommended responses
- Permission and coverage caveats

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not bypass private community permissions.
- Do not deanonymize or expose unnecessary user details.
- Respect platform terms, retention limits, and moderation rules.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this planned skill waits on API backfill.
