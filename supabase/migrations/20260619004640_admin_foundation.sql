-- Admin foundation for Unconditional Help Bhavnagar.
-- Creates the content, inbox, donation, settings, media, and audit tables used
-- by the admin dashboard. Public reads stay limited to published/public rows;
-- admin writes require both Supabase Auth and an active admin profile.

create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated, service_role;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.set_author_columns()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is not null then
    if tg_op = 'INSERT' and new.created_by is null then
      new.created_by = current_user_id;
    end if;

    new.updated_by = current_user_id;
  end if;

  return new;
end;
$$;

create or replace function private.set_updated_by()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is not null then
    new.updated_by = current_user_id;
  end if;

  return new;
end;
$$;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'owner',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_profiles_role_check check (role in ('owner', 'editor', 'viewer'))
);

create unique index if not exists admin_profiles_email_lower_idx
  on public.admin_profiles (lower(email));

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  category text not null,
  description text not null,
  content text not null,
  cover_image text not null default '',
  cover_image_alt text,
  gallery_images text[] not null default '{}'::text[],
  gallery_image_alts jsonb not null default '{}'::jsonb,
  youtube_video_id text,
  is_published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  constraint activities_slug_format_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index if not exists activities_public_idx
  on public.activities (is_published, created_at desc);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  date date not null,
  time text not null,
  location text not null,
  description text not null,
  cover_image text not null default '',
  cover_image_alt text,
  registration_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  constraint events_slug_format_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index if not exists events_public_idx
  on public.events (is_published, date asc);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  category text not null,
  title text not null,
  date text not null,
  location text not null,
  icon text not null default 'image',
  description text not null,
  gradient text not null default 'from-emerald-100 to-sky-100',
  border text not null default 'border-emerald-200',
  accent text not null default 'text-emerald-700',
  image_url text,
  image_alt text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create index if not exists gallery_items_public_idx
  on public.gallery_items (is_published, sort_order asc, created_at desc);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  bucket_id text not null default 'media',
  path text not null unique,
  public_url text not null,
  folder text,
  file_name text,
  mime_type text,
  size_bytes bigint,
  alt_text text,
  caption text,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create index if not exists media_assets_folder_idx
  on public.media_assets (folder, created_at desc);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'new',
  is_read boolean not null default false,
  internal_notes text,
  handled_by uuid references auth.users(id) on delete set null,
  handled_at timestamptz,
  constraint contact_submissions_status_check
    check (status in ('new', 'read', 'contacted', 'closed', 'archived'))
);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status, created_at desc);

create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  focus_area text not null,
  message text,
  status text not null default 'new',
  is_read boolean not null default false,
  internal_notes text,
  handled_by uuid references auth.users(id) on delete set null,
  handled_at timestamptz,
  constraint volunteer_applications_status_check
    check (status in ('new', 'contacted', 'approved', 'rejected', 'archived'))
);

create index if not exists volunteer_applications_status_idx
  on public.volunteer_applications (status, created_at desc);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  donor_name text,
  donor_email text,
  donor_phone text,
  amount numeric(12, 2) not null,
  currency text not null default 'INR',
  method text not null default 'upi',
  category text not null default 'general',
  transaction_ref text,
  donation_date date not null default current_date,
  receipt_status text not null default 'pending',
  verification_status text not null default 'unverified',
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  constraint donations_amount_check check (amount >= 0),
  constraint donations_method_check
    check (method in ('upi', 'bank', 'cash', 'other')),
  constraint donations_category_check
    check (category in (
      'food',
      'education',
      'animal',
      'environment',
      'general',
      'emergency',
      'community',
      'clothes'
    )),
  constraint donations_receipt_status_check
    check (receipt_status in ('not_required', 'pending', 'issued')),
  constraint donations_verification_status_check
    check (verification_status in ('unverified', 'verified', 'rejected'))
);

create index if not exists donations_date_idx
  on public.donations (donation_date desc, verification_status);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  report_type text not null default 'activity',
  report_year integer,
  description text,
  file_url text,
  external_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  constraint reports_type_check
    check (report_type in ('annual', 'financial', 'audit', 'activity', 'other'))
);

create index if not exists reports_public_idx
  on public.reports (is_published, report_year desc, created_at desc);

