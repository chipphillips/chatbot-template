import "server-only"

import { timingSafeEqual } from "node:crypto"

export const PRIVATE_SESSION_COOKIE = "founder_console_session"

function configuredAccessKey() {
  return process.env.FOUNDER_CONSOLE_ACCESS_KEY ?? ""
}

export function isPrivateAccessConfigured() {
  return configuredAccessKey().length >= 32
}

export function matchesFounderAccessKey(candidate: string | undefined | null) {
  const expected = configuredAccessKey()
  if (expected.length < 32 || !candidate) return false

  const expectedBuffer = Buffer.from(expected)
  const candidateBuffer = Buffer.from(candidate)
  if (expectedBuffer.length !== candidateBuffer.length) return false

  return timingSafeEqual(expectedBuffer, candidateBuffer)
}

export function hasValidPrivateSession(cookieValue: string | undefined | null) {
  return matchesFounderAccessKey(cookieValue)
}
