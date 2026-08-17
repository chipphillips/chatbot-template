"use client"

import { BotIcon, ClipboardCheckIcon, FileTextIcon } from "lucide-react"

import { DEFAULT_AGENTS } from "@/lib/operator/agents"
import { type ChatUIMessage } from "@/tools"

function collectArtifacts(messages: ChatUIMessage[]) {
  return messages.flatMap((message) =>
    message.parts.flatMap((part) =>
      part.type === "tool-create_artifact" && part.state === "output-available"
        ? [part.output.artifact]
        : []
    )
  )
}
function collectTasks(messages: ChatUIMessage[]) {
  return messages.flatMap((message) =>
    message.parts.flatMap((part) =>
      part.type === "tool-create_agent_task" &&
      part.state === "output-available"
        ? [part.output.task]
        : []
    )
  )
}
function collectKnowledge(messages: ChatUIMessage[]) {
  return messages.flatMap((message) =>
    message.parts.flatMap((part) => {
      if (
        part.type === "tool-propose_knowledge_item" &&
        part.state === "output-available"
      )
        return [
          {
            id: part.output.item.id,
            title: part.output.item.title,
            domain: part.output.item.domain,
            topic: part.output.item.topic,
            state: "proposed",
          },
        ]
      if (
        part.type === "tool-review_knowledge_item" &&
        part.state === "output-available"
      )
        return [
          {
            id: part.input.knowledge_item_id,
            title: part.input.title,
            domain: part.input.domain,
            topic: part.input.topic,
            state: part.output.decision,
          },
        ]
      return []
    })
  )
}
function collectPreflight(messages: ChatUIMessage[]) {
  return messages.flatMap((message) =>
    message.parts.flatMap((part) =>
      part.type === "tool-request_approval" && part.state === "output-available"
        ? [
            {
              id: part.toolCallId,
              title: part.input.title,
              target: part.input.target_system,
              state: part.output.decision,
            },
          ]
        : []
    )
  )
}

export function OperatorSidebar({ messages }: { messages: ChatUIMessage[] }) {
  const artifacts = collectArtifacts(messages)
  const tasks = collectTasks(messages)
  const knowledge = collectKnowledge(messages)
  const preflight = collectPreflight(messages)
  return (
    <aside className="hidden min-h-0 border-l bg-muted/20 lg:flex lg:w-[380px] lg:flex-col">
      <div className="border-b p-4">
        <p className="text-sm font-semibold">Founder Console</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Typed AI SDK parts keep drafts, feedback, knowledge review, and
          sub-agent work in one visible runtime.
        </p>
      </div>
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <ClipboardCheckIcon className="size-4" />
            Preflight Feedback
          </div>
          {preflight.length === 0 ? (
            <p className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              No plan feedback yet.
            </p>
          ) : (
            <div className="space-y-2">
              {preflight.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border bg-background p-3"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.target} · {item.state}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <FileTextIcon className="size-4" />
            Knowledge
          </div>
          {knowledge.length === 0 ? (
            <p className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              No knowledge proposals yet.
            </p>
          ) : (
            <div className="space-y-2">
              {knowledge.map((item, index) => (
                <article
                  key={`${item.id}-${index}`}
                  className="rounded-lg border bg-background p-3"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.domain} · {item.topic} · {item.state}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <FileTextIcon className="size-4" />
            Artifacts
          </div>
          {artifacts.length === 0 ? (
            <p className="text-xs text-muted-foreground">No drafts.</p>
          ) : (
            artifacts.map((item) => (
              <article
                key={item.id}
                className="mb-2 rounded-lg border bg-background p-3"
              >
                <p className="text-sm font-medium">{item.title}</p>
              </article>
            ))
          )}
        </section>
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <ClipboardCheckIcon className="size-4" />
            Agent Tasks
          </div>
          {tasks.length === 0 ? (
            <p className="text-xs text-muted-foreground">No drafts.</p>
          ) : (
            tasks.map((item) => (
              <article
                key={item.id}
                className="mb-2 rounded-lg border bg-background p-3"
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.agent_name}
                </p>
              </article>
            ))
          )}
        </section>
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <BotIcon className="size-4" />
            Sub-Agent Team
          </div>
          <div className="space-y-2">
            {DEFAULT_AGENTS.map((agent) => (
              <article
                key={agent.id}
                className="rounded-lg border bg-background p-3"
              >
                <p className="text-sm font-medium">{agent.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {agent.role}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
