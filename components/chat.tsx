"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai"

import { ApprovalCard } from "@/components/approval-card"
import { ChatMessage } from "@/components/chat-message"
import { KnowledgeReviewCard } from "@/components/knowledge-review-card"
import { OperatorSidebar } from "@/components/operator-sidebar"
import { PromptForm } from "@/components/prompt-form"
import { QuestionCard } from "@/components/question-card"
import { Suggestions } from "@/components/suggestions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { type GatewayModel } from "@/lib/models"
import { type ChatUIMessage } from "@/tools"

export function Chat({ models }: { models: GatewayModel[] }) {
  const [model, setModel] = React.useState(models[0]?.id ?? "")
  const { messages, sendMessage, status, stop, error, addToolOutput } =
    useChat<ChatUIMessage>({
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    })

  const resolvedModel = models.some((candidate) => candidate.id === model)
    ? model
    : (models[0]?.id ?? "")
  const isBusy = status === "submitted" || status === "streaming"
  const lastMessage = messages.at(-1)

  const pendingParts =
    lastMessage?.role === "assistant"
      ? lastMessage.parts.flatMap((part) => {
          if (
            part.type !== "tool-ask_user" &&
            part.type !== "tool-request_approval" &&
            part.type !== "tool-review_knowledge_item"
          ) {
            return []
          }

          return part.state === "input-streaming" ||
            part.state === "input-available"
            ? [part]
            : []
        })
      : []

  return (
    <div className="grid min-h-0 w-full flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="mx-auto flex min-h-0 w-full flex-1 flex-col">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>What needs to get done?</EmptyTitle>
                <EmptyDescription>
                  MAX can create draft artifacts, propose knowledge, request
                  structured feedback, assign draft sub-agent tasks, and search
                  sources.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Suggestions
                  onSelect={(prompt) =>
                    sendMessage(
                      { text: prompt },
                      { body: { model: resolvedModel } }
                    )
                  }
                />
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <MessageScrollerProvider>
            <MessageScroller className="flex-1">
              <MessageScrollerViewport>
                <MessageScrollerContent className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-6">
                  {messages.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === "user"}
                    >
                      <ChatMessage
                        message={message}
                        isStreaming={isBusy && message.id === lastMessage?.id}
                      />
                    </MessageScrollerItem>
                  ))}
                  {status === "submitted" && (
                    <MessageScrollerItem messageId="thinking">
                      <div className="flex shimmer items-center gap-2 px-3 text-sm text-muted-foreground">
                        Thinking…
                      </div>
                    </MessageScrollerItem>
                  )}
                </MessageScrollerContent>

                <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 px-6 pb-2">
                  {pendingParts.map((part) => {
                    if (part.type === "tool-ask_user") {
                      return (
                        <QuestionCard
                          key={part.toolCallId}
                          part={part}
                          onAnswer={(toolCallId, answer) =>
                            addToolOutput({
                              tool: "ask_user",
                              toolCallId,
                              output: answer,
                              options: { body: { model: resolvedModel } },
                            })
                          }
                        />
                      )
                    }

                    if (part.type === "tool-request_approval") {
                      return (
                        <ApprovalCard
                          key={part.toolCallId}
                          part={part}
                          onDecision={(toolCallId, decision) =>
                            addToolOutput({
                              tool: "request_approval",
                              toolCallId,
                              output: decision,
                              options: { body: { model: resolvedModel } },
                            })
                          }
                        />
                      )
                    }

                    return (
                      <KnowledgeReviewCard
                        key={part.toolCallId}
                        part={part}
                        onDecision={(toolCallId, decision) =>
                          addToolOutput({
                            tool: "review_knowledge_item",
                            toolCallId,
                            output: decision,
                            options: { body: { model: resolvedModel } },
                          })
                        }
                      />
                    )
                  })}
                </div>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        )}

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 px-6 pb-6">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Request failed</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          <PromptForm
            models={models}
            model={resolvedModel}
            onModelChange={setModel}
            isBusy={isBusy}
            onSubmit={(text) =>
              sendMessage({ text }, { body: { model: resolvedModel } })
            }
            onStop={() => stop()}
          />
        </div>
      </div>

      <OperatorSidebar messages={messages} />
    </div>
  )
}
