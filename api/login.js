import { clearCookie, isAdmin, json, passwordOk, sessionCookie } from "./_lib.js";

// GET: am I logged in?
export const GET = (request) => json({ authed: isAdmin(request) });

// POST { password }: log in
export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  if (!passwordOk(password)) {
    await new Promise((r) => setTimeout(r, 500)); // slow down guessing
    return json({ error: "Wrong password" }, 401);
  }
  return json({ authed: true }, 200, { "Set-Cookie": sessionCookie() });
}

// DELETE: log out
export const DELETE = () => json({ authed: false }, 200, { "Set-Cookie": clearCookie() });
