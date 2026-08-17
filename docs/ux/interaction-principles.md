# Interaction Principles

Status: ACCEPTED
Date: 2026-08-16

These principles translate the product intent and Mobbin research into implementation constraints for MAX.

## 1. One dominant task

Every route must make its primary action and primary scroll surface obvious. Chat prioritizes the transcript and composer. Library prioritizes retrieval. Knowledge prioritizes review. Settings prioritizes configuration. Secondary context must not compete for attention.

## 2. Progressive disclosure

Keep frequent actions visible and move infrequent or advanced controls behind menus, drawers, sheets, or contextual panels. The composer permanently exposes typing, attachment entry, dictation, live voice, and send or stop. Model, search, and advanced capability controls may disclose contextually.

## 3. Recognition over recall

Use stable navigation names, project labels, type icons with text, visible filter chips, recent conversations, saved views, and message-local actions. Shortcuts accelerate known actions but never replace discoverable controls.

## 4. Literal system status

Streaming, waiting for tool input, awaiting approval, transcribing, connecting voice, agent task state, persistence failure, and integration setup must be visibly distinct. Do not use animation or optimistic language to imply work that has not begun or completed.

## 5. Exact scope and lineage

Forks, artifacts, approvals, knowledge reviews, attachments, shares, and mutations must identify what they apply to. A fork records its parent thread and source message. A future mutation approval belongs to the exact executing tool call.

## 6. Error prevention before recovery

Validate destructive actions, unsafe redirects, attachment limits, unsupported formats, and tool inputs before execution. Use confirmation for irreversible delete operations. Preserve drafts when network, transcription, or streaming operations fail.

## 7. Recoverable errors

Errors must explain what happened, what remains safe, and the next valid action. Retry must not duplicate durable messages or tool effects. Expired authentication returns to the requested internal route after successful sign-in.

## 8. Founder-scale information density

Optimize for one operator managing several projects. Prefer compact lists, readable metadata, and useful grouping over dashboards, decorative cards, or enterprise administration. Every persistent panel must earn its width.

## 9. One canonical conversational state

The rendered transcript, persisted transcript, inline forms, approvals, tool status, and fork source all derive from validated AI SDK `UIMessage` data. No detached form or tool lifecycle may become a competing transcript.

## 10. Context without concealment

Artifacts and source activity may use a right panel on wide screens and a sheet or route on smaller screens. Important work must remain readable and addressable outside raw tool JSON.

## 11. Accessible by default

- Visible focus on every interactive control.
- Keyboard operation for navigation, menus, dialogs, drawers, and message actions.
- Labeled controls and dialog titles.
- Focus containment and restoration for overlays.
- Reduced-motion support.
- Semantic status announcements for streaming and async work.
- Practical WCAG AA contrast and readable line lengths.
- Touch targets of at least 44 px where practical on mobile.

## 12. Predictable spatial behavior

Use one vertical scroll owner per surface. The composer remains stable while the transcript scrolls. Drawers and sheets do not shift content unpredictably. Back closes the current overlay or returns to the prior route according to platform expectations.

## 13. Calm visual hierarchy

Use restrained surfaces, borders, shadows, typography, and semantic status colors. Avoid random gradients, glassmorphism, excess pills, huge work-surface headings, unexplained icons, and motion that competes with reading.

## 14. Honest capability boundaries

Unconfigured voice, search, storage, image generation, connectors, or agents render as unavailable or setup-required. Draft assignments are labeled draft. Queued, running, needs review, complete, and blocked states are shown only when backed by real state transitions.

## 15. Measure UX through behavior

A screenshot is insufficient evidence. Tests must exercise authentication restoration, streaming, stop, retry, tool feedback, navigation, filters, forking, dictation errors, focus management, and mobile overlays. Representative screenshots supplement interaction validation rather than replacing it.
