import { CheckCircle2Icon, FileTextIcon } from "lucide-react"

import { type CreateArtifactToolPart } from "@/tools"
import { Spinner } from "@/components/ui/spinner"

export function CreateArtifactPart({ part }: { part: CreateArtifactToolPart }) {
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          Creating artifact{part.input?.title ? `: ${part.input.title}` : ""}…
        </div>
      )
    case "output-available": {
      const output = part.output
      return (
        <div className="my-3 rounded-xl border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg border bg-background p-2">
              <FileTextIcon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{output.artifact.title}</p>
                <CheckCircle2Icon className="size-4 text-muted-foreground" />
              </div>
              <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                {output.artifact.kind} · {output.artifact.format}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {output.message}
              </p>
            </div>
          </div>
        </div>
      )
    }
    case "output-error":
      return (
        <div className="text-sm text-destructive">
          Artifact creation failed: {part.errorText}
        </div>
      )
    default:
      return null
  }
}
