# Master Execution Prompt

Work in `chipphillips/chatbot-template` only after PR #1 and PR #2 have been resolved in order.

1. Fetch current remote state and verify the exact heads of `main`, PR #1, PR #2, and `feat/founder-console-product-shell`.
2. Rebase the product-shell branch onto updated `main`; do not merge.
3. Read `context/Memory.md`, `context/Claude.md`, `context/INSTRUCTIONS.md`, all five ADRs, `docs/handoff/`, and `artifacts/validation/` before changing code.
4. Preserve AI SDK `UIMessage` plus typed tool/data parts as the single conversation runtime. Do not introduce ChatKit, AI SDK RSC/streamUI, LangGraph/LangChain conversation ownership, or a detached transcript state machine.
5. Complete the Supabase Auth cutover for the root chat. Derive user identity server-side from verified Supabase Auth, protect pages and APIs, and keep RLS authoritative. Do not trust body `user_id`. Do not use service-role credentials for normal user-owned runtime writes.
6. Validate the migration only against local Supabase. Do not link, push, reset, or mutate a remote Supabase project.
7. Finish authenticated thread/message persistence and conversation rename/archive/delete/fork lineage while preserving full `UIMessage.parts` round-trip fidelity.
8. Keep external mutations behind AI SDK native execution approval on the exact mutating tool call. Advisory preflight cards remain advisory only.
9. Run formatting, typecheck, lint, tests, build, local Supabase reset/RLS tests, critical responsive smoke tests, and accessibility checks. Do not weaken tests to make them pass.
10. Update `artifacts/validation/` with exact commands, exit codes, and any remaining skipped validation.
11. Update screenshots from the development-only preview routes and real authenticated runtime routes once local credentials are configured.
12. Stop before merge and report exact merge readiness, remaining risks, and the safest next action.
