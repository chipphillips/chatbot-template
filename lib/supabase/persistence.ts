import "server-only"

/**
 * Runtime persistence is intentionally not implemented in PR #1.
 *
 * User-owned writes must eventually use a verified Supabase Auth session/JWT so
 * RLS remains authoritative. Do not reintroduce service-role writes here for
 * normal chat, artifact, task, approval, or message persistence.
 */
export function runtimePersistenceStatus() {
  return {
    enabled: false as const,
    reason:
      "Runtime persistence is not wired until authenticated RLS access is implemented.",
  }
}
