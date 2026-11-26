// Shared by the functions in api/ (the leading underscore keeps Vercel from exposing this as a route).
import crypto from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

// --- database -------------------------------------------------------------
let _sql;
// Lazy so a missing DATABASE_URL fails the request, not module load.
export const sql = (...args) => (_sql ??= neon(process.env.DATABASE_URL))(...args);

// --- markdown -------------------------------------------------------------
const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight: (code, lang) =>
      hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : "plaintext" }).value,
  })
);
// Markdown is written only by the logged-in admin, so its HTML is trusted and not sanitised.
export const renderMarkdown = (md) => marked.parse(md ?? "");

// --- admin session --------------------------------------------------------
// One admin, one password (ADMIN_PASSWORD env var). The session cookie is an expiry
// timestamp signed with the password, so changing the password logs everyone out.
// ponytail: no login rate limiter; the 12-char minimum makes online guessing impractical.
// Add a Vercel Firewall rate-limit rule on /api/login if this ever gets more than one user.
const SESSION_DAYS = 7;
const MIN_PASSWORD = 12;
const password = () => process.env.ADMIN_PASSWORD || "";
const configured = () => password().length >= MIN_PASSWORD;
const digest = (s) => crypto.createHash("sha256").update(String(s)).digest();
const safeEqual = (a, b) => crypto.timingSafeEqual(digest(a), digest(b));
const sign = (exp) => crypto.createHmac("sha256", password()).update(`session.${exp}`).digest("hex");

export const passwordOk = (candidate) =>
  configured() && typeof candidate === "string" && safeEqual(candidate, password());

const cookie = (value, maxAge) =>
  `session=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
export const sessionCookie = () => {
  const exp = Date.now() + SESSION_DAYS * 864e5;
  return cookie(`${exp}.${sign(exp)}`, SESSION_DAYS * 86400);
};
export const clearCookie = () => cookie("", 0);

export const isAdmin = (request) => {
  const m = /(?:^|;\s*)session=(\d+)\.([0-9a-f]+)/.exec(request.headers.get("cookie") || "");
  return Boolean(m) && configured() && Number(m[1]) > Date.now() && safeEqual(m[2], sign(m[1]));
};

// --- responses ------------------------------------------------------------
export const json = (data, status = 200, headers = {}) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store", ...headers } });
