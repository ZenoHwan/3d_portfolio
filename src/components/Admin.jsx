import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import "highlight.js/styles/github-dark.css";

import { styles } from "../styles";

const api = async (url, options) => {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json" },
    body: options?.body && JSON.stringify(options.body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
};

const today = () => new Date().toISOString().slice(0, 10);
const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const blank = () => ({ slug: "", title: "", description: "", date: today(), tags: [], draft: true, markdown: "" });

const input =
  "w-full bg-surface border border-border px-3 py-2 text-[14px] text-text font-mono outline-none focus:border-accent";
const button =
  "border border-accent text-accent px-3 py-1.5 text-[13px] font-semibold hover:bg-accent hover:text-primary transition-colors disabled:opacity-50 disabled:pointer-events-none";
const ghost = "text-[13px] text-muted hover:text-accent transition-colors";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-[12px] text-muted mb-1">{label}</span>
    {children}
  </label>
);

const Login = ({ onDone }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/login", { method: "POST", body: { password } });
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-8 max-w-sm flex flex-col gap-4">
      <Field label="password">
        <input
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      {error && <p role="alert" className="text-warn text-[13px]">{error}</p>}
      <button className={`${button} self-start`} disabled={busy}>
        {busy ? "checking…" : "login"}
      </button>
    </form>
  );
};

// `original` is the slug as stored (null for a new post) — the slug itself is editable.
const Editor = ({ original, onClose }) => {
  const [post, setPost] = useState(original ? null : blank());
  const [slugTouched, setSlugTouched] = useState(Boolean(original));
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!original) return;
    api(`/api/posts?slug=${encodeURIComponent(original)}`)
      .then(({ post }) => setPost(post))
      .catch((err) => setStatus(err.message));
  }, [original]);

  // Preview only: the published page is rendered on the server, with code highlighting.
  const preview = useMemo(() => (post ? marked.parse(post.markdown) : ""), [post?.markdown]);

  if (!post) return <p className="mt-8 text-muted text-[14px]">{status || "loading…"}</p>;

  const set = (patch) => setPost((p) => ({ ...p, ...patch }));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await api(original ? `/api/posts?slug=${encodeURIComponent(original)}` : "/api/posts", {
        method: original ? "PUT" : "POST",
        body: post,
      });
      onClose();
    } catch (err) {
      setStatus(err.message);
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await api(`/api/posts?slug=${encodeURIComponent(original)}`, { method: "DELETE" });
      onClose();
    } catch (err) {
      setStatus(err.message);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="mt-6 flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="title">
          <input
            required
            className={input}
            value={post.title}
            onChange={(e) =>
              set({ title: e.target.value, ...(!slugTouched && { slug: slugify(e.target.value) }) })
            }
          />
        </Field>
        <Field label="slug — the URL: /blog/<slug>">
          <input
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="lowercase letters, numbers and dashes"
            className={input}
            value={post.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set({ slug: e.target.value });
            }}
          />
        </Field>
      </div>

      <Field label="description — shown in Google and link previews">
        <input className={input} value={post.description} onChange={(e) => set({ description: e.target.value })} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] items-end">
        <Field label="date">
          <input type="date" required className={input} value={post.date} onChange={(e) => set({ date: e.target.value })} />
        </Field>
        <Field label="tags — comma separated">
          <input
            className={input}
            value={post.tags.join(", ")}
            onChange={(e) => set({ tags: e.target.value.split(",").map((t) => t.trimStart()) })}
          />
        </Field>
        <label className="flex items-center gap-2 text-[14px] text-text min-h-10 cursor-pointer">
          <input
            type="checkbox"
            className="accent-(--color-accent) w-4 h-4"
            checked={!post.draft}
            onChange={(e) => set({ draft: !e.target.checked })}
          />
          published
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="markdown">
          <textarea
            className={`${input} min-h-[60vh] leading-relaxed resize-y`}
            spellCheck
            value={post.markdown}
            onChange={(e) => set({ markdown: e.target.value })}
          />
        </Field>
        <div>
          <span className="block text-[12px] text-muted mb-1">preview</span>
          <div
            className="prose-tui border border-border p-4 min-h-[60vh] max-h-[80vh] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </div>

      {status && <p role="alert" className="text-warn text-[13px]">{status}</p>}

      <div className="flex flex-wrap items-center gap-4">
        <button className={button} disabled={busy}>
          {busy ? "saving…" : "save"}
        </button>
        <button type="button" className={ghost} onClick={onClose}>
          cancel
        </button>
        {original && (
          <button type="button" className={`${ghost} ml-auto hover:text-warn`} onClick={remove} disabled={busy}>
            delete post
          </button>
        )}
      </div>
    </form>
  );
};

const PostList = ({ onEdit }) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/posts")
      .then(({ posts }) => setPosts(posts))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p role="alert" className="mt-8 text-warn text-[14px]">{error}</p>;
  if (!posts) return <p className="mt-8 text-muted text-[14px]">loading…</p>;

  return (
    <>
      <button className={`${button} mt-6`} onClick={() => onEdit(null)}>
        + new post
      </button>
      {posts.length === 0 ? (
        <p className="mt-8 text-muted text-[14px]">No posts yet.</p>
      ) : (
        <ul className="mt-6 list-none border-t border-border">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-border">
              <button
                className="w-full text-left py-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 hover:text-accent transition-colors"
                onClick={() => onEdit(p.slug)}
              >
                <span className="text-[12px] text-muted">{p.date}</span>
                <span className="text-[15px] font-semibold">{p.title}</span>
                <span className={`text-[12px] ml-auto ${p.draft ? "text-warn" : "text-accent"}`}>
                  {p.draft ? "[draft]" : "[published]"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Admin = () => {
  const [authed, setAuthed] = useState(null); // null = checking
  const [editing, setEditing] = useState(undefined); // undefined = list, null = new post, string = slug

  useEffect(() => {
    document.title = "Admin | Hwan";
    api("/api/login")
      .then(({ authed }) => setAuthed(authed))
      .catch(() => setAuthed(false));
  }, []);

  const logout = async () => {
    await api("/api/login", { method: "DELETE" });
    setAuthed(false);
  };

  return (
    <main className={`${styles.paddingX} max-w-7xl mx-auto pt-28 pb-20 min-h-screen font-mono`}>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-text font-bold text-[22px]">
          <span className="text-accent">&gt;</span> sudo ./blog
        </h1>
        {authed && (
          <button className={ghost} onClick={logout}>
            logout
          </button>
        )}
      </div>

      {authed === null ? (
        <p className="mt-8 text-muted text-[14px]">checking session…</p>
      ) : !authed ? (
        <Login onDone={() => setAuthed(true)} />
      ) : editing === undefined ? (
        <PostList onEdit={setEditing} />
      ) : (
        <Editor key={editing ?? "new"} original={editing} onClose={() => setEditing(undefined)} />
      )}
    </main>
  );
};

export default Admin;
