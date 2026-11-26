// Creates the posts table (safe to re-run). Usage: node --env-file=.env.local db/apply.js
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
await sql.query(fs.readFileSync(new URL("./schema.sql", import.meta.url), "utf8"));
console.log("posts table ready");