create table if not exists public.impact_stats (
  id text primary key default 'primary',
  meals_served integer not null default 0,
  trees_planted integer not null default 0,
  students_supported integer not null default 0,
  families_supported integer not null default 0,
  animals_served integer not null default 0,
  active_volunteers integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  constraint impact_stats_singleton_check check (id = 'primary'),
  constraint impact_stats_non_negative_check check (
    meals_served >= 0
    and trees_planted >= 0
    and students_supported >= 0
    and families_supported >= 0
    and animals_served >= 0
    and active_volunteers >= 0
  )
);

create table if not exists public.site_settings (
  id text primary key default 'primary',
  trust_name text not null,
  short_name text,
  tagline text,
  founded_on date,
  founder text,
  description text,
  phone text,
  whatsapp text,
  email text,
  location text,
  instagram_url text,
  facebook_url text,
  youtube_url text,
  twitter_url text,
  upi_id text,
  donation_qr_url text,
  bank_details jsonb not null default '{}'::jsonb,
  og_image_url text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  constraint site_settings_singleton_check check (id = 'primary')
);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  admin_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_table text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists admin_audit_logs_created_at_idx
  on public.admin_audit_logs (created_at desc);

insert into public.impact_stats (
  id,
  meals_served,
  trees_planted,
  active_volunteers
)
values (
  'primary',
  10000,
  5000,
  200
)
on conflict (id) do nothing;

insert into public.site_settings (
  id,
  trust_name,
  short_name,
  tagline,
  founded_on,
  founder,
  description,
  phone,
  whatsapp,
  email,
  location,
  bank_details
)
values (
  'primary',
  'Unconditional Help Bhavnagar',
  'UH Bhavnagar',
  'Secret For Better Life',
  date '2018-09-05',
  'Vivek Parmar',
  'Unconditional Help Bhavnagar is a charitable trust dedicated to serving humanity through food distribution, educational support, environmental protection, and animal welfare since 2018.',
  '7878767727',
  '917878767727',
  'unconditionalhelp.c.t.5@gmail.com',
  'Bhavnagar, Gujarat, India',
  '{}'::jsonb
)
on conflict (id) do nothing;

create or replace function private.is_admin(required_role text default 'viewer'::text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_profiles admin
    where admin.user_id = (select auth.uid())
      and admin.is_active
      and (
        admin.role = 'owner'
        or required_role is null
        or required_role = 'viewer'
        or (required_role = 'editor' and admin.role in ('editor', 'owner'))
      )
  );
$$;

grant execute on function private.is_admin(text) to authenticated, service_role;

drop trigger if exists set_admin_profiles_updated_at on public.admin_profiles;
create trigger set_admin_profiles_updated_at
  before update on public.admin_profiles
  for each row execute function private.set_updated_at();

drop trigger if exists set_activities_updated_at on public.activities;
create trigger set_activities_updated_at
  before update on public.activities
  for each row execute function private.set_updated_at();

drop trigger if exists set_activities_author on public.activities;
create trigger set_activities_author
  before insert or update on public.activities
  for each row execute function private.set_author_columns();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
  before update on public.events
  for each row execute function private.set_updated_at();

drop trigger if exists set_events_author on public.events;
create trigger set_events_author
  before insert or update on public.events
  for each row execute function private.set_author_columns();

drop trigger if exists set_gallery_items_updated_at on public.gallery_items;
create trigger set_gallery_items_updated_at
  before update on public.gallery_items
  for each row execute function private.set_updated_at();

drop trigger if exists set_gallery_items_author on public.gallery_items;
create trigger set_gallery_items_author
  before insert or update on public.gallery_items
  for each row execute function private.set_author_columns();

drop trigger if exists set_media_assets_updated_at on public.media_assets;
create trigger set_media_assets_updated_at
  before update on public.media_assets
  for each row execute function private.set_updated_at();

drop trigger if exists set_media_assets_author on public.media_assets;
create trigger set_media_assets_author
  before insert or update on public.media_assets
  for each row execute function private.set_author_columns();

drop trigger if exists set_contact_submissions_updated_at on public.contact_submissions;
create trigger set_contact_submissions_updated_at
  before update on public.contact_submissions
  for each row execute function private.set_updated_at();

drop trigger if exists set_volunteer_applications_updated_at on public.volunteer_applications;
create trigger set_volunteer_applications_updated_at
  before update on public.volunteer_applications
  for each row execute function private.set_updated_at();

