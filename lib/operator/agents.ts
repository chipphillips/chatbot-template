export type OperatorProjectKey =
  | "constructiv"
  | "wilson"
  | "blue_hen"
  | "kas"
  | "design_system"
  | "personal"

export interface OperatorAgent {
  id: string
  name: string
  role: string
  projectKeys: OperatorProjectKey[]
  allowedTools: string[]
  outputTypes: string[]
  writePolicy: "read_only" | "approval_required"
}

export const DEFAULT_AGENTS: OperatorAgent[] = [
  {
    id: "founder-chief-of-staff",
    name: "Founder Chief of Staff",
    role: "Turns messy context into decisions, tasks, follow-ups, and execution prompts.",
    projectKeys: ["constructiv", "wilson", "blue_hen", "kas", "design_system", "personal"],
    allowedTools: ["create_artifact", "create_agent_task", "ask_user", "web_search"],
    outputTypes: ["brief", "decision", "task_plan", "master_execution_prompt"],
    writePolicy: "approval_required",
  },
  {
    id: "constructiv-product-agent",
    name: "Constructiv Product Agent",
    role: "Keeps Wilson, dealer workflows, proposal generation, and app decisions aligned.",
    projectKeys: ["constructiv", "wilson"],
    allowedTools: ["create_artifact", "create_agent_task", "web_search"],
    outputTypes: ["product_brief", "demo_path", "acceptance_criteria"],
    writePolicy: "approval_required",
  },
  {
    id: "github-review-agent",
    name: "GitHub Review Agent",
    role: "Reviews repository changes, PRs, CI posture, and source-of-truth boundaries.",
    projectKeys: ["constructiv", "kas", "design_system"],
    allowedTools: ["github_repo", "create_artifact", "create_agent_task", "web_search"],
    outputTypes: ["review", "must_fix_list", "safe_followups", "master_execution_prompt"],
    writePolicy: "approval_required",
  },
  {
    id: "supabase-schema-agent",
    name: "Supabase Schema Agent",
    role: "Designs safe schema, RLS, migration, and persistence plans.",
    projectKeys: ["constructiv", "kas", "design_system"],
    allowedTools: ["create_artifact", "create_agent_task", "ask_user"],
    outputTypes: ["migration_plan", "schema_review", "validation_receipt"],
    writePolicy: "approval_required",
  },
  {
    id: "design-system-agent",
    name: "Design System Agent",
    role: "Maintains brand, typography, illustration profiles, artifact UI, and document system rules.",
    projectKeys: ["design_system", "constructiv"],
    allowedTools: ["create_artifact", "create_agent_task", "web_search"],
    outputTypes: ["design_profile", "component_spec", "artifact_template"],
    writePolicy: "approval_required",
  },
  {
    id: "kas-canon-agent",
    name: "KAS / Canon Agent",
    role: "Handles knowledge architecture, source registries, primitives, prompts, and canon boundaries.",
    projectKeys: ["kas", "constructiv", "design_system"],
    allowedTools: ["create_artifact", "create_agent_task", "web_search"],
    outputTypes: ["canon_decision", "source_registry_update", "prompt_package"],
    writePolicy: "approval_required",
  },
  {
    id: "blue-hen-analytics-agent",
    name: "Blue Hen Analytics Agent",
    role: "Supports healthcare analytics, KPI reporting, QA, and client-ready reporting deliverables.",
    projectKeys: ["blue_hen"],
    allowedTools: ["create_artifact", "create_agent_task", "ask_user"],
    outputTypes: ["analysis_plan", "qa_checklist", "client_report"],
    writePolicy: "approval_required",
  },
  {
    id: "relationship-followup-agent",
    name: "Relationship Follow-Up Agent",
    role: "Tracks next touches, relationship context, follow-ups, and concise outreach drafts.",
    projectKeys: ["constructiv", "wilson", "personal"],
    allowedTools: ["create_artifact", "create_agent_task", "ask_user"],
    outputTypes: ["follow_up", "brief", "relationship_context"],
    writePolicy: "approval_required",
  },
]

export function getAgentById(agentId: string) {
  return DEFAULT_AGENTS.find((agent) => agent.id === agentId)
}
