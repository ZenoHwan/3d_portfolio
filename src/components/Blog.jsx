import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "highlight.js/styles/github-dark.css";

import { styles } from "../styles";

// Posts live in the database. When /blog or /blog/<slug> is the first page loaded, api/blog.js
// has already embedded the data in the HTML (window.__BLOG__); otherwise it is fetched.
const boot = window.__BLOG__ || {};

function useApi(url, initial) {
  const [state, setState] = useState({ data: initial, error: null });
  useEffect(() => {
    if (initial) return setState({ data: initial, error: null });
    let live = true;
    setState({ data: null, error: null });
    fetch(url)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || res.statusText);
        if (live) setState({ data: body, error: null });
      })
      .catch((error) => live && setState({ data: null, error }));
    return () => {
      live = false;
    };
  }, [url, initial]);
  return state;
}

const Status = ({ children }) => <p className="mt-8 text-muted text-[14px]">{children}</p>;

const shell = `${styles.paddingX} max-w-5xl mx-auto pt-28 pb-20 min-h-screen font-mono`;

const useTitle = (title) =>
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);

const Meta = ({ post }) => (
  <p className="text-[12px] text-muted flex flex-wrap gap-x-3 gap-y-1">
    <time dateTime={post.date}>{post.date}</time>
    {post.tags.map((tag) => (
      <span key={tag} className="text-accent">
        #{tag}
      </span>
    ))}
    {post.draft && <span className="text-warn">[draft]</span>}
  </p>
);

export const BlogList = () => {
  useTitle("Blog | Hwan");
  const { data, error } = useApi("/api/posts", boot.posts && boot);
  const posts = data?.posts;
  return (
    <main className={shell}>
      <p className={styles.sectionSubText}>// blog</p>
      <h1 className={`${styles.sectionHeadText} mt-2`}>
        <span className="text-accent">&gt;</span> ls ./blog
      </h1>

      {error ? (
        <Status>error: {error.message}</Status>
      ) : !posts ? (
        <Status>loading…</Status>
      ) : posts.length === 0 ? (
        <Status>total 0 — nothing published yet.</Status>
      ) : (
        <ul className="mt-8 list-none">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <Link to={`/blog/${post.slug}`} className="group block py-6">
                <Meta post={post} />
                <h2 className="mt-2 text-text text-[19px] sm:text-[21px] font-bold leading-snug group-hover:text-accent transition-colors">
                  <span className="text-accent">→</span> {post.title}
                </h2>
                {post.description && (
                  <p className="mt-2 text-muted text-[15px] leading-[26px] font-sans">{post.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export const BlogPost = () => {
  const { slug } = useParams();
  const { data, error } = useApi(
    `/api/posts?slug=${encodeURIComponent(slug)}`,
    boot.post?.slug === slug && boot
  );
  const post = data?.post;
  useTitle(post ? `${post.title} | Hwan` : "Blog | Hwan");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <main className={shell}>
      <Link to="/blog" className="text-[13px] text-muted hover:text-accent transition-colors">
        <span className="text-accent">$</span> cd ../blog
      </Link>

      {post ? (
        <article className="mt-8">
          <Meta post={post} />
          <h1 className="mt-3 text-text font-bold text-[clamp(1.625rem,5vw,2.5rem)] leading-[1.2] tracking-tight text-balance">
            {post.title}
          </h1>
          {/* HTML is rendered on the server from markdown that only the admin can write. */}
          <div className="prose-tui mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      ) : error ? (
        <Status>cat: {slug}: {error.message === "Not found" ? "No such file or directory" : error.message}</Status>
      ) : (
        <Status>loading…</Status>
      )}
    </main>
  );
};
