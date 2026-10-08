"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Dashboard", d: "M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" },
  { href: "/ledger", label: "Ledger", d: "M5 20V10M12 20V4M19 20v-7" },
  { href: "/profile", label: "Profile", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" },
];

/** Floating pill dock. Pages using it need bottom padding (Sheet has it). */
export function Dock() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+12px)] z-20 flex justify-center">
      <ul className="flex gap-1 rounded-full bg-card/90 p-1.5 shadow-float backdrop-blur-md">
        {TABS.map(({ href, label, d }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`grid size-12 place-items-center rounded-full transition ${active ? "bg-ink text-cream" : "text-ink/50"}`}
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={d} />
                </svg>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
