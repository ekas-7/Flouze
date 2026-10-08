import type { SVGProps } from "react";

/** Doodle cat dreaming of a fish. The Flouze logo; decorative in the UI. */
export function Mascot(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 96"
      aria-hidden
      fill="none"
      stroke="#2d2b2a"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="70" cy="40" r="2.5" fill="#fffdf9" />
      <circle cx="77" cy="31" r="3.5" fill="#fffdf9" />
      <ellipse cx="97" cy="17" rx="20" ry="13" fill="#fffdf9" />
      <path d="M87 17c4-5 12-5 16 0c-4 5-12 5-16 0z" fill="#daeef8" />
      <path d="M103 17l5-4v8z" fill="#daeef8" />
      <circle cx="91" cy="16" r="0.6" fill="#2d2b2a" />

      <path
        d="M10 94C8 72 12 58 20 52L18 34L32 45C38 43 44 43 50 45L64 34L62 52C70 58 74 72 72 94Z"
        fill="#fffdf9"
      />
      <path d="M28 64q4-4 8 0M46 64q4-4 8 0" />
      <path d="M37 72q2 3 4 0q2 3 4 0" />
      <ellipse cx="26" cy="71" rx="4" ry="2.5" fill="#fadde6" stroke="none" />
      <ellipse cx="56" cy="71" rx="4" ry="2.5" fill="#fadde6" stroke="none" />
    </svg>
  );
}
