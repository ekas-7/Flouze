export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-accent">
        Flouze
      </h1>
      <p className="text-foreground/60">Make money moves.</p>
      <p className="standalone:hidden mt-8 text-sm text-foreground/40">
        Install: tap Share, then &ldquo;Add to Home Screen&rdquo;.
      </p>
    </main>
  );
}
