"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { type RequestApprovalToolPart } from "@/tools"

type ApprovalDecision = {
  decision: "approved" | "needs_revision" | "denied"
  feedback: string
  decided_at: string
}

export function ApprovalCard({
  part,
  onDecision,
}: {
  part: RequestApprovalToolPart
  onDecision: (toolCallId: string, decision: ApprovalDecision) => void
}) {
  const [feedback, setFeedback] = useState("")
  const input = part.state === "input-available" ? part.input : undefined
  if (!input) return null

  const submit = (decision: ApprovalDecision["decision"]) =>
    onDecision(part.toolCallId, {
      decision,
      feedback,
      decided_at: new Date().toISOString(),
    })

  return (
    <div className="w-full rounded-2xl border bg-popover p-4 text-sm shadow-lg">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Preflight feedback · {input.target_system} · {input.risk_level}
      </p>
      <h2 className="mt-1 font-semibold">{input.title}</h2>
      <p className="mt-2 text-muted-foreground">{input.summary}</p>
      <div className="mt-3 rounded-xl border bg-background p-3">
        {input.proposed_action}
      </div>
      <textarea
        className="mt-3 min-h-20 w-full rounded-md border bg-background p-2"
        onChange={(event) => setFeedback(event.target.value)}
        placeholder="Optional feedback or required edits"
        value={feedback}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => submit("approved")}>
          Approve plan
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => submit("needs_revision")}
        >
          Needs revision
        </Button>
        <Button size="sm" variant="outline" onClick={() => submit("denied")}>
          Deny
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        This card approves the plan only. It does not authorize a mutating tool
        execution.
      </p>
    </div>
  )
}
