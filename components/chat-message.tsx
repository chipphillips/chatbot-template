"use client"

import { type ChatUIMessage } from "@/tools"
import { AskUserPart } from "@/components/parts/ask-user-part"
import { CreateAgentTaskPart } from "@/components/parts/create-agent-task-part"
import { CreateArtifactPart } from "@/components/parts/create-artifact-part"
import { GithubRepoPart } from "@/components/parts/github-repo-part"
import { ProposeKnowledgeItemPart } from "@/components/parts/propose-knowledge-item-part"
import { RequestApprovalPart } from "@/components/parts/request-approval-part"
import { ReviewKnowledgeItemPart } from "@/components/parts/review-knowledge-item-part"
import { SourcesPart } from "@/components/parts/sources-part"
import { TextPart } from "@/components/parts/text-part"
import { WebSearchPart } from "@/components/parts/web-search-part"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent } from "@/components/ui/message"

export function ChatMessage({ message, isStreaming = false }: { message: ChatUIMessage; isStreaming?: boolean }) {
  if (message.role === "user") return <Message align="end"><MessageContent><Bubble align="end" variant="muted"><BubbleContent>{message.parts.filter((part) => part.type === "text").map((part) => part.text).join("")}</BubbleContent></Bubble></MessageContent></Message>

  return <Message align="start"><MessageContent>{message.parts.map((part, index) => {
    switch (part.type) {
      case "text": return <TextPart key={index} part={part} />
      case "tool-github_repo": return <GithubRepoPart key={part.toolCallId} part={part} />
      case "tool-ask_user": return <AskUserPart key={part.toolCallId} part={part} />
      case "tool-request_approval": return <RequestApprovalPart key={part.toolCallId} part={part} />
      case "tool-create_artifact": return <CreateArtifactPart key={part.toolCallId} part={part} />
      case "tool-create_agent_task": return <CreateAgentTaskPart key={part.toolCallId} part={part} />
      case "tool-propose_knowledge_item": return <ProposeKnowledgeItemPart key={part.toolCallId} part={part} />
      case "tool-review_knowledge_item": return <ReviewKnowledgeItemPart key={part.toolCallId} part={part} />
      case "tool-web_search": return <WebSearchPart key={part.toolCallId} part={part} />
      default: return null
    }
  })}{!isStreaming && <SourcesPart parts={message.parts} />}</MessageContent></Message>
}
