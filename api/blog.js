// Serves /blog, /blog/<slug> and /sitemap.xml (see rewrites in vercel.json).
// Takes the app's index.html and fills in the real title, description and article HTML,
// so crawlers and link previews get content without running JS. React then takes over,
// reusing the embedded data instead of fetching it again.
import { renderMarkdown, sql } from "./_lib.js";

// Edits show up within about a minute; the CDN serves the stale page while it refreshes.
const CACHE = "public, s-maxage=60, stale-while-revalidate=600";

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const ROOT = '<div id="root"></div>';
let template; // one deployment = one index.html, so caching it per instance is safe
async function getTemplate(request) {
  if (!template) {
    // ponytail: fetched over HTTP from this same deployment; bundle it with includeFiles if that hop ever matters.
    const res = await fetch(new URL("/index.html", request.url));
    const html = await res.text();
    if (!res.ok || !html.includes(ROOT)) throw new Error("blog: could not load the index.html template");
    template = html;
  }
  return template;
}

// Function replacers throughout: article HTML may contain "$", which string replacers interpret.
function page(tpl, { site, urlPath, title, description, type, body, data, status = 200 }) {
  const head = [
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:url" content="${site}${urlPath}" />`,
    `<meta name="twitter:card" content="summary" />`,
    status === 200 ? `<link rel="canonical" href="${site}${urlPath}" />` : `<meta name="robots" content="noindex" />`,
    // "<" is escaped so post content can never close the script tag
    `<script>window.__BLOG__=${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
  const html = tpl
    .replace(/<title>.*?<\/title>/, () => `<title>${esc(title)}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*/, (_, p) => p + esc(title))
    .replace(/(<meta name="description" content=")[^"]*/, (_, p) => p + esc(description))
    .replace("</head>", () => `  ${head}\n  </head>`)
    .replace(ROOT, () => `<div id="root"><main class="prose-tui">${body}</main></div>`);
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": status === 200 ? CACHE : "no-store" },
  });
}

export async function GET(request) {
  const url = new URL(request.url);
  const site = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : url.origin;
  const slug = url.searchParams.get("slug");

  if (url.searchParams.has("sitemap")) {
    const posts = await sql`select slug, to_char(date, 'YYYY-MM-DD') as date from posts where not draft order by date desc`;
    const urls = [["/", ""], ["/blog", ""], ...posts.map((p) => [`/blog/${p.slug}`, p.date])];
    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map(([u, d]) => `  <url><loc>${site}${u}</loc>${d && `<lastmod>${d}</lastmod>`}</url>`).join("\n") +
      `\n</urlset>\n`;
    return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": CACHE } });
  }

  const tpl = await getTemplate(request);

  if (!slug) {
    const posts = await sql`
      select slug, title, description, to_char(date, 'YYYY-MM-DD') as date, tags, draft
      from posts where not draft order by date desc, slug`;
    return page(tpl, {
      site,
      urlPath: "/blog",
      title: "Blog | Hwan",
      description: "Notes on software engineering by Hwan Chin Yang.",
      type: "website",
      data: { posts },
      body:
        `<h1>Blog</h1><ul>` +
        posts
          .map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a> — ${p.date}<br />${esc(p.description)}</li>`)
          .join("") +
        `</ul>`,
    });
  }

  const [row] = await sql`
    select slug, title, description, to_char(date, 'YYYY-MM-DD') as date, tags, draft, markdown
    from posts where slug = ${slug} and not draft`;
  if (!row)
    return page(tpl, {
      site,
      urlPath: `/blog/${slug}`,
      title: "Not found | Hwan",
      description: "",
      type: "website",
      data: {},
      body: `<h1>Not found</h1><p><a href="/blog">← blog</a></p>`,
      status: 404,
    });

  const { markdown, ...post } = row;
  post.html = renderMarkdown(markdown);
  return page(tpl, {
    site,
    urlPath: `/blog/${post.slug}`,
    title: `${post.title} | Hwan`,
    description: post.description,
    type: "article",
    data: { post },
    body: `<p><a href="/blog">← blog</a></p><h1>${esc(post.title)}</h1><p><time datetime="${post.date}">${post.date}</time></p>${post.html}`,
  });
}
