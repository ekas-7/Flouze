export type Tone = "mint" | "peach" | "sky" | "lilac" | "butter" | "rose";

// Full class strings so Tailwind can see them.
export const TONES: Record<Tone, { bg: string; ink: string }> = {
  mint: { bg: "bg-mint", ink: "text-mint-ink" },
  peach: { bg: "bg-peach", ink: "text-peach-ink" },
  sky: { bg: "bg-sky", ink: "text-sky-ink" },
  lilac: { bg: "bg-lilac", ink: "text-lilac-ink" },
  butter: { bg: "bg-butter", ink: "text-butter-ink" },
  rose: { bg: "bg-rose", ink: "text-rose-ink" },
};

export const CATEGORIES = {
  food: { label: "Food", tone: "butter" },
  groceries: { label: "Groceries", tone: "mint" },
  dessert: { label: "Dessert", tone: "peach" },
  coffee: { label: "Coffee", tone: "butter" },
  transport: { label: "Transport", tone: "sky" },
  games: { label: "Games", tone: "lilac" },
  beauty: { label: "Beauty", tone: "rose" },
  sport: { label: "Sport", tone: "sky" },
  shopping: { label: "Shopping", tone: "rose" },
  bills: { label: "Bills", tone: "lilac" },
  health: { label: "Health", tone: "mint" },
  other: { label: "Other", tone: "peach" },
} satisfies Record<string, { label: string; tone: Tone }>;

export type Category = keyof typeof CATEGORIES;

const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

/** Negative = expense. `signed` prefixes + or a true minus sign. */
export function formatAmount(amount: number, { signed = false } = {}) {
  const value = number.format(Math.abs(amount));
  if (!signed) return value;
  return `${amount < 0 ? "\u2212" : "+"}${value}`;
}
