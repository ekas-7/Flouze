import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Mascot } from "@/components/ui/mascot";

// Mirrors the cream / ink tokens in globals.css (next/og can't read CSS variables).
export const BRAND = {
  name: "Flouze",
  background: "#fbf7ee",
  ink: "#2d2b2a",
};

// iPhone 16 lineup in CSS points; all are @3x.
export const IPHONES = [
  { name: "iphone-16e", width: 390, height: 844 },
  { name: "iphone-16", width: 393, height: 852 },
  { name: "iphone-16-pro", width: 402, height: 874 },
  { name: "iphone-16-plus", width: 430, height: 932 },
  { name: "iphone-16-pro-max", width: 440, height: 956 },
];

/** App icon: the cat and its thought bubble, centered on cream. */
export function Logo({ size, scale = 0.84 }: { size: number; scale?: number }) {
  const width = size * scale;
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.background,
      }}
    >
      <Mascot width={width} height={width * 0.8} />
    </div>
  );
}

/** Launch screen / large lockup: cat above the wordmark. */
export function Lockup({ width }: { width: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Mascot width={width} height={width * 0.8} />
      <div
        style={{
          marginTop: width * 0.06,
          fontFamily: "Nunito",
          fontWeight: 800,
          fontSize: width * 0.36,
          letterSpacing: -width * 0.006,
          color: BRAND.ink,
        }}
      >
        Flouze
      </div>
    </div>
  );
}

/** Nunito ExtraBold subset to the letters of "Flouze" (2 KB), for next/og. */
export async function wordmarkFont() {
  const data = await readFile(join(process.cwd(), "src/app/fonts/nunito-800-flouze.ttf"));
  return { name: "Nunito", data, weight: 800 as const, style: "normal" as const };
}
