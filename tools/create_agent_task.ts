import { tool } from "ai"
import { z } from "zod"

import { DEFAULT_AGENTS, getAgentById } from "@/lib/operator/agents"
import {
  disabledPersistence,
  getSupabaseRuntimeUserId,
  insertSupabaseRecord,
} from "@/lib/supabase/persistence"

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
    "Create a visible task assigned to one of Chip's standing sub-agents. Use when work should be delegated, tracked, or converted into a Claude Code handoff.",
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
    const now = new Date().toISOString()
    const agent = getAgentById(input.agent_id) ?? DEFAULT_AGENTS[0]
    const taskId = crypto.randomUUID()
    const userId = getSupabaseRuntimeUserId()

    const task = {
      id: taskId,
      title: input.title,
      brief: input.brief,
      agent_id: agent.id,
      agent_name: agent.name,
      status: "draft",
      priority: input.priority,
      project_key: input.project_key ?? null,
      acceptance_criteria: input.acceptance_criteria,
      metadata: input.metadata,
      created_at: now,
    }

    const persistence = userId
      ? await insertSupabaseRecord("agent_tasks", {
          user_id: userId,
          title: input.title,
          brief: input.brief,
          status: "draft",
          priority: input.priority,
          project_key: input.project_key ?? null,
          metadata: {
            local_id: taskId,
            agent_slug: agent.id,
            agent_name: agent.name,
            acceptance_criteria: input.acceptance_criteria,
            ...input.metadata,
          },
        })
      : disabledPersistence(
          "SUPABASE_RUNTIME_USER_ID is not set, so this agent task was not written to Supabase."
        )

    return {
      task,
      persistence,
      message: persistence.enabled
        ? persistence.error
          ? "Agent task created locally, but Supabase persistence failed."
          : "Agent task created and persisted to Supabase."
        : "Agent task created locally. Supabase persistence is currently disabled or missing a runtime user id.",
    }
  },
})
