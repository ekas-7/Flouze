import { GoogleSignIn } from "@/components/google-sign-in";
import { Mascot } from "@/components/ui";

export default function SignIn() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <Mascot className="w-40" />
      <h1 className="text-5xl font-bold tracking-tight">Flouze</h1>
      <p className="text-ink/60">Log every expense in seconds.</p>
      <GoogleSignIn />
      <p className="standalone:hidden mt-8 text-sm text-ink/40">
        Install: tap Share, then &ldquo;Add to Home Screen&rdquo;.
      </p>
    </main>
  );
}
