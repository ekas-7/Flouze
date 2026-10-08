export type Tone = "mint" | "peach" | "sky" | "lilac" | "butter" | "rose";

// Full class strings so Tailwind can see them.
export const TONES: Record<Tone, { bg: string; ink: string; solid: string }> = {
  mint: { bg: "bg-mint", ink: "text-mint-ink", solid: "bg-mint-ink" },
  peach: { bg: "bg-peach", ink: "text-peach-ink", solid: "bg-peach-ink" },
  sky: { bg: "bg-sky", ink: "text-sky-ink", solid: "bg-sky-ink" },
  lilac: { bg: "bg-lilac", ink: "text-lilac-ink", solid: "bg-lilac-ink" },
  butter: { bg: "bg-butter", ink: "text-butter-ink", solid: "bg-butter-ink" },
  rose: { bg: "bg-rose", ink: "text-rose-ink", solid: "bg-rose-ink" },
};

/** `income` is the only category that adds money; everything else is an expense. */
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
  income: { label: "Income", tone: "mint" },
} satisfies Record<string, { label: string; tone: Tone }>;

export type Category = keyof typeof CATEGORIES;

export function isCategory(value: string): value is Category {
  return Object.hasOwn(CATEGORIES, value);
}
