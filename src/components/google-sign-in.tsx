"use client";

import { useActionState } from "react";
import { signInWithGoogle } from "@/app/actions";
import { Button } from "@/components/ui";

export function GoogleSignIn() {
  const [state, action, pending] = useActionState(signInWithGoogle, null);
  return (
    <form action={action} className="mt-8 w-full max-w-xs">
      <Button disabled={pending}>{pending ? "Opening Google…" : "Continue with Google"}</Button>
      {state?.error && (
        <p role="alert" className="mt-3 text-sm font-medium text-expense">
          {state.error}
        </p>
      )}
    </form>
  );
}
