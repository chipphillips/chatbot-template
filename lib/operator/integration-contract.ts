export const CANONICAL_RUNTIME = {
  id: "ai-sdk-ui-message",
  name: "AI SDK UIMessage runtime",
  summary:
    "AI SDK UIMessage, typed tool parts, custom data parts, and createUIMessageStreamResponse are the single message/UI spine for this app.",
} as const

export const SINGLE_RUNTIME_RULES = [
  "Persist and render conversational state as AI SDK UIMessage parts, not parallel transcript objects.",
  "Represent forms, artifacts, knowledge proposals/reviews, connector actions, and agent progress as typed tool parts or typed data parts.",
  "Use ChatKit and other widget libraries as design references or adapter targets, not as a second live runtime.",
  "All future side-effecting tools must use the installed AI SDK native tool execution approval mechanism before execute can run.",
  "Do not add LangGraph, ChatKit, AI SDK RSC, or another orchestration runtime without an explicit architecture decision.",
] as const

export const KNOWLEDGE_REVIEW_DOMAINS = [
  "constructiv",
  "wilson",
  "blue_hen",
  "kas",
  "design_system",
  "business_canon",
  "personal",
] as const
