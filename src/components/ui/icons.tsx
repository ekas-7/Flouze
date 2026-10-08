import type { ReactNode } from "react";
import type { Category } from "./tokens";

// Doodle icons on a 32x32 grid, drawn to match the mascot: ink outline, pastel fill.
const INK = "#2d2b2a";
const PAPER = "#fffdf9";
const MUSTARD = "#f6c453";
const GREEN = "#7cc68d";
const CORAL = "#f29b7a";
const BLUE = "#7dbbe0";
const PURPLE = "#a994d8";
const PINK = "#ee8fae";
const RED = "#e2574c";

export const CATEGORY_ICONS: Record<Category, ReactNode> = {
  food: (
    <>
      <path d="M6 14c0-5 4.5-8 10-8s10 3 10 8z" fill={MUSTARD} />
      <path d="M12 10l1 .6M16 9v1.2M20 10l-1 .6" stroke={PAPER} />
      <path d="M5.5 16.2h21" stroke={GREEN} strokeWidth="3" />
      <rect x="6" y="18" width="20" height="4" rx="2" fill="#9a5b3a" />
      <path d="M6 23.5h20v.5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" fill={MUSTARD} />
    </>
  ),
  groceries: (
    <>
      <path d="M12.5 16l1 10a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1l1-10" fill="#cdebb8" />
      <path
        d="M8 17.5A3.5 3.5 0 0 1 6.5 11.5A4 4 0 0 1 11.5 6.5A4.5 4.5 0 0 1 20.5 6.5A4 4 0 0 1 25.5 11.5A3.5 3.5 0 0 1 24 17.5Z"
        fill={GREEN}
      />
      <path d="M11 12.5a2.2 2.2 0 0 1 3-1.5M18 11a2.2 2.2 0 0 1 3 1.5" strokeWidth="1.3" />
      <circle cx="11.5" cy="9.2" r="1.1" fill={PAPER} stroke="none" />
    </>
  ),
  dessert: (
    <>
      <path d="M8 17h16l-2 10H10z" fill={CORAL} />
      <path d="M13 17.5l.5 9M19 17.5l-.5 9" strokeWidth="1.2" />
      <path d="M7 17a3 3 0 0 1 1-5a4.5 4.5 0 0 1 8-3a4.5 4.5 0 0 1 8 3a3 3 0 0 1 1 5z" fill={PAPER} />
      <circle cx="16" cy="5.8" r="2.2" fill={RED} />
      <path d="M16 3.6q1-1.6 3-1.8" />
    </>
  ),
  coffee: (
    <>
      <path d="M12 9c-1-1.5 1-2.5 0-4M17 9c-1-1.5 1-2.5 0-4" />
      <path d="M22 14h2a3 3 0 0 1 0 6h-2" />
      <path d="M7 12h15v9a5 5 0 0 1-5 5h-5a5 5 0 0 1-5-5z" fill={MUSTARD} />
      <path d="M14.5 21.8l-2.1-2a1.3 1.3 0 0 1 2.1-1.6a1.3 1.3 0 0 1 2.1 1.6z" fill={PINK} stroke="none" />
    </>
  ),
  transport: (
    <>
      <path
        d="M4 21v-3.5a2 2 0 0 1 1.5-2l3-1l2.5-4a2 2 0 0 1 1.7-1h6.6a2 2 0 0 1 1.7 1l2.5 4l2 .6a2 2 0 0 1 1.5 2V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
        fill={BLUE}
      />
      <path d="M11.8 14.5l1.7-3h2.3v3zM17.3 14.5v-3h2.3l1.7 3z" fill={PAPER} strokeWidth="1.4" />
      <circle cx="10" cy="22" r="2.6" fill={INK} />
      <circle cx="22" cy="22" r="2.6" fill={INK} />
      <circle cx="10" cy="22" r="0.9" fill={PAPER} stroke="none" />
      <circle cx="22" cy="22" r="0.9" fill={PAPER} stroke="none" />
    </>
  ),
  games: (
    <>
      <path
        d="M9 11h14a5 5 0 0 1 5 5.5l-.6 4.5a3 3 0 0 1-5.2 1.6L20 20h-8l-2.2 2.6a3 3 0 0 1-5.2-1.6L4 16.5A5 5 0 0 1 9 11z"
        fill={PURPLE}
      />
      <path d="M10 14.5v4M8 16.5h4" />
      <circle cx="21" cy="15.3" r="1.2" fill={PINK} strokeWidth="1.2" />
      <circle cx="23.6" cy="17.6" r="1.2" fill={MUSTARD} strokeWidth="1.2" />
    </>
  ),
  beauty: (
    <>
      <path d="M12.5 14V8.5L19.5 5v9z" fill="#e85d8a" />
      <path d="M14.5 9v3.5" stroke={PAPER} />
      <rect x="11.5" y="14" width="9" height="4" rx="1" fill={PAPER} />
      <rect x="10.5" y="18" width="11" height="9" rx="1.5" fill={MUSTARD} />
    </>
  ),
  sport: (
    <>
      <circle cx="16" cy="16" r="10.5" fill="#f4a261" />
      <path d="M16 5.5v21M5.5 16h21M9 8.5q4.5 7.5 0 15M23 8.5q-4.5 7.5 0 15" strokeWidth="1.5" />
      <path d="M10.5 9.5a7.5 7.5 0 0 1 3-2" stroke={PAPER} strokeWidth="1.5" />
    </>
  ),
  shopping: (
    <>
      <path d="M12 14v-3a4 4 0 0 1 8 0v3" />
      <path d="M7 12h18l-1.2 13a2 2 0 0 1-2 1.8H10.2a2 2 0 0 1-2-1.8z" fill={PINK} />
      <path d="M13 19q3 2.5 6 0" />
    </>
  ),
  bills: (
    <>
      <path d="M9 5h14v22l-2-1.5l-2 1.5l-2-1.5l-2 1.5l-2-1.5l-2 1.5l-2-1.5V5z" fill={PAPER} />
      <path d="M12.5 10h7M12.5 14h7M12.5 18h4" strokeWidth="1.5" />
      <circle cx="20" cy="20.5" r="1.8" fill={PURPLE} stroke="none" />
    </>
  ),
  health: (
    <g transform="rotate(-45 16 16)">
      <rect x="6" y="11.5" width="20" height="9" rx="4.5" fill={PAPER} />
      <path d="M16 11.5h5.5a4.5 4.5 0 0 1 0 9H16z" fill={GREEN} />
      <path d="M9.5 14.5h3" stroke={GREEN} strokeWidth="1.5" />
    </g>
  ),
  other: (
    <>
      <path d="M16 4c1.2 7 3.8 9.8 11 11c-7.2 1.2-9.8 3.8-11 11c-1.2-7.2-3.8-9.8-11-11c7.2-1.2 9.8-3.8 11-11z" fill={MUSTARD} />
      <path d="M25.5 3.5v4M23.5 5.5h4" strokeWidth="1.5" />
      <circle cx="13.8" cy="14.5" r="0.9" fill={INK} stroke="none" />
      <circle cx="18.2" cy="14.5" r="0.9" fill={INK} stroke="none" />
      <path d="M14.6 17q1.4 1.3 2.8 0" strokeWidth="1.4" />
    </>
  ),
};

export function CategoryGlyph({ category, className }: { category: Category; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
      fill="none"
      stroke={INK}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {CATEGORY_ICONS[category]}
    </svg>
  );
}
