import { tool } from "ai"
import { z } from "zod"

import {
  disabledPersistence,
  getSupabaseRuntimeUserId,
  insertSupabaseRecord,
} from "@/lib/supabase/persistence"

const artifactTypeSchema = z.enum([
  "document",
  "prompt",
  "schema",
  "review",
  "task_plan",
  "design_profile",
  "notion_page",
  "code_patch_plan",
  "brief",
  "other",
])

const artifactFormatSchema = z.enum(["markdown", "json", "text", "tsx", "sql", "yaml"])

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72)
}

export const createArtifact = tool({
  description:
    "Create a durable artifact for substantial work product such as a plan, prompt, review, schema, design profile, brief, or code patch plan.",
  inputSchema: z.object({
    title: z.string().min(1).describe("Human-readable artifact title."),
    artifact_type: artifactTypeSchema.describe("The kind of artifact being created."),
    format: artifactFormatSchema.default("markdown").describe("The artifact body format."),
    body: z.string().min(1).describe("The complete artifact body."),
    project_key: z
      .enum(["constructiv", "wilson", "blue_hen", "kas", "design_system", "personal"])
      .optional()
      .describe("Optional project/workstream this artifact belongs to."),
    metadata: z.record(z.string(), z.unknown()).default({}),
  }),
  execute: async (input) => {
    const now = new Date().toISOString()
    const localId = crypto.randomUUID()
    const slug = `${slugify(input.title)}-${localId.slice(0, 8)}`
    const userId = getSupabaseRuntimeUserId()

    const artifact = {
      id: localId,
      slug,
      title: input.title,
      kind: input.artifact_type,
      format: input.format,
      body: input.body,
      project_key: input.project_key ?? null,
      metadata: input.metadata,
      created_at: now,
    }

    const persistence = userId
      ? await insertSupabaseRecord("artifacts", {
          user_id: userId,
          slug,
          title: input.title,
          kind: input.artifact_type,
          format: input.format,
          content: {
            body: input.body,
            format: input.format,
          },
          data: {
            project_key: input.project_key ?? null,
            local_id: localId,
          },
          constraints: {},
          controls: {},
          provenance: {
            source: "founder_operator_console",
            created_by_tool: "create_artifact",
          },
          generation: {
            created_at: now,
            metadata: input.metadata,
          },
          status: "active",
        })
      : disabledPersistence(
          "SUPABASE_RUNTIME_USER_ID is not set, so this artifact was not written to Supabase."
        )

    return {
      artifact,
      persistence,
      message: persistence.enabled
        ? persistence.error
          ? "Artifact created locally, but Supabase persistence failed."
          : "Artifact created and persisted to Supabase."
        : "Artifact created locally. Supabase persistence is currently disabled or missing a runtime user id.",
    }
  },
})
