import { clearCookie, configured, isAdmin, json, passwordOk, sessionCookie } from "./_lib.js";

// GET: am I logged in?
export const GET = (request) => json({ authed: isAdmin(request) });

// POST { password }: log in
export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  // Say so plainly when the server-side password is unusable; otherwise every attempt looks like a typo.
  if (!configured())
    return json({ error: "ADMIN_PASSWORD is not set, or is shorter than 12 characters. Set a longer one in Vercel and redeploy." }, 503);
  if (!passwordOk(password)) {
    await new Promise((r) => setTimeout(r, 500)); // slow down guessing
    return json({ error: "Wrong password" }, 401);
  }
  return json({ authed: true }, 200, { "Set-Cookie": sessionCookie() });
}

// DELETE: log out
export const DELETE = () => json({ authed: false }, 200, { "Set-Cookie": clearCookie() });
