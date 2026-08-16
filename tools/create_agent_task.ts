import { tool } from "ai"
import { z } from "zod"

import { DEFAULT_AGENTS, getAgentById } from "@/lib/operator/agents"

const agentIdSchema = z.enum([
  "founder-chief-of-staff",
  "constructiv-product-agent",
  "github-review-agent",
  "supabase-schema-agent",
  "design-system-agent",
  "kas-canon-agent",
  "blue-hen-analytics-agent",
  "relationship-followup-agent",
])

export const createAgentTask = tool({
  description:
    "Create a non-persistent draft task assigned to a standing sub-agent. This tool does not write to Supabase or trigger autonomous execution.",
  inputSchema: z.object({
    title: z.string().min(1),
    brief: z.string().min(1),
    agent_id: agentIdSchema,
    priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
    project_key: z
      .enum(["constructiv", "wilson", "blue_hen", "kas", "design_system", "personal"])
      .optional(),
    acceptance_criteria: z.array(z.string()).default([]),
    metadata: z.record(z.string(), z.unknown()).default({}),
  }),
  execute: async (input) => {
    const agent = getAgentById(input.agent_id) ?? DEFAULT_AGENTS[0]
    return {
      task: {
        id: crypto.randomUUID(),
        title: input.title,
        brief: input.brief,
        agent_id: agent.id,
        agent_name: agent.name,
        status: "draft",
        persistence: "not_persisted",
        priority: input.priority,
        project_key: input.project_key ?? null,
        acceptance_criteria: input.acceptance_criteria,
        metadata: input.metadata,
        created_at: new Date().toISOString(),
      },
      message: "Agent task draft created in the current chat only. It has not been persisted or executed.",
    }
  },
})
