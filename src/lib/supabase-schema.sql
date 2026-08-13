create extension if not exists pgcrypto;

create table if not exists public.app_profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  role text default 'owner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_snapshots (
  id text primary key,
  owner_id uuid references public.app_profiles(id) on delete set null,
  scope text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.app_profiles to anon, authenticated;
grant select, insert, update on public.app_snapshots to anon, authenticated;

alter table public.app_profiles enable row level security;
alter table public.app_snapshots enable row level security;

drop policy if exists "owner can read profiles" on public.app_profiles;
create policy "owner can read profiles"
on public.app_profiles
for select
to anon, authenticated
using (true);

drop policy if exists "owner can insert profiles" on public.app_profiles;
create policy "owner can insert profiles"
on public.app_profiles
for insert
to anon, authenticated
with check (true);

drop policy if exists "owner can update profiles" on public.app_profiles;
create policy "owner can update profiles"
on public.app_profiles
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "owner can read snapshots" on public.app_snapshots;
create policy "owner can read snapshots"
on public.app_snapshots
for select
to anon, authenticated
using (true);

drop policy if exists "owner can insert snapshots" on public.app_snapshots;
create policy "owner can insert snapshots"
on public.app_snapshots
for insert
to anon, authenticated
with check (true);

drop policy if exists "owner can update snapshots" on public.app_snapshots;
create policy "owner can update snapshots"
on public.app_snapshots
for update
to anon, authenticated
using (true)
with check (true);
