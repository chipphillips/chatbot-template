import { tool } from "ai"
import { z } from "zod"

import { knowledgeDomainSchema } from "./propose_knowledge_item"

export const reviewKnowledgeItem = tool({
  description:
    "Ask Chip to review a proposed knowledge item. This records review feedback in the chat only and does not promote or persist the item.",
  inputSchema: z.object({
    knowledge_item_id: z.string().min(1),
    title: z.string().min(1),
    domain: knowledgeDomainSchema,
    topic: z.string().min(1),
    summary: z.string().min(1),
    promotion_target: z.string().min(1),
  }),
  outputSchema: z.object({
    decision: z.enum(["approved", "needs_revision", "rejected"]),
    feedback: z.string().default(""),
    decided_at: z.string(),
  }),
})
