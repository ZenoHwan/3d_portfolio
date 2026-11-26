// /api/posts            GET list · POST create (admin)
// /api/posts?slug=x     GET one · PUT update (admin) · DELETE (admin)
// Visitors only ever see published posts; the admin also sees drafts and raw markdown.
import { isAdmin, json, renderMarkdown, sql } from "./_lib.js";

const slugOf = (request) => new URL(request.url).searchParams.get("slug");

export async function GET(request) {
  const admin = isAdmin(request);
  const slug = slugOf(request);

  if (!slug) {
    const posts = await sql`
      select slug, title, description, to_char(date, 'YYYY-MM-DD') as date, tags, draft
      from posts where (${admin} or not draft) order by date desc, slug`;
    return json({ posts });
  }

  const [post] = await sql`
    select slug, title, description, to_char(date, 'YYYY-MM-DD') as date, tags, draft, markdown
    from posts where slug = ${slug} and (${admin} or not draft)`;
  if (!post) return json({ error: "Not found" }, 404);

  const { markdown, ...rest } = post;
  return json({ post: { ...rest, html: renderMarkdown(markdown), ...(admin && { markdown }) } });
}

// Normalise the editor's payload; the database constraints do the real validation.
const fields = (body) => ({
  slug: String(body.slug ?? "").trim(),
  title: String(body.title ?? "").trim(),
  description: String(body.description ?? "").trim(),
  date: /^\d{4}-\d{2}-\d{2}$/.test(body.date) ? body.date : new Date().toISOString().slice(0, 10),
  tags: Array.isArray(body.tags) ? body.tags.map((t) => String(t).trim()).filter(Boolean) : [],
  draft: body.draft !== false,
  markdown: String(body.markdown ?? ""),
});

// Postgres error codes → messages the editor can show.
const dbError = (e) => {
  if (e.code === "23505") return json({ error: "A post with that slug already exists" }, 409);
  if (e.code === "23514") return json({ error: "Title is required, and the slug may only use lowercase letters, numbers and dashes" }, 400);
  throw e;
};

async function write(request, run) {
  if (!isAdmin(request)) return json({ error: "Not logged in" }, 401);
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: "Invalid JSON" }, 400);
  try {
    const [saved] = await run(fields(body));
    return saved ? json({ slug: saved.slug }) : json({ error: "Not found" }, 404);
  } catch (e) {
    return dbError(e);
  }
}

export const POST = (request) =>
  write(request, (p) => sql`
    insert into posts (slug, title, description, date, tags, draft, markdown)
    values (${p.slug}, ${p.title}, ${p.description}, ${p.date}, ${p.tags}, ${p.draft}, ${p.markdown})
    returning slug`);

export const PUT = (request) =>
  write(request, (p) => sql`
    update posts set slug = ${p.slug}, title = ${p.title}, description = ${p.description}, date = ${p.date},
      tags = ${p.tags}, draft = ${p.draft}, markdown = ${p.markdown}, updated_at = now()
    where slug = ${slugOf(request)}
    returning slug`);

export async function DELETE(request) {
  if (!isAdmin(request)) return json({ error: "Not logged in" }, 401);
  const [gone] = await sql`delete from posts where slug = ${slugOf(request)} returning slug`;
  return gone ? json({ slug: gone.slug }) : json({ error: "Not found" }, 404);
}
