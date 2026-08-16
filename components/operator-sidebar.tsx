"use client"

import { BotIcon, ClipboardCheckIcon, FileTextIcon } from "lucide-react"

import { DEFAULT_AGENTS } from "@/lib/operator/agents"

type MessageWithParts = {
  parts?: Array<Record<string, unknown>>
}

function collectArtifacts(messages: MessageWithParts[]) {
  return messages.flatMap((message) =>
    (message.parts ?? []).flatMap((part) => {
      if (
        part.type !== "tool-create_artifact" ||
        part.state !== "output-available" ||
        !part.output
      ) {
        return []
      }

      const output = part.output as {
        artifact?: {
          id: string
          title: string
          kind: string
          format: string
          body: string
        }
      }

      return output.artifact ? [output.artifact] : []
    })
  )
}

function collectTasks(messages: MessageWithParts[]) {
  return messages.flatMap((message) =>
    (message.parts ?? []).flatMap((part) => {
      if (
        part.type !== "tool-create_agent_task" ||
        part.state !== "output-available" ||
        !part.output
      ) {
        return []
      }

      const output = part.output as {
        task?: {
          id: string
          title: string
          agent_name: string
          status: string
          priority: string
        }
      }

      return output.task ? [output.task] : []
    })
  )
}

export function OperatorSidebar({ messages }: { messages: MessageWithParts[] }) {
  const artifacts = collectArtifacts(messages)
  const tasks = collectTasks(messages)

  return (
    <aside className="hidden min-h-0 border-l bg-muted/20 lg:flex lg:w-[380px] lg:flex-col">
      <div className="border-b p-4">
        <p className="text-sm font-semibold">Founder Console</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Artifacts, sub-agents, and delegated work stay visible instead of getting buried in chat.
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <FileTextIcon className="size-4" />
            Artifacts
          </div>
          {artifacts.length === 0 ? (
            <p className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              Ask MAX to create an artifact for a plan, prompt, review, schema, brief, or design profile.
            </p>
          ) : (
            <div className="space-y-2">
              {artifacts.map((artifact) => (
                <article key={artifact.id} className="rounded-lg border bg-background p-3">
                  <p className="line-clamp-2 text-sm font-medium">{artifact.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {artifact.kind} · {artifact.format}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <ClipboardCheckIcon className="size-4" />
            Agent Tasks
          </div>
          {tasks.length === 0 ? (
            <p className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              Ask MAX to assign work to a sub-agent when something needs tracking or handoff.
            </p>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <article key={task.id} className="rounded-lg border bg-background p-3">
                  <p className="line-clamp-2 text-sm font-medium">{task.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {task.agent_name} · {task.priority} · {task.status}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <BotIcon className="size-4" />
            Sub-Agent Team
          </div>
          <div className="space-y-2">
            {DEFAULT_AGENTS.map((agent) => (
              <article key={agent.id} className="rounded-lg border bg-background p-3">
                <p className="text-sm font-medium">{agent.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
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
