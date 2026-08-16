import { CheckCircle2Icon, UserRoundCheckIcon } from "lucide-react"

import { type CreateAgentTaskToolPart } from "@/tools"
import { Spinner } from "@/components/ui/spinner"

export function CreateAgentTaskPart({ part }: { part: CreateAgentTaskToolPart }) {
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          Assigning agent task{part.input?.title ? `: ${part.input.title}` : ""}…
        </div>
      )
    case "output-available": {
      const { task, message } = part.output
      return (
        <div className="my-3 rounded-xl border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg border bg-background p-2">
              <UserRoundCheckIcon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{task.title}</p>
                <CheckCircle2Icon className="size-4 text-muted-foreground" />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {task.agent_name} · {task.priority} · {task.status}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{message}</p>
              {task.acceptance_criteria.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {task.acceptance_criteria.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )
    }
    case "output-error":
      return (
        <div className="text-sm text-destructive">
          Agent task creation failed: {part.errorText}
        </div>
      )
    default:
      return null
  }
}
