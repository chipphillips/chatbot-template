import { cookies } from "next/headers"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  validateUIMessages,
} from "ai"

import { consumePrivateRateLimit } from "@/lib/auth/rate-limit"
import {
  hasValidPrivateSession,
  PRIVATE_SESSION_COOKIE,
} from "@/lib/auth/private-session"
import { DEFAULT_MODEL, isModelAllowed } from "@/lib/models"
import { buildFounderOperatorSystemPrompt } from "@/lib/operator/system-prompt"
import { getTools, type ChatUIMessage } from "@/tools"

export const maxDuration = 30

const MAX_OUTPUT_TOKENS = 8192

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const sessionValue = cookieStore.get(PRIVATE_SESSION_COOKIE)?.value
  if (!hasValidPrivateSession(sessionValue)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 })
  }

  const rateLimit = consumePrivateRateLimit(sessionValue ?? "anonymous")
  if (!rateLimit.allowed) {
    return Response.json({ error: "Too many requests." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const model = (body as { model?: unknown })?.model
  const modelId = typeof model === "string" ? model : DEFAULT_MODEL

  if (!isModelAllowed(modelId)) {
    return Response.json(
      { error: "Requested model is not available." },
      { status: 400 }
    )
  }

  const tools = getTools(modelId)

  let messages: ChatUIMessage[]
  try {
    messages = await validateUIMessages<ChatUIMessage>({
      messages: (body as { messages?: unknown })?.messages,
      tools: tools as Parameters<typeof validateUIMessages>[0]["tools"],
    })
  } catch {
    return Response.json({ error: "Invalid messages." }, { status: 400 })
  }

  const result = streamText({
    model: modelId,
    system: buildFounderOperatorSystemPrompt(),
    messages: await convertToModelMessages(messages),
    tools,
    stopWhen: isStepCount(5),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    abortSignal: req.signal,
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      sendSources: true,
      onError: () => "Something went wrong. Please try again.",
    }),
  })
}
