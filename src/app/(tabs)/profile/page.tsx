import { Suspense } from "react";
import { Button, LoadingLabel, Skeleton } from "@/components/ui";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "../../actions";

export const metadata = { title: "Profile · Flouze" };

export default function Profile() {
  return (
    <main className="flex flex-1 flex-col px-5 pt-4 pb-36">
      <h1 className="text-[34px] font-bold leading-none tracking-tight">Profile</h1>
      <Suspense fallback={<Loading />}>
        <Account />
      </Suspense>
    </main>
  );
}

function Loading() {
  return (
    <div className="mt-6 flex items-center gap-4 rounded-card bg-card p-4 shadow-soft">
      <LoadingLabel />
      <Skeleton className="size-14 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2.5">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-3 w-44 rounded-full" />
      </div>
    </div>
  );
}

async function Account() {
  const user = await getCurrentUser();
  return (
    <>
      <div className="mt-6 flex items-center gap-4 rounded-card bg-card p-4 shadow-soft">
        <span className="grid size-14 place-items-center rounded-full bg-peach text-2xl font-bold text-peach-ink">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold">{user.name}</p>
          <p className="truncate text-sm text-ink/60">{user.email}</p>
        </div>
      </div>
      <form action={signOut} className="mt-6">
        <Button variant="soft">Sign out</Button>
      </form>
    </>
  );
}
