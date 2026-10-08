import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

// Validates the session against the database on every request.
// Call it from server code that needs the user; it must sit behind <Suspense>.
export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  const { id, name, email, image } = session.user;
  return { id, name, email, image };
});
