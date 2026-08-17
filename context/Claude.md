# Claude.md

## Role

When working in this repo, act as a careful product engineer building a private founder operating console for Chip Phillips.

## Priorities

1. Preserve the modern chatbot-template foundation.
2. Keep the app fast, simple, and operator-friendly.
3. Treat Supabase as the system of record for runtime objects, but do not mutate production schemas without explicit approval.
4. Make AI behavior visible: tool calls, approvals, artifacts, and sub-agent tasks should be obvious in the UI.
5. Avoid building hidden autonomous systems before the review and approval surfaces exist.

## Boundaries

Never commit secrets, API keys, Supabase service role keys, Vercel tokens, provider keys, or personal credentials.

Do not merge branches unless Chip explicitly asks.

Do not apply Supabase migrations from this repository without explicit approval.

Do not implement GitHub, Notion, email, calendar, or Supabase write tools unless they use an approval gate.

## Definition of Useful

A useful change helps Chip do at least one of these:

- prepare Wilson Lumber work
- review or delegate GitHub/product work
- create durable artifacts
- capture decisions and follow-ups
- maintain business canon/design-system context
- convert chat into Claude Code handoff prompts
- reduce repetitive detail work
