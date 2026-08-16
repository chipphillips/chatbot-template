# MAX Current-State Assessment

## Current branch

`feat/founder-console-product-shell` is intentionally stacked after PR #2. Do not merge it before PR #1 and PR #2 are resolved and this branch is rebased onto updated `main`.

## Implemented in the local product-shell pass

- Supabase SSR auth helpers, PKCE-oriented browser client, cookie-backed server client, callback and sign-out routes.
- Development setup route for missing Supabase configuration.
- Responsive MAX app shell with persistent/collapsible desktop navigation and mobile dialog navigation.
- Founder-scale Library surface and search API contract.
- Onboarding flow and profile/onboarding schema scaffolding.
- Setup Health surface.
- Dictation endpoint architecture and reusable voice button.
- Layered prompt files plus prompt composition registry.
- Product-shell migration draft for profiles, workspaces, saved views, attachments, image generation, thread lineage, and related fields.
- Component map, ADRs, architecture docs, getting-started docs, doctor tooling, CI quality workflow, and development-only visual QA preview routes.

## Important inherited gap

The existing root `/` chat still uses the temporary private-session access-key boundary. The Supabase-authenticated shell has not yet replaced that root chat boundary end-to-end. Treat full auth cutover as remaining integration work, not completed work.

## Remote safety

No production Supabase project was linked, reset, migrated, or written to in this pass. No secrets were committed.
