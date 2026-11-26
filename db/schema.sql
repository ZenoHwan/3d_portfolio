-- Blog posts. Apply with: node --env-file=.env.local db/apply.js
create table if not exists posts (
  -- slug is the URL (/blog/<slug>); the check keeps it URL-safe at the database level
  slug        text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title       text not null check (title <> ''),
  description text not null default '',
  date        date not null default current_date,
  tags        text[] not null default '{}',
  draft       boolean not null default true,
  markdown    text not null default '',
  updated_at  timestamptz not null default now()
);
