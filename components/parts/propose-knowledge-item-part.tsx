import { type ProposeKnowledgeItemToolPart } from "@/tools"

export function ProposeKnowledgeItemPart({
  part,
}: {
  part: ProposeKnowledgeItemToolPart
}) {
  if (part.state === "input-streaming" || part.state === "input-available")
    return (
      <div className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
        Drafting knowledge proposal…
      </div>
    )
  if (part.state === "output-available") {
    const item = part.output.item
    return (
      <article className="rounded-lg border bg-background p-3 text-sm">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Knowledge proposal · {item.domain} · {item.topic}
        </p>
        <h3 className="mt-1 font-medium">{item.title}</h3>
        <p className="mt-2 text-muted-foreground">{item.summary}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Target: {item.promotion_target} · Confidence: {item.confidence} ·
          Status: {item.status}
        </p>
      </article>
    )
  }
  if (part.state === "output-error")
    return (
      <div className="text-sm text-destructive">
        Knowledge proposal failed: {part.errorText}
      </div>
    )
  return null
}
