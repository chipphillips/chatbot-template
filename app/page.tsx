import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { Chat } from "@/components/chat"
import { MODELS } from "@/lib/models"
import {
  hasValidPrivateSession,
  PRIVATE_SESSION_COOKIE,
} from "@/lib/auth/private-session"

export const metadata: Metadata = {
  title: "Founder Operator Console",
  description: "Private AI operator console for founder execution.",
}

export default async function Page() {
  const cookieStore = await cookies()
  if (!hasValidPrivateSession(cookieStore.get(PRIVATE_SESSION_COOKIE)?.value)) {
    redirect("/login")
  }

  return <Chat models={MODELS} />
}
