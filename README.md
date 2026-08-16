# Founder Operator Console / MAX

MAX is a private AI operating console for a solo founder. The product combines a conversational command surface with durable work inventory, artifacts, approvals, knowledge review, visible delegation, and responsive mobile interaction.

## Architectural invariant

AI SDK `UIMessage` plus typed tool/data parts is the single conversational runtime. Do not introduce a second transcript or another owner of tool lifecycle state.

## Current branch direction

This product-shell branch adds:

- Supabase SSR authentication architecture using PKCE and cookie-backed sessions
- responsive desktop/tablet/mobile MAX shell
- layered system-prompt composition
- onboarding and Setup Health surfaces
- founder-scale Library architecture
- attachment/image-generation data contracts
- ordinary dictation architecture
- local-only migration/RLS scaffolding
- component map, ADRs, doctor tooling, CI quality checks, and visual QA preview routes

The inherited root `/` chat still requires final auth cutover from the temporary private-session mechanism before this branch should be treated as merge-ready.

## Local development

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm doctor
pnpm dev
```

Then use the real application routes after configuring local Supabase Auth. For visual review without credentials during development, visit `/preview`. Preview routes use fixture data, never write to Supabase, and return 404 in production.

## Safety rules

- Do not commit secrets.
- Do not link, push, reset, or mutate a remote Supabase project from this branch without explicit approval.
- Normal user-owned runtime writes must use verified Supabase Auth plus RLS, not a service-role key.
- Do not trust `user_id` from request bodies for authorization.
- External mutation tools must use AI SDK native execution approval on the exact mutating tool call.
- Do not merge this branch until PR #1 and PR #2 are resolved and this branch is rebased and revalidated.

## Handoff and evidence

Start with:

- [`docs/handoff/README.md`](docs/handoff/README.md)
- [`docs/getting-started.md`](docs/getting-started.md)
- [`docs/ux/workflow-previews.md`](docs/ux/workflow-previews.md)
- [`artifacts/validation/founder-console-validation.json`](artifacts/validation/founder-console-validation.json)
- [`artifacts/live-state/github-branch-state.md`](artifacts/live-state/github-branch-state.md)

Future coding agents must also read:

- `context/Memory.md`
- `context/Claude.md`
- `context/INSTRUCTIONS.md`
