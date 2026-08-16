import { tool } from "ai"
import { z } from "zod"

export const knowledgeDomainSchema = z.enum([
  "constructiv",
  "wilson",
  "blue_hen",
  "kas",
  "design_system",
  "business_canon",
  "personal",
])

export const proposeKnowledgeItem = tool({
  description:
    "Create a non-persistent knowledge proposal for review by domain/topic. This tool does not promote to memory, canon, Notion, Supabase, or a graph.",
  inputSchema: z.object({
    title: z.string().min(1),
    domain: knowledgeDomainSchema,
    topic: z.string().min(1),
    summary: z.string().min(1),
    content: z.string().min(1),
    promotion_target: z
      .enum(["memory", "decision", "business_canon", "design_system", "knowledge_graph", "notion", "supabase", "none"])
      .default("none"),
    confidence: z.enum(["low", "medium", "high"]).default("medium"),
    source_refs: z.array(z.string()).default([]),
    relation_hints: z.array(z.string()).default([]),
  }),
  execute: async (input) => ({
    item: {
      id: crypto.randomUUID(),
      status: "proposed" as const,
      created_at: new Date().toISOString(),
      ...input,
    },
    message: "Knowledge proposal created in the current chat only. Promotion is not implemented.",
  }),
})
