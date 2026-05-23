# UnifAPI Skills

UnifAPI Skills is the agent-skill distribution context for UnifAPI. It packages reusable skills that help coding agents use UnifAPI-powered public-data workflows.

## Language

**UnifAPI Skills**:
The skill distribution repository for UnifAPI agent workflows. Its canonical GitHub slug is `unifapi-agent/skills`.
_Avoid_: `unifapi-agent/unifapi`, `unfiapi-agent/skills`, SEO site, docs site

**Skill**:
A reusable agent capability packaged with a `SKILL.md` entrypoint and supporting references or scripts. A skill may be authored in this repository or adapted from another repository with attribution.
_Avoid_: SEO page, guide page, app clone

**Adapted Skill**:
A Skill derived from an external project and maintained directly in UnifAPI Skills, with clear attribution to the source repository. Adapted Skills are not automatically synced from their source.
_Avoid_: Synced skill, vendored app, copied app

**Platform Skill**:
A Skill that teaches agents how to use UnifAPI itself, including its public-data API and MCP access patterns. The canonical first Platform Skill is `skills/unifapi`.
_Avoid_: Product docs, SEO page, API catalog page

**MCP OAuth**:
The default way an agent connects to UnifAPI's hosted MCP server. OAuth authorizes the UnifAPI workspace and credit balance, not a user's private upstream accounts.
_Avoid_: Default API key setup, pasted OAuth token, upstream account OAuth

**API-Key Fallback**:
A secondary credential path for clients that cannot complete MCP OAuth. It is documented as a fallback, not the default setup path.
_Avoid_: Primary MCP auth, required setup, pasted secret

**Workflow Skill**:
A Skill that applies UnifAPI to a specific agent workflow or business scenario. `skills/kol-pricing` is the first Workflow Skill.
_Avoid_: Platform skill, example page, demo app

**Skill Package**:
The portable contents of a Skill: `SKILL.md`, references, scripts, and agent metadata. It excludes the original app UI, server, and local product config unless those files are specifically rewritten as skill assets.
_Avoid_: Full app migration, repository mirror, source app

**Plugin Manifest**:
The platform-specific metadata that lets an agent marketplace discover UnifAPI Skills. The first release ships Codex, Claude Code, and Cursor manifests.
_Avoid_: Jekyll config, SEO metadata, app config

## Example Dialogue

Dev: "Should the KOL Pricing work stay in the old SEO repo?"

Domain expert: "No. It belongs in UnifAPI Skills, under the canonical `unifapi-agent/skills` repository."

Dev: "Is KOL Pricing a full app migration?"

Domain expert: "No. It is a Skill: the reusable agent workflow, references, scripts, and attribution from the original project."

Dev: "Should KOL Pricing be listed as synced from the original repo?"

Domain expert: "No. It is an Adapted Skill: derived from the original project, attributed to it, and maintained here."

Dev: "Should the first release include only KOL Pricing?"

Domain expert: "No. It should include the `unifapi` Platform Skill plus the `kol-pricing` Workflow Skill, matching the Resend-style distribution pattern."

Dev: "Should the MCP config ask users for an API key by default?"

Domain expert: "No. Use MCP OAuth by default. Mention API keys only as a fallback for clients that cannot complete OAuth."

Dev: "Which plugin manifests should ship first?"

Domain expert: "Ship all three Resend-style manifests for Codex, Claude Code, and Cursor."

Dev: "Should KOL Pricing bring over the Vue/Hono app?"

Domain expert: "No. Bring only the Skill Package: workflow, references, scripts, and agent metadata."
