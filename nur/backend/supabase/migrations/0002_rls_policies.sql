-- NŪR RLS Policies
-- Public users submit only. Private records are admin-controlled.

alter table clients enable row level security;
alter table professionals enable row level security;
alter table booking_requests enable row level security;
alter table verification_checks enable row level security;
alter table matches enable row level security;
alter table appointment_events enable row level security;
alter table incident_reports enable row level security;
alter table blocklist enable row level security;
alter table admin_users enable row level security;
alter table audit_logs enable row level security;

create or replace function public.current_admin_role()
returns text
language sql
security definer
set search_path = public
as $$
  select role from admin_users where id = auth.uid() and active = true limit 1;
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists(select 1 from admin_users where id = auth.uid() and active = true);
$$;

create or replace function public.is_safety_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists(
    select 1 from admin_users
    where id = auth.uid()
      and active = true
      and role in ('owner','safety_admin')
  );
$$;

create policy "public can submit booking requests"
on booking_requests
for insert
to anon, authenticated
with check (policy_acknowledged = true);

create policy "public can submit professional applications"
on professionals
for insert
to anon, authenticated
with check (status = 'applied');

create policy "admins read clients" on clients for select to authenticated using (is_admin());
create policy "admins write clients" on clients for all to authenticated using (is_admin()) with check (is_admin());

create policy "admins read professionals" on professionals for select to authenticated using (is_admin());
create policy "admins update professionals" on professionals for update to authenticated using (is_admin()) with check (is_admin());

create policy "admins read booking requests" on booking_requests for select to authenticated using (is_admin());
create policy "admins update booking requests" on booking_requests for update to authenticated using (is_admin()) with check (is_admin());

create policy "admins manage verification checks" on verification_checks for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage matches" on matches for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage appointment events" on appointment_events for all to authenticated using (is_admin()) with check (is_admin());

create policy "admins read incidents" on incident_reports for select to authenticated using (is_admin());
create policy "safety admins manage incidents" on incident_reports for all to authenticated using (is_safety_admin()) with check (is_safety_admin());

create policy "admins read blocklist" on blocklist for select to authenticated using (is_admin());
create policy "safety admins manage blocklist" on blocklist for all to authenticated using (is_safety_admin()) with check (is_safety_admin());

create policy "admins read audit logs" on audit_logs for select to authenticated using (is_admin());
create policy "system/admin insert audit logs" on audit_logs for insert to authenticated with check (is_admin());

create policy "admins read admin users" on admin_users for select to authenticated using (is_admin());
