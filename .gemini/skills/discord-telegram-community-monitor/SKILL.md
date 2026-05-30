---
name: discord-telegram-community-monitor
description: "Use this skill to monitor public/exported Discord, Telegram, Discourse, GitHub Discussions, or other communities for growth, support, web3, and product signals; private monitoring needs connectors."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/discord-telegram-community-monitor
  source: https://github.com/unifapi-agent/skills
  category: Growth
  api_status: api_backfill
  runtime_status: agent_native
---

# Discord Telegram Community Monitor

## Purpose

Track community questions, sentiment, incidents, launches, support pain, and influential members across high-signal private or semi-public communities.

## Required Inputs

- Communities/channels/forums to monitor
- Access model and permissions
- Topics and signal categories
- Cadence and alert thresholds

Use host search/fetch for public community pages and user-provided exports when available. State an API gap when the user needs private Discord/Telegram access, durable monitoring, member metadata, or notification delivery.

## Agent Runtime Coverage

- Use Reddit, X Communities, Threads, and public social platforms as partial community proxies.
- Use host fetch/search for public Telegram channels, Discourse forums, GitHub Discussions/issues, and public community archives when accessible.
- Use user-provided exports or pasted text when connectors are unavailable.
- Do not claim private Discord/Telegram coverage without connectors.

## API Backfill Required

- Discord bot/OAuth connector with channel permissions
- Telegram public/private channel connector where allowed
- Discourse/forum and GitHub Discussions APIs
- Member/message/thread metadata with compliance controls
- Saved monitors, diffs, and notifications

## Workflow

1. Define community boundaries and permissions.
2. Collect messages/threads through public pages, user exports, or allowed connectors when available.
3. Cluster questions, incidents, feature requests, sentiment, and influential voices.
4. Return a digest and action queue for support, growth, or community teams.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Community signal digest
- Questions and incident clusters
- Influential members or threads
- Recommended responses
- Permission and coverage caveats

Also include runtime tools used, UnifAPI operations used, API gaps when relevant, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not bypass private community permissions.
- Do not deanonymize or expose unnecessary user details.
- Respect platform terms, retention limits, and moderation rules.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `reddit-community-monitor` when subreddit evidence is the best public proxy.
- Use `x-community-monitor` when the community is visible through public X Communities.
- Use `threads-opportunity-monitor` when the discussion is happening on Threads.
