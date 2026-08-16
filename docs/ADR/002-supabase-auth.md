# ADR 002: Supabase Authentication and Authorization

Status: ACCEPTED
Date: 2026-08-16

## Context

The current application uses a temporary deployment access key. The product requires durable browser sessions, Google and email sign-in, protected pages and APIs, per-user persistence, and an ownership boundary that remains valid when additional users are introduced later.

## Decision

Use Supabase Auth with the current Next.js App Router SSR pattern.

- Add `@supabase/supabase-js` and `@supabase/ssr`.
- Create separate browser and server clients.
- Use PKCE for OAuth and email-link flows.
- Store and refresh sessions through secure cookies.
- Use `proxy.ts` for token refresh and optimistic route redirection, not as the sole authorization layer.
- Resolve verified claims or an authenticated user on the server before protected reads and writes.
- Enforce ownership again through Postgres row-level security.
- Derive `user_id` from the verified session. Never accept it from a request body.
- Use the caller's authenticated Supabase client for normal user-owned runtime writes.
- Do not use a service-role key for conversations, messages, artifacts, tasks, knowledge, approvals, preferences, or onboarding.
- Sanitize post-auth redirect targets to application-relative paths.
- Gate protected layouts on the server so protected content is never rendered before identity is known.

## Sign-in methods

### Primary

- Continue with Google.
- Continue with email through a magic link or one-time code.

### Deferred

Email/password is not required for the first private-founder release. It may be added only after recovery, password-reset, and abuse controls are designed and tested.

## Session behavior

- Sessions persist across browser restarts according to Supabase session-cookie behavior.
- Expired or revoked sessions return the user to sign-in with a safe `next` path.
- OAuth and email callbacks exchange the authorization code on a server route.
- Logout clears the authenticated session and returns to sign-in.
- The app renders a deterministic session-restoration state rather than flashing protected UI.

## Environment contract

Required when authentication is enabled:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`

Optional provider settings are documented separately. `.env.example` contains placeholders only and no real credentials.

## Rejected alternatives

- Retaining the founder access key as the product authentication mechanism.
- Trusting an unverified cookie payload in route handlers.
- Using `proxy.ts` as the only authorization check.
- Normal runtime writes through a server service-role client.
- Accepting a caller-provided `user_id`.

## Consequences

### Positive

- Authentication, server authorization, and database ownership reinforce one another.
- The same architecture supports the founder today and additional explicitly invited users later.
- Sessions survive navigation and browser restarts without bespoke token storage.

### Tradeoffs

- Local development needs Supabase Auth configuration or an explicit test harness.
- OAuth redirect URLs must be configured for each environment.

## Validation

- Unauthenticated page and API requests are rejected or redirected.
- Auth callbacks reject unsafe redirect targets.
- Server writes ignore or reject body-supplied identity.
- RLS tests prove one authenticated user cannot read or mutate another user's rows.
- Source-boundary tests prove normal runtime code does not reference a service-role key.
