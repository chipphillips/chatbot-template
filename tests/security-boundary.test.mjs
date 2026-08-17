import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")

test("chat route enforces private session before model execution", async () => { const source = await read("app/api/chat/route.ts"); assert.match(source, /hasValidPrivateSession/); assert.match(source, /status: 401/); assert.match(source, /consumePrivateRateLimit/) })
test("normal runtime persistence does not use a Supabase service role", async () => { const source = await read("lib/supabase/persistence.ts"); assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY/); assert.match(source, /not implemented/i) })
test("migration owns its tables and does not alter generic artifacts or agents", async () => { const source = await read("supabase/migrations/20260816160000_founder_operator_console_runtime.sql"); assert.match(source, /create table public\.assistant_artifacts/); assert.match(source, /create table public\.assistant_agent_tasks/); assert.doesNotMatch(source, /alter table public\.artifacts/); assert.doesNotMatch(source, /references public\.agents/) })
test("knowledge review is feedback-only and promotion remains absent", async () => { const source = await read("tools/review_knowledge_item.ts"); assert.match(source, /does not promote or persist/i); assert.doesNotMatch(source, /execute\s*:/) })
test("preflight approval is not represented as mutation enforcement", async () => { const source = await read("tools/request_approval.ts"); assert.match(source, /advisory only/i); assert.doesNotMatch(source, /execute\s*:/) })
test("single runtime docs require native execution approval for future mutations", async () => { const source = await read("docs/architecture/single-runtime-contract.md"); assert.match(source, /native tool execution approval/i); assert.match(source, /Current mutating tool count: \*\*zero\*\*/) })
