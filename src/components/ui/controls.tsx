import Link from "next/link";
import type { ComponentProps } from "react";

const VARIANTS = {
  primary: "bg-ink text-cream",
  soft: "bg-card text-ink shadow-soft",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof VARIANTS }) {
  return (
    <button
      className={`w-full rounded-full py-3.5 font-semibold transition active:scale-[0.98] active:opacity-90 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}

/** One-tap "log expense" button, floats above the dock on the right. */
export function Fab({ href, label = "Log expense" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="fixed right-5 bottom-[calc(env(safe-area-inset-bottom)+88px)] z-20 grid size-14 place-items-center rounded-[20px] bg-ink text-cream shadow-float transition active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" />
        <path d="M13.5 6.5l4 4" />
      </svg>
    </Link>
  );
}
