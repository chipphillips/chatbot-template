type InsertResult<T> =
  | { enabled: false; data: null; error: null; reason: string }
  | { enabled: true; data: T[] | null; error: string | null; reason?: never }

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const RUNTIME_USER_ID = process.env.SUPABASE_RUNTIME_USER_ID
const PERSISTENCE_ENABLED = process.env.SUPABASE_PERSISTENCE_ENABLED === "true"

export function isSupabasePersistenceEnabled() {
  return Boolean(PERSISTENCE_ENABLED && SUPABASE_URL && SERVICE_ROLE_KEY)
}

export function getSupabaseRuntimeUserId() {
  return RUNTIME_USER_ID || null
}

export function disabledPersistence<T extends Record<string, unknown>>(
  reason: string
): InsertResult<T> {
  return {
    enabled: false,
    data: null,
    error: null,
    reason,
  }
}

export async function insertSupabaseRecord<T extends Record<string, unknown>>(
  table: string,
  payload: Record<string, unknown>
): Promise<InsertResult<T>> {
  if (!PERSISTENCE_ENABLED) {
    return disabledPersistence(
      "Supabase persistence is disabled. Set SUPABASE_PERSISTENCE_ENABLED=true to write runtime records."
    )
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return disabledPersistence("Supabase URL or service role key is missing.")
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "content-type": "application/json",
        prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    })

    const text = await response.text()
    const data = text ? (JSON.parse(text) as T[]) : null

    if (!response.ok) {
      return {
        enabled: true,
        data,
        error: `Supabase insert failed for ${table}: ${response.status} ${response.statusText}`,
      }
    }

    return { enabled: true, data, error: null }
  } catch (error) {
    return {
      enabled: true,
      data: null,
      error: error instanceof Error ? error.message : "Unknown Supabase persistence error",
    }
  }
}
