# Founder Operator Console

A private AI operating console built from the shadcn chatbot template. This app is being adapted for Chip Phillips as a solo-founder assistant for Constructiv AI, Wilson Lumber onboarding, Blue Hen analytics, KAS/canon work, design-system work, and relationship follow-through.

## Current foundation

- Next.js
- React
- AI SDK
- Vercel AI Gateway
- shadcn/ui
- shadcn/react
- shadcn/typeset
- Base UI
- typed tool parts
- provider-native web search
- human-in-the-loop questionnaire flow

## Founder-console additions

This branch adds the foundation for:

- private founder operating context
- artifact creation via `create_artifact`
- visible sub-agent task creation via `create_agent_task`
- operator sidebar with artifacts, tasks, and standing agents
- Supabase runtime schema migration drafts
- opt-in Supabase persistence helper
- context files for future Claude Code work

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Local AI Gateway authentication can use either a Vercel-linked OIDC environment or `AI_GATEWAY_API_KEY`.

## Optional Supabase persistence

Supabase writes are disabled by default.

```bash
SUPABASE_PERSISTENCE_ENABLED=false
```

To enable server-side runtime persistence after applying migrations and confirming the target project:

```bash
SUPABASE_PERSISTENCE_ENABLED=true
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

## Supabase migrations

Migration drafts live under:

```txt
supabase/migrations/
```

The first runtime migration creates:

- `assistant_threads`
- `assistant_messages`
- `assistant_runs`
- `assistant_tool_calls`
- `assistant_forms`
- `assistant_form_responses`
- `agent_tasks`
- `agent_runs`

It also adds artifact linkage columns to `public.artifacts`.

## Security posture

The chat route spends AI Gateway credits. Before production/private daily use:

1. Add authentication.
2. Add rate limiting.
3. Apply and verify RLS policies.
4. Keep Supabase service role usage server-only.
5. Require explicit approval for GitHub, Supabase, Notion, email, and calendar writes.

## Context files

Future agents should read:

- `context/Memory.md`
- `context/Claude.md`
- `context/INSTRUCTIONS.md`

These define product purpose, safety boundaries, object names, and validation expectations.
