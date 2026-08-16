-- Founder Operator Console runtime schema
-- Safe-by-default: this file defines migrations only. It is not applied automatically.
-- Apply manually after confirming the target Supabase project and backup posture.

create table if not exists public.assistant_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  mode text not null default 'operator',
  project_key text,
  status text not null default 'active',
  summary text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assistant_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.assistant_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('system', 'user', 'assistant', 'tool', 'data')),
  content_text text,
  parts jsonb not null default '[]',
  attachments jsonb not null default '[]',
  model_id text,
  status text not null default 'complete',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.assistant_runs (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.assistant_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  model_id text not null,
  status text not null default 'running',
  stop_reason text,
  usage jsonb not null default '{}',
  latency_ms integer,
  error text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.assistant_tool_calls (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.assistant_runs(id) on delete cascade,
  thread_id uuid not null references public.assistant_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_call_id text,
  tool_name text not null,
  state text not null,
  input jsonb not null default '{}',
  output jsonb,
  error text,
  requires_approval boolean not null default false,
  approved_at timestamptz,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.assistant_forms (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references public.assistant_threads(id) on delete set null,
  message_id uuid references public.assistant_messages(id) on delete set null,
  user_id uuid not null references auth.users(id) on delete cascade,
  form_type text not null,
  title text,
  schema jsonb not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table if not exists public.assistant_form_responses (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.assistant_forms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  response jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.agent_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  thread_id uuid references public.assistant_threads(id) on delete set null,
  title text not null,
  brief text not null,
  status text not null default 'draft',
  priority text not null default 'normal',
  project_key text,
  due_at timestamptz,
  output_artifact_id uuid references public.artifacts(id) on delete set null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id uuid references public.agent_tasks(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  status text not null default 'queued',
  input jsonb not null default '{}',
  output jsonb,
  logs jsonb not null default '[]',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.artifacts
  add column if not exists user_id uuid references auth.users(id) on delete cascade,
  add column if not exists thread_id uuid references public.assistant_threads(id) on delete set null,
  add column if not exists message_id uuid references public.assistant_messages(id) on delete set null,
  add column if not exists version integer not null default 1,
  add column if not exists format text,
  add column if not exists parent_artifact_id uuid references public.artifacts(id) on delete set null;

alter table public.assistant_threads enable row level security;
alter table public.artifacts enable row level security;
alter table public.assistant_messages enable row level security;
alter table public.assistant_runs enable row level security;
alter table public.assistant_tool_calls enable row level security;
alter table public.assistant_forms enable row level security;
alter table public.assistant_form_responses enable row level security;
alter table public.agent_tasks enable row level security;
alter table public.agent_runs enable row level security;

drop policy if exists "artifacts_owner_all" on public.artifacts;
drop policy if exists "assistant_threads_owner_all" on public.assistant_threads;
drop policy if exists "assistant_messages_owner_all" on public.assistant_messages;
drop policy if exists "assistant_runs_owner_all" on public.assistant_runs;
drop policy if exists "assistant_tool_calls_owner_all" on public.assistant_tool_calls;
drop policy if exists "assistant_forms_owner_all" on public.assistant_forms;
drop policy if exists "assistant_form_responses_owner_all" on public.assistant_form_responses;
drop policy if exists "agent_tasks_owner_all" on public.agent_tasks;
drop policy if exists "agent_runs_owner_all" on public.agent_runs;
create policy "artifacts_owner_all"
  on public.artifacts
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "assistant_threads_owner_all"
  on public.assistant_threads
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "assistant_messages_owner_all"
  on public.assistant_messages
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "assistant_runs_owner_all"
  on public.assistant_runs
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "assistant_tool_calls_owner_all"
  on public.assistant_tool_calls
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "assistant_forms_owner_all"
  on public.assistant_forms
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "assistant_form_responses_owner_all"
  on public.assistant_form_responses
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "agent_tasks_owner_all"
  on public.agent_tasks
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "agent_runs_owner_all"
  on public.agent_runs
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists assistant_threads_user_updated_idx
  on public.assistant_threads (user_id, updated_at desc);

create index if not exists assistant_messages_thread_created_idx
  on public.assistant_messages (thread_id, created_at asc);

create index if not exists assistant_tool_calls_thread_started_idx
  on public.assistant_tool_calls (thread_id, started_at desc);

create index if not exists agent_tasks_user_status_idx
  on public.agent_tasks (user_id, status, created_at desc);

create index if not exists agent_runs_task_created_idx
  on public.agent_runs (task_id, created_at desc);
