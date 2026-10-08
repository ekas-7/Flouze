import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { DEFAULT_TZ, isTimeZone } from "./dates";

// Validates the session against the database on every request.
// Call it from server code that needs the user; it must sit behind <Suspense>.
export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  const { id, name, email, image } = session.user;
  return { id, name, email, image };
});

/** The device's time zone, reported by <TimeZoneCookie />. */
export async function getTimeZone() {
  const tz = (await cookies()).get("tz")?.value;
  return tz && isTimeZone(tz) ? tz : DEFAULT_TZ;
}
