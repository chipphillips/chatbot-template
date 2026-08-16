# MAX Workflow Previews

**Status:** VISUAL QA EVIDENCE

The preview material shows the intended shell and workflow surfaces before remote Supabase configuration. The execution environment used for this pass blocks headless Chromium navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`, so the supplied visual is a faithful QA render based on the implemented information architecture, component structure, copy, and responsive rules, not a pixel-for-pixel browser screenshot.

Development-only preview routes are included for exact local browser capture and must return 404 in production.

## Surfaces

- Sign in — Google + email-link auth direction.
- Chat start — empty-state chat and persistent composer.
- Interactive review — ask-user, preflight feedback, knowledge review, artifact context.
- Library — founder-scale unified durable work inventory.
- Settings — Setup Health / integration truth state.
- Mobile chat — one primary surface and composer direction.
- Mobile Library — mobile durable-work hierarchy.
- Onboarding — short first-run flow.

## Local exact-capture routes

Run the app and visit `/preview/login`, `/preview/chat`, `/preview/review`, `/preview/library`, `/preview/agents`, `/preview/tasks`, `/preview/knowledge`, `/preview/settings`, and `/preview/onboarding`.
