import { type RequestApprovalToolPart } from "@/tools"

export function RequestApprovalPart({ part }: { part: RequestApprovalToolPart }) {
  if (part.state === "input-streaming" || part.state === "input-available") return <div className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">Waiting for preflight feedback…</div>
  if (part.state === "output-available") return <div className="rounded-lg border p-3 text-sm"><p className="font-medium">Preflight decision: {part.output.decision.replace("_", " ")}</p>{part.output.feedback && <p className="mt-1 text-muted-foreground">{part.output.feedback}</p>}</div>
  if (part.state === "output-error") return <div className="text-sm text-destructive">Preflight request failed: {part.errorText}</div>
  return null
}
