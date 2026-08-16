# MAX Interaction Density Policy

## Status

DESIGN SYSTEM POLICY — applies to chat/tool surfaces, review flows, artifacts, tasks, and future integrations.

## Principle

The conversation canvas is a command stream, not a dashboard. Every tool or structured interaction must use the smallest surface that clearly communicates state, consequence, and the next action.

Judge consistency by **task shape and risk**, not by making every tool visually identical.

## Density tiers

### Compact

Use for confirmations, status, tool progress, simple approvals, one-question selections, citations, success/error feedback, and completed interactions.

Target behavior:
- content-constrained or intrinsic sizing where practical
- compact controls rather than CTA-sized buttons
- approximately 40–120px tall in ordinary states
- one dominant next action

### Standard

Use for knowledge review, short forms, task assignment, decision comparison, and artifact previews.

Target behavior:
- approximately 120–240px when content warrants it
- do not stretch merely because the conversation column is wider
- expose only decision-critical information initially
- secondary metadata and rationale use progressive disclosure

### Expanded

Reserve for genuine workspace tasks: artifact editing, detailed proposal review, complex schemas, multi-step configuration, or substantial evidence review.

Expanded work should normally move into the desktop context/artifact panel or a dedicated mobile surface rather than consuming the conversation viewport.

## Sizing rules

1. Inline interaction cards must not default to full-width when their content does not require it.
2. Prefer intrinsic/content-constrained sizing with an accessible maximum width.
3. No card should consume substantially more viewport area than its decision complexity warrants.
4. Buttons inside operational cards are compact controls, not marketing CTAs.
5. Long labels must wrap safely; controls must not clip, collide, overflow, or create horizontal scrolling.
6. Maintain readable line length and predictable vertical rhythm.
7. Mobile layouts may become full available width when required for touch usability, but must remain vertically economical.

## Progressive disclosure

The initial surface should answer:
- What is this?
- Why does it need my attention?
- What is the consequence/risk?
- What is the primary next action?

Evidence, metadata, detailed rationale, history, and secondary controls should expand inline or open in the context surface when needed.

## Completed-state compaction

After a user completes an Ask User, approval, knowledge review, decision, or similar interaction, collapse the interactive surface into a concise one- or two-line summary that remains readable in transcript history.

Example:

`✓ Approved · Publish product-shell branch`

Do not leave the original large interactive controls permanently occupying the transcript.

## Stacking policy

Consecutive pending interaction cards must not become an uncontrolled vertical wall.

Use one of these patterns based on task semantics:
- **Batch:** summarize multiple independent items in a compact review queue.
- **Sequential queue:** show one active decision plus `1 of N` and a count of waiting items when order matters.
- **Grouped status:** collapse related tool progress into one coherent execution group.

Never hide a materially different risk or mutation consequence merely to reduce height.

## Surface allocation

**Conversation canvas:** command, concise result, decision, status, and compact interaction.

**Context/artifact panel:** detailed review, editing, evidence, artifact work, versions, and substantial structured content.

**Dedicated route/surface:** durable inventories, complex configuration, large knowledge collections, and workflows that require sustained navigation.

On mobile, use one primary surface at a time; context becomes an accessible sheet/drawer or dedicated route rather than a squeezed desktop panel.

## Interaction-specific defaults

- Ask User: compact for one question; standard only when multiple inputs genuinely belong together.
- Approval: compact by default; show target system and risk; details are progressive disclosure.
- Knowledge Review: standard summary with confidence/source/target; detailed evidence opens in context.
- Task Creation: compact summary for simple assignment; standard for acceptance criteria/deadline editing.
- Tool Progress: grouped compact status; avoid one card per low-level event.
- Errors: concise explanation plus recovery action; expand diagnostics only on request.
- Completed forms: always compact.

## Quality checks

For each component and breakpoint verify:
- text wrapping and truncation
- button-label fit
- intrinsic/max-width behavior
- vertical rhythm
- touch target size
- keyboard/focus behavior
- no hover-only actions
- loading, streaming, success, warning, error, disabled, and completed states where relevant
- reduced motion
- no horizontal overflow

## Anti-patterns

Do not:
- render every tool call as a large full-width card
- leave completed controls expanded forever
- stack multiple large approvals without batching/queueing
- duplicate detailed artifact content in both chat and context panel
- use oversized buttons for routine operational actions
- make cards visually identical when their task shape and risk differ
- sacrifice risk visibility or accessibility merely to achieve density
