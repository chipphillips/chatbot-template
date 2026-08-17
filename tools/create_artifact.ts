import { tool } from "ai"
import { z } from "zod"

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

const artifactFormatSchema = z.enum([
  "markdown",
  "json",
  "text",
  "tsx",
  "sql",
  "yaml",
])

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72)
}

export const createArtifact = tool({
  description:
    "Create a non-persistent artifact draft for substantial work product. This tool does not write to Supabase or any external system.",
  inputSchema: z.object({
    title: z.string().min(1),
    artifact_type: artifactTypeSchema,
    format: artifactFormatSchema.default("markdown"),
    body: z.string().min(1),
    project_key: z
      .enum([
        "constructiv",
        "wilson",
        "blue_hen",
        "kas",
        "design_system",
        "personal",
      ])
      .optional(),
    metadata: z.record(z.string(), z.unknown()).default({}),
  }),
  execute: async (input) => {
    const id = crypto.randomUUID()
    return {
      artifact: {
        id,
        slug: `${slugify(input.title)}-${id.slice(0, 8)}`,
        title: input.title,
        kind: input.artifact_type,
        format: input.format,
        body: input.body,
        project_key: input.project_key ?? null,
        metadata: input.metadata,
        status: "draft",
        persistence: "not_persisted",
        created_at: new Date().toISOString(),
      },
      message:
        "Artifact draft created in the current chat only. It has not been persisted externally.",
    }
  },
})
