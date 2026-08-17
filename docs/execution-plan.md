# Founder Console Product-Shell Execution Plan

Status: PLANNED
Owner: Chip Phillips
Branch: `feat/founder-console-product-shell`
Base: PR #2 head `53afdcab95691e99db5d7a329dbaab25ff682fee`

## Objective

Turn the existing AI SDK 7 typed-parts prototype into a coherent private founder operating console without replacing its single `UIMessage` runtime or weakening its approval, authentication, or data-ownership boundaries.

## Current-state findings

### IMPLEMENTED

- Next.js 16, React 19, AI SDK 7, typed `UIMessage` tool parts, streaming chat, structured operator questions, preflight feedback, knowledge review, draft artifacts, and draft agent tasks.
- A self-contained `assistant_*` Supabase migration with owner RLS.
- A temporary private-session gate.
- CI for frozen install, typecheck, lint, tests, build, and TypeScript formatting.

### NEEDS CORRECTION

- Both upstream draft PRs pass install, typecheck, lint, tests, and build but fail inherited Prettier checks.
- The current shell is a fixed chat plus 380 px desktop sidebar, with no mobile navigation, thread routes, library, onboarding, or account settings.
- Runtime persistence is intentionally disabled.
- `README.md` no longer matches the actual migration or service-role safety policy.
- The system prompt is one concatenated TypeScript template rather than a tested layered registry.

## Delivery sequence

1. **Decision baseline**
   - Record Mobbin research, interaction principles, responsive matrix, and ADRs.
   - Preserve the single `UIMessage` runtime and exact-tool-call approval rule.

2. **Foundation and developer onboarding**
   - Normalize inherited formatting.
   - Add environment validation, `pnpm doctor`, `.env.example`, setup-health contracts, and accurate docs.
   - Add only justified dependencies.

3. **Supabase Auth and ownership**
   - Add `@supabase/supabase-js` and `@supabase/ssr`.
   - Implement browser/server clients, `proxy.ts` refresh, OAuth and magic-link callback handling, verified server claims, protected pages and APIs, logout, and redirect restoration.
   - Never trust a request-body `user_id`; never use service role for normal user-owned writes.

4. **Data model and persistence**
   - Extend the self-contained migration for profiles, onboarding state, thread lineage, starred/archived flags, artifact versions, knowledge, decisions, prompts, files, and saved library views.
   - Persist validated `UIMessage` objects and load them by authenticated owner.
   - Add local-only RLS and migration tests.

5. **Responsive product shell**
   - Build a mobile-first application shell with desktop navigation, central workspace, optional context panel, tablet collapse behavior, and mobile drawers/sheets.
   - Preserve one primary surface at a time on mobile and safe-area-aware composer behavior.

6. **Core operator workflows**
   - Implement conversation history, rename, star, archive, delete, and message-level forking.
   - Build Library, Agents, Knowledge, Tasks, and Settings/Setup Health routes from real stored records or explicit empty states.
   - Do not simulate autonomous execution or unavailable integrations.

7. **Chat and multimodal controls**
   - Improve message actions, loading, stop/retry/error recovery, attachments, citations, inline typed forms, and artifact context.
   - Implement ordinary dictation through a protected server transcription route without retaining raw audio.
   - Implement the Realtime WebRTC session contract and UI state. Complete live voice only when key-backed testing is possible; otherwise mark the transport adapter DEFERRED.

8. **Validation and evidence**
   - Run frozen install, format, typecheck, lint, tests, build, environment tests, and security-boundary tests.
   - Run local Supabase reset/RLS validation only against local services.
   - Capture representative responsive screenshots from a validated running build.
   - Publish a validation receipt and exact remaining setup checklist.

## Scope controls

- No merge.
- No remote Supabase link, push, reset, or production data access.
- No secrets or invented credentials.
- No second chat runtime, transcript model, or detached tool lifecycle state.
- No fake agents, integrations, notifications, analytics, or persistence.
- No package without a documented compatibility, accessibility, maintenance, license, and necessity justification.

## Definition of done for this branch

The branch is ready for review when:

- The inherited and new code passes all automated validation.
- Authentication and owner authorization are enforced at page, route, and RLS boundaries.
- A user can sign in, restore a session, complete or skip onboarding, start and revisit a conversation, use inline tool feedback, create and reopen an artifact, fork a thread, navigate at required breakpoints, and use ordinary dictation when configured.
- Unconfigured capabilities render honest setup states rather than broken or fake functionality.
- Documentation distinguishes IMPLEMENTED, PLANNED, and DEFERRED behavior.
