"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { type ReviewKnowledgeItemToolPart } from "@/tools"

type ReviewDecision = {
  decision: "approved" | "needs_revision" | "rejected"
  feedback: string
  decided_at: string
}

export function KnowledgeReviewCard({ part, onDecision }: { part: ReviewKnowledgeItemToolPart; onDecision: (toolCallId: string, decision: ReviewDecision) => void }) {
  const [feedback, setFeedback] = useState("")
  const input = part.state === "input-available" ? part.input : undefined
  if (!input) return null

  const submit = (decision: ReviewDecision["decision"]) =>
    onDecision(part.toolCallId, { decision, feedback, decided_at: new Date().toISOString() })

  return (
    <div className="w-full rounded-2xl border bg-popover p-4 text-sm shadow-lg">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Knowledge review · {input.domain} · {input.topic}</p>
      <h2 className="mt-1 font-semibold">{input.title}</h2>
      <p className="mt-2 text-muted-foreground">{input.summary}</p>
      <p className="mt-2 text-xs text-muted-foreground">Proposed target: {input.promotion_target}</p>
      <textarea className="mt-3 min-h-20 w-full rounded-md border bg-background p-2" onChange={(event) => setFeedback(event.target.value)} placeholder="Feedback or revision notes" value={feedback} />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => submit("approved")}>Approve proposal</Button>
        <Button size="sm" variant="outline" onClick={() => submit("needs_revision")}>Needs revision</Button>
        <Button size="sm" variant="outline" onClick={() => submit("rejected")}>Reject</Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Review does not promote or persist the item.</p>
    </div>
  )
}
