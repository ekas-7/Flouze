import type { ReactNode } from "react";
import { CATEGORIES, TONES, formatAmount, type Category } from "./tokens";
import { Mascot } from "./mascot";

export function SummaryHeader({
  title,
  expenses,
  income,
}: {
  title: string;
  expenses: number;
  income: number;
}) {
  return (
    <header className="relative px-5 pt-4 pb-6">
      <h1 className="text-[34px] font-bold leading-none tracking-tight">{title}</h1>
      <div className="mt-5 flex gap-10">
        <Stat label="Expenses" value={expenses} className="text-expense" />
        <Stat label="Income" value={income} />
      </div>
      <Mascot className="pointer-events-none absolute right-3 bottom-0 w-32" />
    </header>
  );
}

function Stat({ label, value, className = "" }: { label: string; value: number; className?: string }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-ink/60">{label}</p>
      <p className={`mt-0.5 text-[28px] font-bold tabular-nums leading-tight ${className}`}>
        {formatAmount(value)}
      </p>
    </div>
  );
}

/** The rounded sheet the ledger list sits on. */
export function Sheet({ children }: { children: ReactNode }) {
  return (
    <section className="flex-1 rounded-t-sheet bg-card px-4 pt-2 pb-36 shadow-soft">
      <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/10" />
      {children}
    </section>
  );
}

export function DayHeader({
  date,
  weekday,
  income,
  expenses,
}: {
  date: string;
  weekday: string;
  income: number;
  expenses: number;
}) {
  return (
    <div className="mt-6 mb-2 flex items-center gap-2 first:mt-0">
      <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-cream">{date}</span>
      <span className="rounded-full bg-oat px-2 py-1 text-xs font-medium text-ink/60">{weekday}</span>
      <span className="ml-auto text-sm font-semibold tabular-nums">
        <span className="text-income">{formatAmount(income, { signed: true })}</span>
        <span className="ml-3 text-expense">{formatAmount(-expenses, { signed: true })}</span>
      </span>
    </div>
  );
}

export function TimeMarker({ time }: { time: string }) {
  return <p className="mt-3 mb-1 text-xs font-semibold tabular-nums text-ink/50">{time} ▸</p>;
}

export function CategoryIcon({ category, size = 44 }: { category: Category; size?: number }) {
  const { emoji, tone } = CATEGORIES[category];
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.55 }}
      className={`grid shrink-0 place-items-center rounded-tile shadow-clay ${TONES[tone].bg}`}
    >
      {emoji}
    </span>
  );
}

export function TransactionCard({
  category,
  time,
  amount,
  note,
}: {
  category: Category;
  time: string;
  amount: number;
  note?: string;
}) {
  const { label, tone } = CATEGORIES[category];
  return (
    <div className={`ml-12 flex items-center gap-3 rounded-card py-2.5 pr-4 pl-0 ${TONES[tone].bg}`}>
      <span className="-ml-5">
        <CategoryIcon category={category} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold">{note || label}</p>
        <p className={`text-xs font-medium tabular-nums ${TONES[tone].ink}`}>{time}</p>
      </div>
      <p className={`text-[15px] font-bold tabular-nums ${amount < 0 ? "" : "text-income"}`}>
        {formatAmount(amount, { signed: true })}
      </p>
    </div>
  );
}
