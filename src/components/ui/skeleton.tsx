/** Pulsing placeholder shape. Give it a size and a radius. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`block bg-oat motion-safe:animate-pulse ${className}`} />;
}

/** Put once in every skeleton screen so screen readers hear it. */
export function LoadingLabel() {
  return (
    <p role="status" className="sr-only">
      Loading…
    </p>
  );
}
