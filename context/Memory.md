# Memory.md

## Product Memory

This repository is being adapted into Chip Phillips' private Founder Operator Console: a personal AI assistant for solo-founder execution across Constructiv AI, Wilson Lumber onboarding, Blue Hen analytics work, KAS/canon work, design-system work, and relationship follow-through.

The app should not behave like a generic public chatbot. It should help Chip turn messy context into durable objects:

- conversations
- messages
- tool calls
- artifacts
- forms
- agent tasks
- agent runs
- decisions
- memories
- follow-ups
- prompts

## Operating Model

The main interaction model is:

1. Chip chats naturally.
2. The assistant streams responses and visible tool-call state.
3. Important outputs become artifacts, tasks, decisions, prompts, follow-ups, or memories.
4. Sub-agents are visible and assignable, but execution remains reviewable.
5. Any external write action requires an explicit approval pattern.

## Current Foundation

The base repo already provides:

- Next.js app router
- AI SDK chat route
- Vercel AI Gateway model routing
- typed tool parts
- provider-native web search
- human-in-the-loop `ask_user` questionnaire
- shadcn/react and Base UI components

## Supabase Principle

Do not hard-code secrets.

Supabase persistence is opt-in through environment variables. Migrations live in source control, but migrations are not applied automatically from this repo unless Chip explicitly runs them.

Runtime writes should remain disabled unless:

```bash
SUPABASE_PERSISTENCE_ENABLED=true
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

For browser/public use, prefer anon-key + RLS. For server-only tool persistence, service role may be used carefully behind authenticated routes and allowlisted server tools.
