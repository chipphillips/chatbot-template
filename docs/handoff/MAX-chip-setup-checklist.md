# Chip Setup Checklist

When doing the separate offline configuration session:

1. Copy `.env.example` to `.env.local`.
2. Set the Supabase project URL and public publishable/anon key.
3. Configure Google OAuth in Supabase Auth.
4. Configure email magic-link redirect URLs and templates.
5. Add localhost and production callback/redirect URLs deliberately.
6. Configure the AI Gateway/provider key used by chat.
7. Configure `OPENAI_API_KEY` only if dictation is enabled.
8. Leave Realtime live voice disabled until the WebRTC implementation and security tests are complete.
9. Run `pnpm doctor` and reconcile every reported missing capability.
10. Run local Supabase only, then `supabase db reset` and RLS isolation tests before considering a remote migration.
11. Never put `SUPABASE_SERVICE_ROLE_KEY` in a `NEXT_PUBLIC_*` variable or use it for normal user-owned runtime writes.
12. After auth cutover, verify browser restart/session restoration, logout, revoked-session recovery, protected pages, and protected APIs.
