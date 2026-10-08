import { Suspense } from "react";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "./actions";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-6 px-6 py-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-accent">
        Flouze
      </h1>
      <Suspense fallback={<p className="text-foreground/40">Loading…</p>}>
        <Account />
      </Suspense>
    </main>
  );
}

async function Account() {
  const user = await getCurrentUser();
  return (
    <>
      <p className="text-foreground/60">Hi {user.name.split(" ")[0]}, expense logging is coming next.</p>
      <form action={signOut} className="mt-auto">
        <p className="mb-3 text-sm text-foreground/40">Signed in as {user.email}</p>
        <button className="w-full rounded-full border border-foreground/20 py-3.5 font-semibold active:opacity-80">
          Sign out
        </button>
      </form>
    </>
  );
}
