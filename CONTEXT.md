# UnifAPI Skills

UnifAPI Skills is the agent-skill distribution context for UnifAPI. It packages reusable skills that help agents use UnifAPI-powered public-data workflows plus host-native search, fetch, shell, code, and file-editing capabilities.

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

**Workflow Portfolio**:
The broad set of Workflow Skills that productize likely public-data use cases across GTM, growth, creator marketing, social listening, web research, SEO, and web3 monitoring. The portfolio is not capped at a round number; it should cover high-probability scenarios that UnifAPI can support with current APIs, near-term public-data operations, or standard host-agent capabilities.
_Avoid_: API endpoint catalog, fixed 20-skill quota, demo collection

**Agent-Native Capability**:
A capability provided by target runtimes such as ChatGPT, Codex, or Claude Code, including web search, URL fetch/browser fetch, shell, JS/TS/Python execution, local file reads/writes, and code edits. Skills may use these directly instead of requiring UnifAPI to wrap them first.
_Avoid_: API gap, unsupported workflow, fake UnifAPI endpoint

**GTM Data Workflow**:
A Workflow Skill shaped around finding, enriching, scoring, monitoring, or personalizing public GTM signals. It uses Clay-like data steps but returns an agent-ready business artifact.
_Avoid_: raw lead table, generic sales prompt, private CRM workflow

**Channel Agent Output**:
The opportunity brief, alert, draft, or action plan produced by a Workflow Skill for a specific public channel. It borrows the Okara-style channel-agent framing without implying autonomous publishing or private account access.
_Avoid_: scheduled autopilot, CMS publisher, ad account operator

**Coverage Gap**:
A documented strong user need that UnifAPI Skills should acknowledge but cannot fully productize with the current UnifAPI public-data API surface and host-agent capabilities. Generic search/fetch/shell/code should not be treated as a UnifAPI Coverage Gap by itself; gaps are for scale, persistence, private connectors, write actions, normalized schemas, compliance metadata, or source-specific data that the runtime cannot provide.
_Avoid_: hidden limitation, broken skill, unsupported promise

**API Backfill Skill**:
A Workflow Skill for a high-demand user job where the skill surface should exist before every productized API is ready. API Backfill Skills must label current coverage, agent-native execution paths when available, and API backfill requirements instead of pretending hosted execution is supported.
_Avoid_: fake supported skill, endpoint wishlist only, hidden roadmap item

**Skill Package**:
The portable contents of a Skill: `SKILL.md`, references, scripts, and agent metadata. It excludes the original app UI, server, and local product config unless those files are specifically rewritten as skill assets.
_Avoid_: Full app migration, repository mirror, source app

**Plugin Manifest**:
The platform-specific metadata that lets an agent marketplace discover UnifAPI Skills. The first release ships Codex, Claude Code, and Cursor manifests.
_Avoid_: Jekyll config, SEO metadata, app config

**Plugin-First Distribution**:
The preferred packaging model for non-developer users. Users install UnifAPI from a plugin or connector directory and complete OAuth, while `npx skills` stays a developer fallback.
_Avoid_: CLI-first onboarding, raw skill install as primary CTA, pasted-token setup

**Codex Plugin Bundle**:
The generated installable Codex plugin directory under `plugins/unifapi`. It must contain `.codex-plugin/plugin.json`, `.mcp.json`, linked docs, and the full `skills/` tree so Codex marketplace installation caches both MCP and Skills. The root repo remains the source of truth; regenerate the bundle with `scripts/sync-plugin-bundle.mjs`.
_Avoid_: hand-edited bundle, marketplace entry pointing at repo root, symlink-only bundle, missing MCP or skill files

**Provider-Native Skill Tree**:
Generated copies of the canonical root `skills/` tree under platform-native locations such as `.agents/skills`, `.claude/skills`, `.cursor/skills`, `.gemini/skills`, `.github/skills`, `.kiro/skills`, `.opencode/skills`, `.pi/skills`, `.qoder/skills`, `.trae*/skills`, and `.rovodev/skills`. These exist for agent clients that discover skills from provider-specific directories. Edit root `skills/` and regenerate; do not hand-edit provider copies.
_Avoid_: platform fork, manual duplicate, divergent skill definition

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

Dev: "Should non-developer users run `npx skills`?"

Domain expert: "No. Non-developer users should install a plugin or connect the hosted MCP server through their AI app UI. Keep CLI commands as fallback documentation."

Dev: "Can Codex marketplace point directly at the repo root?"

Domain expert: "No. Use `plugins/unifapi` as the Codex marketplace bundle so installation includes `.codex-plugin`, `.mcp.json`, and the Skills tree."

Dev: "Should KOL Pricing bring over the Vue/Hono app?"

Domain expert: "No. Bring only the Skill Package: workflow, references, scripts, and agent metadata."

Dev: "Should the new GTM skills be exactly twenty API wrappers?"

Domain expert: "No. Build a Workflow Portfolio: enough Workflow Skills to cover high-probability GTM, growth, creator, social listening, and web3 monitoring scenarios, while keeping API limitations explicit in Coverage Gaps."

Dev: "Should core demand like SEO, web research, CRM export, or on-chain monitors be omitted until APIs are ready?"

Domain expert: "No. Create skills for the important jobs now. Use agent-native search, fetch, shell, and code when the runtime can execute the workflow, and list API backfill only for productized scale, persistence, connectors, write actions, and source-specific data."
