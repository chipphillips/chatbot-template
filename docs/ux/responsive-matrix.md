# Responsive Behavior Matrix

Status: ACCEPTED
Date: 2026-08-16

The matrix defines expected behavior at the required validation widths. Breakpoints may be adjusted during implementation when content failure is demonstrated, but the behavioral guarantees may not be weakened.

| Viewport | Navigation | Primary workspace | Context and artifacts | Composer and input | Validation focus |
| --- | --- | --- | --- | --- | --- |
| 320 px | Hidden behind a labeled menu drawer. No collapsed desktop rail. | One full-width route with compact 16 px gutters and no horizontal overflow. | Full-height sheet or dedicated route. Never beside chat. | Sticky above `env(safe-area-inset-bottom)`; attachment action sheet; controls remain at least 44 px where practical. | Long titles, 200% text zoom, virtual keyboard, drawer focus trap, safe area, no hover dependency. |
| 375 px | Mobile drawer with recent conversations and workspaces grouped clearly. | One primary surface; message actions disclose on tap or keyboard focus. | Full-height sheet with close and browser-back support. | Auto-growing textarea, dictation/live states, removable attachment previews. | iPhone-sized keyboard behavior, stop/send replacement, attachment overflow. |
| 390 px | Same mobile model; remember no persistent-width preference here. | Readable transcript width with 16–20 px gutters. | Sheet may expose artifact actions in a sticky header. | Safe-area-aware bottom padding; no overlap with transcript end. | Common iPhone width, landscape recovery, focus restoration. |
| 430 px | Mobile drawer; optional wider drawer but no permanent rail. | One primary surface with slightly larger gutters. | Sheet or route; visual artifacts may use full width. | Progressive controls remain compact and do not wrap into an unusable second row. | Largest phone width, long model/project labels, large attachments. |
| 768 px | Drawer or collapsible rail according to content fit. Default remains closed when chat needs the width. | Tablet workspace with constrained reading column. | Overlay panel or sheet; no permanent context if it reduces readable chat width. | Sticky composer with keyboard shortcuts available to hardware keyboards. | Tablet portrait, drawer versus rail transition, overlay ownership, rotation. |
| 1024 px | Collapsible navigation rail or compact sidebar. State may persist per user. | Primary column remains dominant and readable. | Context defaults to overlay/collapsed; may dock only when content still meets minimum width. | Persistent composer aligned to reading column, not total shell width. | Tablet landscape/small laptop, collapse transitions, no double scrollbars. |
| 1280 px | Persistent sidebar, approximately tokenized 248–272 px expanded or compact rail collapsed. | Center workspace with maximum readable width and flexible gutters. | Optional docked panel, approximately 336–384 px, only when active. | Composer aligns to transcript and remains visible during long threads. | Three-region grid, sidebar preference, open/close context, keyboard navigation. |
| 1440 px | Persistent/collapsible desktop navigation. | Center remains constrained rather than stretching text. | Docked context can show artifact, sources, review, or agent detail. | Same interaction density as 1280 px; extra width becomes whitespace or context, not longer lines. | Representative desktop screenshots, panel hierarchy, line length. |
| 1728 px | Persistent navigation with stable dimensions. | Center maximum width remains bounded; larger outer gutters absorb excess. | Context may expand modestly within token limits but does not dominate. | Composer remains centered on the conversation. | Wide-screen balance, no dashboard-card filling, no arbitrary stretching. |

## Cross-width invariants

- No horizontal page overflow.
- The transcript or route content has exactly one vertical scroll owner.
- Opening navigation or context traps focus and restores it on close.
- Browser back closes route-backed overlays or returns predictably.
- No control is available only on hover.
- Visible focus remains inside the viewport.
- Reduced motion removes nonessential transitions.
- Protected content is gated before render.
- Loading, empty, no-results, error, offline, and setup-required states fit each width.
- Sidebar preference is persisted only for layouts where a sidebar exists.

## Representative screenshot set

Capture after functional validation:

- 390 × 844: mobile chat with drawer closed and composer visible.
- 390 × 844: mobile navigation drawer.
- 768 × 1024: tablet Library or chat with context overlay.
- 1024 × 768: compact desktop/tablet landscape shell.
- 1440 × 1000: desktop chat with contextual artifact panel.
- 1728 × 1117: wide desktop Library or chat without stretched reading lines.

Screenshots must be generated from a running validated build using deterministic local fixtures or an authenticated local test harness. They are evidence, not substitutes for interaction tests.
