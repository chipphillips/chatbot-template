# ADR 001: Single Conversational Runtime

Status: ACCEPTED
Date: 2026-08-16

## Context

The repository already uses AI SDK 7 `UIMessage` with typed tool parts for streaming text, structured questions, preflight feedback, knowledge review, draft artifacts, draft agent tasks, and provider-native search. The product needs persistence, richer navigation, multimodal inputs, live voice, and future external adapters without creating competing owners of conversation state.

## Decision

AI SDK `UIMessage` remains the only canonical conversational runtime and stored transcript representation.

- Persist validated `UIMessage` objects and their parts.
- Derive tool cards, forms, approvals, knowledge review, artifacts, and agent activity from typed parts.
- Use an AI SDK transport keyed by authenticated thread ID.
- Treat `ModelMessage` as a model-facing conversion, not stored UI state.
- Keep live voice, transcription, retrieval, image generation, connectors, and external providers behind adapters that return to the same thread and artifact model.
- Any external mutation must use AI SDK native execution approval on the exact tool call that would execute the mutation.
- The existing `request_approval` tool remains advisory preflight feedback only.

## Rejected alternatives

- ChatKit as a second live chat runtime.
- AI SDK RSC or `streamUI` as another transcript owner.
- LangChain or LangGraph as the owner of message state.
- A bespoke tool-lifecycle store that cannot round-trip through `UIMessage.parts`.
- A separate live-voice transcript that is not reconciled into the thread.

## Consequences

### Positive

- One deterministic state model for rendering, persistence, reload, fork, audit, and approval.
- Typed forms and tool states survive navigation and session restoration.
- Future adapters can change without replacing the product shell.

### Tradeoffs

- Persistence and fork logic must preserve part IDs, tool-call IDs, metadata, and ordering.
- Realtime audio events require an explicit reconciliation layer before becoming durable thread messages.

## Validation

- Tests assert that chat persistence stores and reloads validated `UIMessage` data.
- Tests assert that no second runtime dependency or transcript table is introduced.
- Mutating tool tests assert native AI SDK approval on the executing call.
