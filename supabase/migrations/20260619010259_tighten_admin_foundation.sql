-- Tighten Part 2 policies after advisor review.
-- Public form submissions get bounded insert checks, public read policies are
-- separated from authenticated admin policies, and foreign keys get indexes.

create index if not exists activities_created_by_idx
  on public.activities (created_by);
create index if not exists activities_updated_by_idx
  on public.activities (updated_by);
create index if not exists admin_audit_logs_admin_user_id_idx
  on public.admin_audit_logs (admin_user_id);
create index if not exists contact_submissions_handled_by_idx
  on public.contact_submissions (handled_by);
create index if not exists donations_created_by_idx
  on public.donations (created_by);
create index if not exists donations_updated_by_idx
  on public.donations (updated_by);
create index if not exists events_created_by_idx
  on public.events (created_by);
create index if not exists events_updated_by_idx
  on public.events (updated_by);
create index if not exists gallery_items_created_by_idx
  on public.gallery_items (created_by);
create index if not exists gallery_items_updated_by_idx
  on public.gallery_items (updated_by);
create index if not exists impact_stats_updated_by_idx
  on public.impact_stats (updated_by);
create index if not exists media_assets_uploaded_by_idx
  on public.media_assets (uploaded_by);
create index if not exists media_assets_created_by_idx
  on public.media_assets (created_by);
create index if not exists media_assets_updated_by_idx
  on public.media_assets (updated_by);
create index if not exists reports_created_by_idx
  on public.reports (created_by);
create index if not exists reports_updated_by_idx
  on public.reports (updated_by);
create index if not exists site_settings_updated_by_idx
  on public.site_settings (updated_by);
create index if not exists volunteer_applications_handled_by_idx
  on public.volunteer_applications (handled_by);

drop policy if exists "Users can read their own admin profile" on public.admin_profiles;
drop policy if exists "Admins can manage admin profiles" on public.admin_profiles;

create policy "Admin profiles are readable by self or owners"
  on public.admin_profiles
  for select
  to authenticated
  using ((select auth.uid()) = user_id or (select private.is_admin('owner')));

create policy "Owners can insert admin profiles"
  on public.admin_profiles
  for insert
  to authenticated
  with check ((select private.is_admin('owner')));

create policy "Owners can update admin profiles"
  on public.admin_profiles
  for update
  to authenticated
  using ((select private.is_admin('owner')))
  with check ((select private.is_admin('owner')));

create policy "Owners can delete admin profiles"
  on public.admin_profiles
  for delete
  to authenticated
  using ((select private.is_admin('owner')));

drop policy if exists "Published activities are public" on public.activities;
drop policy if exists "Admins can manage activities" on public.activities;

create policy "Published activities are public"
  on public.activities
  for select
  to anon
  using (is_published = true);

create policy "Published or admin activities are readable"
  on public.activities
  for select
  to authenticated
  using (is_published = true or (select private.is_admin('viewer')));

create policy "Editors can insert activities"
  on public.activities
  for insert
  to authenticated
  with check ((select private.is_admin('editor')));

create policy "Editors can update activities"
  on public.activities
  for update
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

create policy "Editors can delete activities"
  on public.activities
  for delete
  to authenticated
  using ((select private.is_admin('editor')));

drop policy if exists "Published events are public" on public.events;
drop policy if exists "Admins can manage events" on public.events;

create policy "Published events are public"
  on public.events
  for select
  to anon
  using (is_published = true);

create policy "Published or admin events are readable"
  on public.events
  for select
  to authenticated
  using (is_published = true or (select private.is_admin('viewer')));

create policy "Editors can insert events"
  on public.events
  for insert
  to authenticated
  with check ((select private.is_admin('editor')));

create policy "Editors can update events"
  on public.events
  for update
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

create policy "Editors can delete events"
  on public.events
  for delete
  to authenticated
  using ((select private.is_admin('editor')));

drop policy if exists "Published gallery items are public" on public.gallery_items;
drop policy if exists "Admins can manage gallery items" on public.gallery_items;

create policy "Published gallery items are public"
  on public.gallery_items
  for select
  to anon
  using (is_published = true);

create policy "Published or admin gallery items are readable"
  on public.gallery_items
  for select
  to authenticated
  using (is_published = true or (select private.is_admin('viewer')));

create policy "Editors can insert gallery items"
  on public.gallery_items
  for insert
  to authenticated
  with check ((select private.is_admin('editor')));

create policy "Editors can update gallery items"
  on public.gallery_items
  for update
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

create policy "Editors can delete gallery items"
  on public.gallery_items
  for delete
  to authenticated
  using ((select private.is_admin('editor')));

drop policy if exists "Published reports are public" on public.reports;
drop policy if exists "Admins can manage reports" on public.reports;

create policy "Published reports are public"
  on public.reports
  for select
  to anon
  using (is_published = true);

create policy "Published or admin reports are readable"
  on public.reports
  for select
  to authenticated
  using (is_published = true or (select private.is_admin('viewer')));

create policy "Editors can insert reports"
  on public.reports
  for insert
  to authenticated
  with check ((select private.is_admin('editor')));

create policy "Editors can update reports"
  on public.reports
  for update
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

create policy "Editors can delete reports"
  on public.reports
  for delete
  to authenticated
  using ((select private.is_admin('editor')));

drop policy if exists "Anyone can submit contact forms" on public.contact_submissions;
create policy "Anyone can submit contact forms"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (
    length(btrim(name)) between 2 and 200
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    and length(btrim(message)) between 2 and 5000
    and (phone is null or length(btrim(phone)) between 7 and 32)
    and status = 'new'
    and is_read = false
    and internal_notes is null
    and handled_by is null
    and handled_at is null
  );

drop policy if exists "Anyone can submit volunteer applications" on public.volunteer_applications;
create policy "Anyone can submit volunteer applications"
  on public.volunteer_applications
  for insert
  to anon, authenticated
  with check (
    length(btrim(name)) between 2 and 200
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    and length(btrim(phone)) between 7 and 32
    and length(btrim(focus_area)) between 2 and 120
    and (message is null or length(btrim(message)) between 2 and 5000)
    and status = 'new'
    and is_read = false
    and internal_notes is null
    and handled_by is null
    and handled_at is null
  );
