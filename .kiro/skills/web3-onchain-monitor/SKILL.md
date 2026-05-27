---
name: web3-onchain-monitor
description: "Use this API-backfill skill for wallets, contracts, token holders, whales, DEX liquidity, NFT mints, governance, bridges, or protocol-risk monitoring. Current web3 skills cover social narratives only."
license: MIT
metadata:
  author: UnifAPI
  version: "0.1.0"
  homepage: https://unifapi.com/skills/web3-onchain-monitor
  source: https://github.com/unifapi-agent/skills
  category: "API Backfill"
  api_status: planned
---

# Web3 Onchain Monitor

## Purpose

Combine on-chain events with social narratives to produce actionable web3 intelligence without turning it into trading advice.

## Required Inputs

- Chains, wallets, contracts, tokens, collections, or protocols
- Event types and thresholds
- Social narratives or watchlist accounts
- Risk and alerting requirements

If the user asks for full execution before the required APIs exist, state the gap clearly, run only the current proxy workflow when useful, and return the API Backfill Required section as implementation guidance.

## Current Coverage

- Use `crypto-narrative-monitor`, `token-community-sentiment-pulse`, and X/Reddit/YouTube social signals as narrative context.
- Do not claim wallet, holder, liquidity, or contract evidence until on-chain APIs exist.
- Use social monitoring as a proxy only for community perception.

## API Backfill Required

- Chain indexers for wallets, contracts, transfers, and token holders
- DEX liquidity, volume, swaps, and pool data
- NFT mint/transfer/floor signals
- Governance proposals and voting data
- Risk labels, contract verification, bridge events, and entity tags
- Crypto price, CEX/DEX listings, and volatility data

## Workflow

1. Define entities and on-chain event thresholds.
2. When on-chain APIs exist, collect events and classify severity.
3. Correlate on-chain events with social narratives and KOL amplification.
4. Return an evidence-backed risk or opportunity monitor.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- On-chain event digest
- Social-plus-on-chain correlation
- Risk and anomaly flags
- Watched entities and thresholds
- No-trading-advice caveats

Also include current coverage used, API gaps, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not provide investment or trading advice.
- Do not verify contracts or wallets without on-chain data sources.
- Label social-only findings as incomplete until on-chain APIs are available.
- Use public data only unless a future connector explicitly authorizes private sources.
- Do not pretend the API backfill exists; expose missing operations as product requirements.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use current social/professional-platform skills for partial evidence while this skill waits on API backfill.
