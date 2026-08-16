# Feedback, Execution Approval, and Knowledge Review

## Preflight feedback

`request_approval` is intentionally advisory. It lets Chip approve, revise, or deny a proposed plan before implementation begins. It does not authorize a mutation.

## Execution approval

There are currently no side-effecting tools. Future tools that send email, modify a calendar, persist rows, change GitHub, publish knowledge, launch computer use, or write to any connector must use AI SDK native tool execution approval so `execute` cannot run until the approval response is attached to that exact tool call.

## Knowledge review

`propose_knowledge_item` creates a chat-local proposal. `review_knowledge_item` captures `approved`, `needs_revision`, or `rejected` plus feedback and timestamp. Neither tool promotes or persists knowledge. Canon, memory, Notion, Supabase, and graph promotion remain unimplemented.
