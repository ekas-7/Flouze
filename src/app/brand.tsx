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

export function Logo({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.background,
        color: BRAND.ink,
        fontSize: size * 0.62,
        fontWeight: 800,
      }}
    >
      F
    </div>
  );
}
