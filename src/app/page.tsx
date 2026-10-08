import { Suspense } from "react";
import { Button } from "@/components/ui";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "./actions";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-6 px-6 py-6">
      <h1 className="text-[34px] font-bold tracking-tight">Flouze</h1>
      <Suspense fallback={<p className="text-ink/40">Loading…</p>}>
        <Account />
      </Suspense>
    </main>
  );
}

async function Account() {
  const user = await getCurrentUser();
  return (
    <>
      <p className="text-ink/60">Hi {user.name.split(" ")[0]}, expense logging is coming next.</p>
      <form action={signOut} className="mt-auto">
        <p className="mb-3 text-sm text-ink/40">Signed in as {user.email}</p>
        <Button variant="soft">Sign out</Button>
      </form>
    </>
  );
}
