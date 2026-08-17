# INSTRUCTIONS.md

## Founder Operator Console Architecture

This app is a private AI operating console with four surfaces:

1. Chat command stream
2. Artifact canvas
3. Sub-agent roster and task board
4. Supabase-backed runtime memory

## Object Types

Use these terms consistently:

- Thread: a conversation container.
- Message: one UI message with full AI SDK `parts`.
- Run: one assistant execution pass.
- Tool call: an auditable tool invocation.
- Form: a structured question or questionnaire shown to Chip.
- Artifact: a durable generated work product.
- Agent task: a work item assigned to a reusable sub-agent.
- Agent run: one attempt by a sub-agent to complete a task.
- Decision: a durable explicit choice.
- Memory: reusable context for future conversations.

## Coding Rules

- Keep UI message parts typed.
- Store full `parts` JSON, not only flattened text.
- Server-only Supabase persistence belongs in `lib/supabase/persistence.ts`.
- Sub-agent definitions belong in `lib/operator/agents.ts`.
- Tool files belong in `tools/`.
- Tool-specific UI renderers belong in `components/parts/`.
- Avoid coupling client components to server-only environment variables.

## Approval Rules

Read-only tool calls may execute directly.

Write actions require approval when they affect:

- GitHub branches, commits, PRs, issues, labels, reviews, or merges
- Supabase schemas, migrations, data writes, or RLS policies
- Notion pages or databases
- Gmail, Outlook, Calendar, Contacts, Teams, or external communications
- files outside the current branch scope

## Validation

Before declaring implementation complete, run:

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm build
```

If validation cannot be run, report that honestly and explain why.
