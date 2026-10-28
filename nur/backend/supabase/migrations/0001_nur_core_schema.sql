-- NŪR Core Schema
-- Product boundary: lawful professional wellness appointments only.

create extension if not exists pgcrypto;

create type booking_status as enum ('new','screening','approved','matched','confirmed','completed','rejected','cancelled','blocked');
create type professional_status as enum ('applied','screening','verified','paused','rejected','blocked');
create type match_status as enum ('proposed','accepted','declined','confirmed','completed','cancelled');
create type actor_type as enum ('client','professional','admin','system');
create type audit_action as enum ('create','read','update','delete','status_change','match','block','incident','login');

create table clients (
  id uuid primary key default gen_random_uuid(),
  preferred_name text,
  phone text not null,
  email text,
  city_area text,
  status text default 'active',
  risk_score int default 0 check (risk_score >= 0 and risk_score <= 100),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table professionals (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  city_areas text,
  services_offered text,
  experience text,
  certifications text,
  availability text,
  status professional_status default 'applied',
  verification_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table booking_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  preferred_name text,
  phone text not null,
  email text,
  city_area text,
  preferred_service text not null,
  preferred_datetime text,
  location_preference text,
  notes text,
  status booking_status default 'new',
  policy_acknowledged boolean not null default false,
  safety_flag boolean default false,
  safety_flag_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table verification_checks (
  id uuid primary key default gen_random_uuid(),
  actor_type actor_type not null,
  actor_id uuid not null,
  check_type text not null,
  result text not null,
  notes text,
  checked_by uuid,
  created_at timestamptz default now()
);

create table matches (
  id uuid primary key default gen_random_uuid(),
  booking_request_id uuid not null references booking_requests(id) on delete cascade,
  professional_id uuid not null references professionals(id) on delete restrict,
  status match_status default 'proposed',
  proposed_by uuid,
  internal_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (booking_request_id, professional_id)
);

create table appointment_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id) on delete cascade,
  event_type text not null,
  event_time timestamptz default now(),
  actor_type actor_type not null,
  actor_id uuid,
  notes text,
  created_at timestamptz default now()
);

create table incident_reports (
  id uuid primary key default gen_random_uuid(),
  related_booking_request_id uuid references booking_requests(id) on delete set null,
  related_match_id uuid references matches(id) on delete set null,
  reporter_type actor_type not null,
  reporter_id uuid,
  severity text not null default 'review',
  summary text not null,
  status text not null default 'open',
  assigned_to uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table blocklist (
  id uuid primary key default gen_random_uuid(),
  actor_type actor_type not null,
  actor_id uuid,
  phone text,
  email text,
  reason text not null,
  active boolean default true,
  created_by uuid,
  created_at timestamptz default now()
);

create table admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','ops_admin','safety_admin','support','read_only')),
  display_name text,
  active boolean default true,
  created_at timestamptz default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_type actor_type not null,
  actor_id uuid,
  action audit_action not null,
  target_table text,
  target_id uuid,
  metadata jsonb default '{}'::jsonb,
  ip_hash text,
  created_at timestamptz default now()
);

create index idx_booking_requests_status_created on booking_requests(status, created_at desc);
create index idx_professionals_status_created on professionals(status, created_at desc);
create index idx_matches_status_created on matches(status, created_at desc);
create index idx_incidents_status_created on incident_reports(status, created_at desc);
create index idx_audit_target on audit_logs(target_table, target_id);