drop trigger if exists set_donations_updated_at on public.donations;
create trigger set_donations_updated_at
  before update on public.donations
  for each row execute function private.set_updated_at();

drop trigger if exists set_donations_author on public.donations;
create trigger set_donations_author
  before insert or update on public.donations
  for each row execute function private.set_author_columns();

drop trigger if exists set_reports_updated_at on public.reports;
create trigger set_reports_updated_at
  before update on public.reports
  for each row execute function private.set_updated_at();

drop trigger if exists set_reports_author on public.reports;
create trigger set_reports_author
  before insert or update on public.reports
  for each row execute function private.set_author_columns();

drop trigger if exists set_impact_stats_updated_at on public.impact_stats;
create trigger set_impact_stats_updated_at
  before update on public.impact_stats
  for each row execute function private.set_updated_at();

drop trigger if exists set_impact_stats_updated_by on public.impact_stats;
create trigger set_impact_stats_updated_by
  before update on public.impact_stats
  for each row execute function private.set_updated_by();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
  before update on public.site_settings
  for each row execute function private.set_updated_at();

drop trigger if exists set_site_settings_updated_by on public.site_settings;
create trigger set_site_settings_updated_by
  before update on public.site_settings
  for each row execute function private.set_updated_by();

alter table public.admin_profiles enable row level security;
alter table public.activities enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.media_assets enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.donations enable row level security;
alter table public.reports enable row level security;
alter table public.impact_stats enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_audit_logs enable row level security;

grant usage on schema public to anon, authenticated, service_role;

revoke all on table
  public.admin_profiles,
  public.activities,
  public.events,
  public.gallery_items,
  public.media_assets,
  public.contact_submissions,
  public.volunteer_applications,
  public.donations,
  public.reports,
  public.impact_stats,
  public.site_settings,
  public.admin_audit_logs
from anon, authenticated;

grant select on table
  public.activities,
  public.events,
  public.gallery_items,
  public.reports,
  public.impact_stats,
  public.site_settings
to anon, authenticated;

grant select, insert, update, delete on table
  public.admin_profiles,
  public.activities,
  public.events,
  public.gallery_items,
  public.media_assets,
  public.donations,
  public.reports
to authenticated;

grant update on table
  public.impact_stats,
  public.site_settings
to authenticated;

grant insert (name, email, phone, message)
  on table public.contact_submissions
to anon, authenticated;

grant insert (name, email, phone, focus_area, message)
  on table public.volunteer_applications
to anon, authenticated;

grant select, update, delete on table
  public.contact_submissions,
  public.volunteer_applications
to authenticated;

grant select, insert on table public.admin_audit_logs to authenticated;

grant select, insert, update, delete on table
  public.admin_profiles,
  public.activities,
  public.events,
  public.gallery_items,
  public.media_assets,
  public.contact_submissions,
  public.volunteer_applications,
  public.donations,
  public.reports,
  public.impact_stats,
  public.site_settings,
  public.admin_audit_logs
to service_role;

drop policy if exists "Users can read their own admin profile" on public.admin_profiles;
create policy "Users can read their own admin profile"
  on public.admin_profiles
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Admins can manage admin profiles" on public.admin_profiles;
create policy "Admins can manage admin profiles"
  on public.admin_profiles
  for all
  to authenticated
  using ((select private.is_admin('owner')))
  with check ((select private.is_admin('owner')));

drop policy if exists "Published activities are public" on public.activities;
create policy "Published activities are public"
  on public.activities
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can manage activities" on public.activities;
create policy "Admins can manage activities"
  on public.activities
  for all
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

drop policy if exists "Published events are public" on public.events;
create policy "Published events are public"
  on public.events
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can manage events" on public.events;
create policy "Admins can manage events"
  on public.events
  for all
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

drop policy if exists "Published gallery items are public" on public.gallery_items;
create policy "Published gallery items are public"
  on public.gallery_items
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can manage gallery items" on public.gallery_items;
create policy "Admins can manage gallery items"
  on public.gallery_items
  for all
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

drop policy if exists "Admins can manage media assets" on public.media_assets;
create policy "Admins can manage media assets"
  on public.media_assets
  for all
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

