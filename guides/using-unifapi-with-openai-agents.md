---
title: Using UnifAPI with OpenAI Agents
nav_order: 5
parent: Guides
---

# Using UnifAPI with OpenAI Agents & function calling

Wire [UnifAPI](https://unifapi.com)'s catalog into the OpenAI Agents SDK (or any function-calling LLM) so your agent can search Google, fetch tweets, scrape URLs, and read news with one bearer key.

## Two paths

1. **OpenAPI tool loader** — point the agent at UnifAPI's OpenAPI spec; tools are typed automatically.
2. **Manual function schemas** — declare just the endpoints you need.

## Path 1 — OpenAPI loader (recommended)

UnifAPI publishes a full OpenAPI 3.1 spec at `https://api.unifapi.com/openapi.json`.

```python
from openai import OpenAI
from openai_agents import Agent, OpenAPITool

client = OpenAI()

tools = OpenAPITool.from_url(
    "https://api.unifapi.com/openapi.json",
    auth={"type": "bearer", "token": os.environ["UNIFAPI_KEY"]},
)

agent = Agent(
    model="gpt-5",
    tools=tools,
    instructions="Use unifapi tools to read the open web.",
)

agent.run("What are people saying about the new Anthropic release on Reddit?")
```

## Path 2 — Manual function schemas

If you only need a few endpoints, hand-declare them:

```python
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "unifapi_google_serp",
            "description": "Search Google and return organic results.",
            "parameters": {
                "type": "object",
                "properties": {
                    "q": {"type": "string"},
                    "geo": {"type": "string", "default": "US"},
                },
                "required": ["q"],
            },
        },
    },
    # ...add scrape.markdown, news.search, etc.
]

def call_unifapi(name, args):
    endpoint = {
        "unifapi_google_serp": "google-serp/search",
        # ...
    }[name]
    return httpx.post(
        f"https://api.unifapi.com/v1/{endpoint}",
        headers={"Authorization": f"Bearer {os.environ['UNIFAPI_KEY']}"},
        json=args,
    ).json()
```

## TypeScript / Vercel AI SDK

```ts
import { tool } from "ai";
import { z } from "zod";

export const googleSerp = tool({
  description: "Search Google and return organic results",
  parameters: z.object({ q: z.string(), geo: z.string().optional() }),
  execute: async (args) =>
    fetch("https://api.unifapi.com/v1/google-serp/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UNIFAPI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }).then((r) => r.json()),
});
```

## What endpoints are most useful?

For a general-purpose agent, the three-tool minimum:

- `google-serp/search` — find candidate URLs
- `scrape/markdown` — read a URL as LLM context
- `scrape/structured` — extract a typed JSON object

Add per-platform endpoints (Twitter, YouTube, Reddit, news) as your product needs them. Full list: [unifapi.com/apis](https://unifapi.com/apis).

## Why this works

UnifAPI's whole catalog shares one auth header, one error model, and one pagination contract — so your tool wrapping code stays uniform, and the agent's tool schema doesn't sprawl. Read more: [Unified API for AI agents](./unified-api-for-ai-agents.md).

[**→ Sign up**](https://unifapi.com) · Related: [Using UnifAPI with Claude via MCP](./using-unifapi-with-claude-mcp.md)
