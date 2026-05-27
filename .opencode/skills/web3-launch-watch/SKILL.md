---
name: web3-launch-watch
description: "Use this skill when monitoring a web3 launch, token announcement, testnet, airdrop, NFT drop, or ecosystem campaign through public social signals."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills/web3-launch-watch
  source: https://github.com/unifapi-agent/skills
  category: Web3
---

# Web3 Launch Watch

## Purpose

Create a launch watch report focused on awareness, confusion, FUD, KOL amplification, community questions, and scam-risk lookalikes.

## Required Inputs

- Launch/project names, official handles, tickers, URLs, and hashtags
- Launch window
- Risk keywords or competitor projects

If the user has not provided enough context to rank or act on the data, ask for the missing product, audience, account, channel, or monitoring goal before calling live APIs.

## UnifAPI Operations

Prefer UnifAPI MCP OAuth through https://mcp.unifapi.com. Use list_operations and get_operation to confirm current schemas before calling live data. Likely operations:

- `GET /x/tweets/search/recent`
- `GET /x/users/by/username/{username}`
- `GET /x/users/{id}/tweets`
- `GET /reddit/trending-searches`
- `GET /youtube/search`
- `GET /threads/search/recent`

## Workflow

1. Validate official handles and exact launch terms first.
2. Search for exact launch mentions, ticker variants, and common scam/lookalike terms.
3. Classify reactions into awareness, confusion, support, FUD, scam warning, and influencer amplification.
4. Recommend communication follow-ups and risk responses.

## Output Contract

Return a decision-ready artifact, not a raw API dump. Include:

- Launch watch digest
- Amplifiers and detractors
- Community questions
- Scam/lookalike risk notes
- Response recommendations

Also include operations used, query coverage, assumptions, confidence, and billing metadata when available.

## Guardrails

- Do not verify smart contracts, wallets, or token legitimacy without external tools.
- Clearly label all social-risk findings as public-signal evidence.
- Use public data only. OAuth authorizes the UnifAPI workspace and credit balance, not private upstream accounts.
- If the user asks for data outside current UnifAPI coverage, record it as a coverage gap instead of pretending it is supported.

## Related Skills

- Use `unifapi` for MCP setup, operation discovery, auth fallback, and public-data boundaries.
- Use `kol-pricing` only when the task is X/Twitter KOL pricing and the product context is known.
