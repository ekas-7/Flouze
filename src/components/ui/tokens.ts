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
  food: { label: "Food", emoji: "🍔", tone: "butter" },
  groceries: { label: "Groceries", emoji: "🥦", tone: "mint" },
  dessert: { label: "Dessert", emoji: "🍰", tone: "peach" },
  coffee: { label: "Coffee", emoji: "☕", tone: "butter" },
  transport: { label: "Transport", emoji: "🚗", tone: "sky" },
  games: { label: "Games", emoji: "🎮", tone: "lilac" },
  beauty: { label: "Beauty", emoji: "💄", tone: "rose" },
  sport: { label: "Sport", emoji: "⚽", tone: "sky" },
  shopping: { label: "Shopping", emoji: "🛍️", tone: "rose" },
  bills: { label: "Bills", emoji: "🧾", tone: "lilac" },
  health: { label: "Health", emoji: "💊", tone: "mint" },
  other: { label: "Other", emoji: "✨", tone: "peach" },
} satisfies Record<string, { label: string; emoji: string; tone: Tone }>;

export type Category = keyof typeof CATEGORIES;

const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

/** Negative = expense. `signed` prefixes + or a true minus sign. */
export function formatAmount(amount: number, { signed = false } = {}) {
  const value = number.format(Math.abs(amount));
  if (!signed) return value;
  return `${amount < 0 ? "\u2212" : "+"}${value}`;
}