drop policy if exists "Anyone can submit contact forms" on public.contact_submissions;
create policy "Anyone can submit contact forms"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read contact submissions" on public.contact_submissions;
create policy "Admins can read contact submissions"
  on public.contact_submissions
  for select
  to authenticated
  using ((select private.is_admin('viewer')));

drop policy if exists "Admins can update contact submissions" on public.contact_submissions;
create policy "Admins can update contact submissions"
  on public.contact_submissions
  for update
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

drop policy if exists "Admins can delete contact submissions" on public.contact_submissions;
create policy "Admins can delete contact submissions"
  on public.contact_submissions
  for delete
  to authenticated
  using ((select private.is_admin('editor')));

drop policy if exists "Anyone can submit volunteer applications" on public.volunteer_applications;
create policy "Anyone can submit volunteer applications"
  on public.volunteer_applications
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read volunteer applications" on public.volunteer_applications;
create policy "Admins can read volunteer applications"
  on public.volunteer_applications
  for select
  to authenticated
  using ((select private.is_admin('viewer')));

drop policy if exists "Admins can update volunteer applications" on public.volunteer_applications;
create policy "Admins can update volunteer applications"
  on public.volunteer_applications
  for update
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

drop policy if exists "Admins can delete volunteer applications" on public.volunteer_applications;
create policy "Admins can delete volunteer applications"
  on public.volunteer_applications
  for delete
  to authenticated
  using ((select private.is_admin('editor')));

drop policy if exists "Admins can manage donations" on public.donations;
create policy "Admins can manage donations"
  on public.donations
  for all
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

drop policy if exists "Published reports are public" on public.reports;
create policy "Published reports are public"
  on public.reports
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can manage reports" on public.reports;
create policy "Admins can manage reports"
  on public.reports
  for all
  to authenticated
  using ((select private.is_admin('editor')))
  with check ((select private.is_admin('editor')));

drop policy if exists "Impact stats are public" on public.impact_stats;
create policy "Impact stats are public"
  on public.impact_stats
  for select
  to anon, authenticated
  using (id = 'primary');

drop policy if exists "Admins can update impact stats" on public.impact_stats;
create policy "Admins can update impact stats"
  on public.impact_stats
  for update
  to authenticated
  using ((select private.is_admin('editor')) and id = 'primary')
  with check ((select private.is_admin('editor')) and id = 'primary');

drop policy if exists "Site settings are public" on public.site_settings;
create policy "Site settings are public"
  on public.site_settings
  for select
  to anon, authenticated
  using (id = 'primary');

drop policy if exists "Admins can update site settings" on public.site_settings;
create policy "Admins can update site settings"
  on public.site_settings
  for update
  to authenticated
  using ((select private.is_admin('editor')) and id = 'primary')
  with check ((select private.is_admin('editor')) and id = 'primary');

drop policy if exists "Admins can read audit logs" on public.admin_audit_logs;
create policy "Admins can read audit logs"
  on public.admin_audit_logs
  for select
  to authenticated
  using ((select private.is_admin('viewer')));

drop policy if exists "Admins can insert audit logs" on public.admin_audit_logs;
create policy "Admins can insert audit logs"
  on public.admin_audit_logs
  for insert
  to authenticated
  with check ((select private.is_admin('editor')));

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'media',
  'media',
  true,
  10485760,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can read media bucket objects" on storage.objects;
create policy "Admins can read media bucket objects"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'media'
    and (select private.is_admin('viewer'))
  );

drop policy if exists "Admins can upload media bucket objects" on storage.objects;
create policy "Admins can upload media bucket objects"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'media'
    and (select private.is_admin('editor'))
    and coalesce((storage.foldername(name))[1], '') = any (
      array['activities', 'events', 'gallery', 'reports', 'settings', 'media-library']
    )
  );

drop policy if exists "Admins can update media bucket objects" on storage.objects;
create policy "Admins can update media bucket objects"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'media'
    and (select private.is_admin('editor'))
  )
  with check (
    bucket_id = 'media'
    and (select private.is_admin('editor'))
    and coalesce((storage.foldername(name))[1], '') = any (
      array['activities', 'events', 'gallery', 'reports', 'settings', 'media-library']
    )
  );

drop policy if exists "Admins can delete media bucket objects" on storage.objects;
create policy "Admins can delete media bucket objects"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'media'
    and (select private.is_admin('editor'))
  );
