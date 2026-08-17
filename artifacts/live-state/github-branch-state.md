# GitHub Branch State

Captured 2026-08-17 after stack stabilization. This is a historical receipt, not a live API source.

- PR #1: `feat/founder-operator-console-foundation` → `main`
  - head at capture: `8ef181ba14923d433b4cb3966e1b3f96555eabc7`
  - exact-head GitHub Actions: PASS
- PR #2: `feat/operator-approval-knowledge-harness` → PR #1 branch
  - head at capture: `3e5c161aedaaede8fbcf9da69db7dbb679e74577`
  - exact-head GitHub Actions: PASS
- PR #3: `feat/founder-console-product-shell` → PR #2 branch
  - integrated head before this receipt commit: `6b0300bf63a1dfb4eef7bbf14d01d19439365c0f`
  - PR #2 exact head was forward-integrated and the integrated tree passed frozen install, typecheck, lint, tests, production build, and Prettier before push

All three PRs remain open drafts. Required merge order remains PR #1 → PR #2 → PR #3. No merge was performed and no remote Supabase project was touched.

Always re-query GitHub before merge, rebase, or retarget operations. Live GitHub state outranks this receipt.
