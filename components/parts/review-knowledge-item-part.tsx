import { type ReviewKnowledgeItemToolPart } from "@/tools"

export function ReviewKnowledgeItemPart({
  part,
}: {
  part: ReviewKnowledgeItemToolPart
}) {
  if (part.state === "input-streaming" || part.state === "input-available")
    return (
      <div className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
        Waiting for knowledge review…
      </div>
    )
  if (part.state === "output-available")
    return (
      <div className="rounded-lg border p-3 text-sm">
        <p className="font-medium">
          Knowledge review: {part.output.decision.replace("_", " ")}
        </p>
        {part.output.feedback && (
          <p className="mt-1 text-muted-foreground">{part.output.feedback}</p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          No promotion was performed.
        </p>
      </div>
    )
  if (part.state === "output-error")
    return (
      <div className="text-sm text-destructive">
        Knowledge review failed: {part.errorText}
      </div>
    )
  return null
}
