# Security and Truthfulness Audit

- No secret values were intentionally committed.
- Remote Supabase was not linked or mutated.
- Normal user-owned persistence is expected to remain RLS-bound and must not use service-role writes.
- Preview data is fixture data and preview routes must return 404 in production.
- Realtime live voice is not represented as complete.
- Root chat still has an inherited temporary private-session boundary and therefore requires auth cutover before merge readiness.
