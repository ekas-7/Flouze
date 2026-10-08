import { signInWithGoogle } from "../actions";

export default function SignIn() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-accent">
        Flouze
      </h1>
      <p className="text-foreground/60">Log every expense in seconds.</p>
      <form action={signInWithGoogle} className="mt-8 w-full max-w-xs">
        <button className="w-full rounded-full bg-foreground py-3.5 font-semibold text-background active:opacity-80">
          Continue with Google
        </button>
      </form>
      <p className="standalone:hidden mt-8 text-sm text-foreground/40">
        Install: tap Share, then &ldquo;Add to Home Screen&rdquo;.
      </p>
    </main>
  );
}
