# MAX Visual QA Evidence

These assets make the main MAX workflows reviewable before local setup.

## Evidence status

The current files are **visual QA renders**, not pixel-for-pixel browser screenshots. The execution environment used for this pass blocked headless Chromium navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. The renders are based on the implemented information architecture, component structure, copy, and responsive rules.

When the repo is run locally, capture the exact rendered routes and replace or supplement these files with browser screenshots. Development preview routes should be used only in development and must not expose fixture data in production.

## Surfaces

- `01-login-desktop.svg` — sign-in direction
- `02-chat-start-desktop.svg` — empty chat / composer
- `03-review-desktop.svg` — inline ask-user, approval, knowledge review, artifact context
- `04-library-desktop.svg` — unified durable-work inventory
- `05-settings-desktop.svg` — Setup Health / integration truth state
- `06-chat-mobile.svg` — mobile chat and safe-area composer direction
- `07-library-mobile.svg` — mobile Library hierarchy
- `08-onboarding-mobile.svg` — short first-run onboarding
- `MAX-workflow-contact-sheet.svg` — overview board
