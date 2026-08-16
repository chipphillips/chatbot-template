import { NextResponse } from "next/server"

import {
  isPrivateAccessConfigured,
  matchesFounderAccessKey,
  PRIVATE_SESSION_COOKIE,
} from "@/lib/auth/private-session"

export async function POST(req: Request) {
  if (!isPrivateAccessConfigured()) {
    return NextResponse.json(
      { error: "Private access is not configured." },
      { status: 503 }
    )
  }

  let accessKey = ""
  try {
    const body = (await req.json()) as { accessKey?: unknown }
    accessKey = typeof body.accessKey === "string" ? body.accessKey : ""
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!matchesFounderAccessKey(accessKey)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(PRIVATE_SESSION_COOKIE, accessKey, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(PRIVATE_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
  return response
}
