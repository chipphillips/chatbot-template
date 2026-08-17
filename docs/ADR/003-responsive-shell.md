# ADR 003: Responsive Application Shell

Status: ACCEPTED
Date: 2026-08-16

## Context

The current chat uses a single content column plus a fixed 380 px desktop sidebar. The product needs persistent founder navigation, an optional context/artifact surface, predictable mobile behavior, and one coherent layout from 320 px through wide desktop displays.

## Decision

Build a mobile-first shell with three conceptual regions and only one mandatory region.

1. **Navigation**: persistent or collapsible on desktop; an accessible drawer on mobile and smaller tablets.
2. **Primary workspace**: always present and owns the main route or conversation surface.
3. **Context**: optional on desktop; overlay, sheet, or dedicated route on smaller displays.

### Mobile

- Present one primary surface at a time.
- Open navigation and attachments in accessible drawers or sheets.
- Open artifacts/context in a full-height sheet or dedicated route.
- Keep the composer sticky, safe-area aware, and resilient to the virtual keyboard.
- Provide at least 44 px interactive targets where practical.
- Do not depend on hover or horizontal scrolling.
- Preserve browser and application back-navigation semantics.

### Tablet

- Use a collapsible navigation rail or drawer.
- Treat context as an overlay unless sufficient readable width remains.
- Preserve the same route hierarchy used on desktop.

### Desktop

- Use persistent navigation with a remembered collapsed state.
- Keep the primary reading width constrained even when the viewport grows.
- Show context only when an artifact, source, review, or activity surface is useful.
- Start with tokenized widths and CSS grid. Resizing may be added only after accessibility and persistence are validated without requiring an unnecessary package.

## Layout invariants

- Exactly one vertical scroll owner per primary surface.
- No protected content flash during authentication restoration.
- No composer overlap with messages, safe areas, or mobile keyboards.
- No desktop panel is merely squeezed into a narrow viewport.
- Focus is moved into opened drawers/dialogs and restored when they close.
- Reduced-motion preferences disable nonessential transitions.

## Breakpoint strategy

Behavior is tested at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1728 px. Breakpoints are chosen by content failure, not device labels.

## Rejected alternatives

- A desktop-only three-column grid with hidden overflow on mobile.
- Permanently visible secondary panels at every width.
- Hover-only message or navigation actions.
- Arbitrary one-off width values throughout JSX.

## Consequences

### Positive

- The same information architecture works across devices without changing mental models.
- The conversation remains the dominant mobile task.
- Optional context adds density only when the display can support it.

### Tradeoffs

- Some desktop context actions become a second tap on mobile.
- Responsive behavior requires explicit interaction tests, not screenshot-only review.

## Validation

- Automated viewport smoke tests cover navigation, context, composer, focus traps, and overflow.
- Manual or captured evidence covers the required representative widths.
- Keyboard-only and reduced-motion checks are included in the validation receipt.
