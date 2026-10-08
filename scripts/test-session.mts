// Dev only: creates (or reuses) a test user and prints a signed session cookie,
// so the app can be exercised without Google. `--cleanup` deletes the user and their data.
// Run: pnpm dlx tsx --env-file=.env scripts/test-session.mts [--cleanup]
import { createHmac } from "node:crypto";
import { auth } from "../src/lib/auth";
import { db } from "../src/lib/db";

const email = "test@flouze.local";
const ctx = await auth.$context;
const existing = await db.user.findUnique({ where: { email } });

if (process.argv.includes("--cleanup")) {
  if (existing) {
    await db.transaction.deleteMany({ where: { userId: existing.id } });
    await db.user.delete({ where: { id: existing.id } });
  }
  console.log("cleaned up");
} else {
  const user = existing ?? (await ctx.internalAdapter.createUser({ email, name: "Test Cat", emailVerified: true }, { method: "admin" }));
  const session = await ctx.internalAdapter.createSession(user.id);
  // Same format as better-call's signCookieValue: token.base64(HMAC-SHA256), URI-encoded.
  const signature = createHmac("sha256", ctx.secret).update(session.token).digest("base64");
  console.log(`${ctx.authCookies.sessionToken.name}=${encodeURIComponent(`${session.token}.${signature}`)}`);
}
await db.$disconnect();
