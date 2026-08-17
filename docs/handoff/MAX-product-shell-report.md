# MAX Founder Console Product-Shell Report

## Product direction

MAX is being shaped as a quiet, high-density private operating console for one founder. The application should combine a conversational command surface with durable work inventory, explicit approvals, artifacts, knowledge review, and visible delegation without creating a second conversation runtime.

## UX architecture

Desktop uses a persistent left navigation, primary central work surface, and an optional right artifact/context surface. Tablet collapses secondary navigation and context. Mobile uses one primary surface at a time with navigation and context moved into overlays or dedicated screens.

## Runtime architecture

AI SDK `UIMessage` with typed tool/data parts remains the single conversational runtime. External providers remain adapters. Durable database rows are projections for restoration, lineage, search, and inventory, not a competing transcript state machine.

## Auth architecture

The product-shell direction uses Supabase SSR browser/server clients, PKCE, cookie session handling, callback/sign-out routes, verified server identity, and RLS. Normal user-owned writes must not use a service-role key.

## System prompt architecture

System prompt content is separated into explicit immutable layers under `prompts/system/`, then composed with runtime context in this precedence order: authenticated profile, workspace/project, selected agent, durable memory, retrieved knowledge, available tools, conversation, and turn-local context.

## Voice architecture

Ordinary dictation is the near-term implementation: record, transcribe server-side, return editable text to the composer, then let the user choose whether to send. Low-latency Realtime/WebRTC live mode remains deferred until ephemeral credentials, interruption behavior, approvals, transcript reconciliation, and security tests are complete.

## Data model direction

The product-shell migration extends the assistant-owned schema for authenticated profiles, workspaces, onboarding, saved views, attachments, image-generation provenance, conversation lineage/forking, and other durable founder-console objects. It remains a migration draft until local Supabase reset and RLS isolation tests pass.
