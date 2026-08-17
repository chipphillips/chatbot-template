import { tool } from "ai"
import { z } from "zod"

export const requestApproval = tool({
  description:
    "Ask Chip for preflight feedback on a proposed plan or future action. This is advisory only and must not be used as the execution gate for a mutating tool.",
  inputSchema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    proposed_action: z.string().min(1),
    target_system: z.enum([
      "github",
      "supabase",
      "notion",
      "outlook",
      "calendar",
      "otter",
      "image_pipeline",
      "computer_use",
      "business_canon",
      "knowledge_graph",
      "other",
    ]),
    risk_level: z.enum(["low", "medium", "high"]).default("medium"),
    safety_notes: z.array(z.string()).default([]),
  }),
  outputSchema: z.object({
    decision: z.enum(["approved", "needs_revision", "denied"]),
    feedback: z.string().default(""),
    decided_at: z.string(),
  }),
})
