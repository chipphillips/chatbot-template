-- Founder Operator Console runtime schema.
-- Self-contained: creates only console-owned tables and never alters generic company tables.
-- Validation target: local `supabase db reset` only until explicitly approved for a remote project.

create table public.assistant_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  mode text not null default 'operator',
  project_key text,
  status text not null default 'active' check (status in ('active','archived')),
  summary text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.assistant_messages (
  id uuid primary key default gen_random_uuid(),
  ui_message_id text not null,
  thread_id uuid not null references public.assistant_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('system','user','assistant')),
  parts jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (thread_id, ui_message_id)
);

create table public.assistant_artifacts (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  thread_id uuid references public.assistant_threads(id) on delete set null,
  title text not null,
  artifact_type text not null,
  format text not null,
  body text not null,
  project_key text,
  status text not null default 'draft' check (status in ('draft','approved','archived')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.assistant_agent_tasks (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  thread_id uuid references public.assistant_threads(id) on delete set null,
  agent_key text not null,
  title text not null,
  brief text not null,
  status text not null default 'draft' check (status in ('draft','ready','running','needs_review','complete','blocked','cancelled')),
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  project_key text,
  acceptance_criteria jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.assistant_tool_calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  thread_id uuid not null references public.assistant_threads(id) on delete cascade,
  tool_call_id text not null,
  tool_name text not null,
  state text not null,
  input jsonb not null default '{}'::jsonb,
  output jsonb,
  error_code text,
  created_at timestamptz not null default now(),
  unique (thread_id, tool_call_id)
);

create table public.assistant_approvals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  thread_id uuid references public.assistant_threads(id) on delete cascade,
  tool_call_id text,
  approval_id text,
  action_type text not null,
  target_system text not null,
  decision text not null check (decision in ('approved','denied','needs_revision')),
  reason text,
  decided_at timestamptz not null default now()
);

alter table public.assistant_threads enable row level security;
alter table public.assistant_messages enable row level security;
alter table public.assistant_artifacts enable row level security;
alter table public.assistant_agent_tasks enable row level security;
alter table public.assistant_tool_calls enable row level security;
alter table public.assistant_approvals enable row level security;

create policy assistant_threads_owner_all on public.assistant_threads for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy assistant_messages_owner_all on public.assistant_messages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy assistant_artifacts_owner_all on public.assistant_artifacts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy assistant_agent_tasks_owner_all on public.assistant_agent_tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy assistant_tool_calls_owner_all on public.assistant_tool_calls for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy assistant_approvals_owner_all on public.assistant_approvals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index assistant_threads_user_updated_idx on public.assistant_threads (user_id, updated_at desc);
create index assistant_messages_user_thread_created_idx on public.assistant_messages (user_id, thread_id, created_at);
create index assistant_artifacts_user_status_idx on public.assistant_artifacts (user_id, status, updated_at desc);
create index assistant_agent_tasks_user_status_idx on public.assistant_agent_tasks (user_id, status, updated_at desc);
create index assistant_tool_calls_user_thread_idx on public.assistant_tool_calls (user_id, thread_id, created_at desc);
create index assistant_approvals_user_decided_idx on public.assistant_approvals (user_id, decided_at desc);
