import { type InferUITools, type UIDataTypes, type UIMessage } from "ai"

import { askUser } from "./ask_user"
import { createAgentTask } from "./create_agent_task"
import { createArtifact } from "./create_artifact"
import { githubRepo } from "./github_repo"
import { proposeKnowledgeItem } from "./propose_knowledge_item"
import { requestApproval } from "./request_approval"
import { reviewKnowledgeItem } from "./review_knowledge_item"
import { getWebSearch } from "./web_search"

const baseTools = {
  github_repo: githubRepo,
  ask_user: askUser,
  request_approval: requestApproval,
  create_artifact: createArtifact,
  create_agent_task: createAgentTask,
  propose_knowledge_item: proposeKnowledgeItem,
  review_knowledge_item: reviewKnowledgeItem,
}

export function getTools(modelId: string) {
  const webSearch = getWebSearch(modelId)
  return webSearch ? { ...baseTools, web_search: webSearch } : baseTools
}

export type ChatUIMessage = UIMessage<
  unknown,
  UIDataTypes,
  InferUITools<typeof baseTools> & {
    web_search: { input: { query?: string }; output: unknown }
  }
>

export type ChatMessagePart = ChatUIMessage["parts"][number]
export type TextMessagePart = Extract<ChatMessagePart, { type: "text" }>
export type SourceUrlPart = Extract<ChatMessagePart, { type: "source-url" }>
export type GithubRepoToolPart = Extract<ChatMessagePart, { type: "tool-github_repo" }>
export type AskUserToolPart = Extract<ChatMessagePart, { type: "tool-ask_user" }>
export type RequestApprovalToolPart = Extract<ChatMessagePart, { type: "tool-request_approval" }>
export type CreateArtifactToolPart = Extract<ChatMessagePart, { type: "tool-create_artifact" }>
export type CreateAgentTaskToolPart = Extract<ChatMessagePart, { type: "tool-create_agent_task" }>
export type ProposeKnowledgeItemToolPart = Extract<ChatMessagePart, { type: "tool-propose_knowledge_item" }>
export type ReviewKnowledgeItemToolPart = Extract<ChatMessagePart, { type: "tool-review_knowledge_item" }>
export type WebSearchToolPart = Extract<ChatMessagePart, { type: "tool-web_search" }>
