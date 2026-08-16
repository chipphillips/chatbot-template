# Single Runtime Contract

AI SDK `UIMessage` plus typed tool/data parts is the only live conversational runtime.

ChatKit, OpenAI Responses specialized tools, MCP connectors, image generation, computer use, Microsoft 365, Otter, Notion, GitHub, and Supabase are adapter targets or design references, not parallel transcript runtimes.

Current mutating tool count: **zero**. `create_artifact`, `create_agent_task`, `propose_knowledge_item`, `review_knowledge_item`, `ask_user`, and `request_approval` are either draft-only or frontend feedback interactions.

When the first mutating adapter is added, it must use the installed AI SDK native tool execution approval mechanism and `addToolApprovalResponse`. A custom preflight feedback tool is never sufficient to authorize execution.
