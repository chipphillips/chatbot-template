# ADR 004: Voice Architecture

Status: ACCEPTED
Date: 2026-08-16

## Context

MAX needs two different voice experiences: ordinary dictation that produces editable composer text, and a low-latency live conversation mode. Both must preserve authentication, avoid exposing provider credentials, reconcile into the canonical thread, and pause safely for tool feedback or approvals.

## Decision

Treat dictation and live voice as separate interaction modes behind one conversation and artifact model.

## Ordinary dictation

1. The browser requests microphone permission only after an explicit user action.
2. `MediaRecorder` captures a short audio blob in memory.
3. The client sends the blob to an authenticated server transcription route.
4. The server validates size and media type, then calls the configured transcription provider.
5. The returned text is inserted into the composer for editing.
6. The user explicitly sends the message.

Raw microphone audio is not written to Postgres or Storage by default. Temporary request bytes are released after transcription.

The first provider adapter uses the current AI SDK/OpenAI transcription contract when configured. Provider choice remains an adapter detail.

## Live voice

Use OpenAI Realtime over WebRTC for browser sessions.

- The permanent OpenAI API key remains server-only.
- The browser obtains only a server-created ephemeral/session contract or uses a server-mediated WebRTC offer flow.
- The UI represents explicit states: idle, requesting permission, connecting, listening, speaking, interrupted, awaiting approval, reconnecting, ended, and error.
- The user can mute, interrupt, end, and return to the normal thread.
- Live transcript events are reconciled into canonical thread messages before durable persistence.
- A live session is never a second transcript owner.
- Tool events enter the same typed-tool system. External mutations pause for AI SDK native approval on the exact executing tool call.

## Delivery boundary

The branch must implement:

- ordinary dictation and its error states;
- authenticated Realtime session contracts;
- a live-mode UI state machine;
- transcript reconciliation interfaces;
- honest setup-health reporting.

A complete provider-backed live session is marked DEFERRED when it cannot be tested safely without configured credentials. The UI must not claim that live voice is connected in that state.

## Error and privacy behavior

- Permission denial explains how to retry without trapping the user.
- Unsupported browsers receive a clear fallback to typing.
- Recording can be cancelled before upload.
- Transcription failure preserves the existing composer draft.
- Audio is never retained unless a future, separately approved feature explicitly requires it.
- Ending live mode returns the user to the same thread with reconciled transcript content.

## Rejected alternatives

- Sending a permanent provider key to the browser.
- Treating dictation as an automatically sent message.
- Keeping live transcripts in a separate application or database model.
- Persisting raw microphone recordings by default.
- Simulating connection, waveform, or agent activity without a real transport state.

## Consequences

### Positive

- Dictation remains predictable and editable.
- Live voice can evolve without replacing the chat runtime.
- Privacy and credential boundaries are explicit.

### Tradeoffs

- WebRTC and transcript reconciliation require more state handling than a simple audio upload.
- Provider-backed end-to-end tests require a separately configured environment.

## Validation

- Dictation tests cover permission denial, recording, cancel, loading, success, and failure.
- API tests reject unauthenticated, oversized, and unsupported uploads.
- Source tests prove permanent OpenAI credentials never enter client bundles.
- Live-state tests cover connection, interruption, approval pause, end, and transcript handoff.
