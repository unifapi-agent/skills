# Default to MCP OAuth

UnifAPI Skills should present `https://mcp.unifapi.com` as an OAuth protected MCP server by default. API-key bearer headers remain a fallback for clients without OAuth protected-resource discovery, but the skills repository should not make pasted static credentials look like the primary path.
