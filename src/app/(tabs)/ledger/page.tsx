import { Suspense } from "react";
import {
  CATEGORIES,
  CategoryIcon,
  LoadingLabel,
  Skeleton,
  TONES,
  formatAmount,
  isCategory,
  type Category,
} from "@/components/ui";
import { monthName } from "@/lib/dates";
import { getTimeZone } from "@/lib/session";
import { getMonthTransactions } from "@/lib/transactions";

export const metadata = { title: "Ledger · Flouze" };

export default function Ledger() {
  return (
    <main className="flex flex-1 flex-col px-5 pt-4 pb-36">
      <h1 className="text-[34px] font-bold leading-none tracking-tight">Ledger</h1>
      <Suspense fallback={<Loading />}>
        <Breakdown />
      </Suspense>
    </main>
  );
}

function Loading() {
  return (
    <>
      <LoadingLabel />
      <Skeleton className="mt-6 h-3.5 w-32 rounded-full" />
      <Skeleton className="mt-2.5 h-9 w-36 rounded-tile" />
      <ul className="mt-6 space-y-3">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex items-center gap-3 rounded-card bg-card p-3 shadow-soft">
            <Skeleton className="size-11 shrink-0 rounded-tile" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-3.5 w-24 rounded-full" />
              <Skeleton className="h-2 rounded-full" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

async function Breakdown() {
  const [tz, month] = await Promise.all([getTimeZone(), getMonthTransactions()]);
  const totals = new Map<Category, number>();
  for (const t of month) {
    if (t.amount >= 0) continue;
    const c = isCategory(t.category) ? t.category : "other";
    totals.set(c, (totals.get(c) ?? 0) - t.amount);
  }
  const rows = [...totals].sort((a, b) => b[1] - a[1]);
  const total = rows.reduce((sum, [, v]) => sum + v, 0);

  return (
    <>
      <p className="mt-5 text-[13px] font-medium text-ink/60">Spent in {monthName(new Date(), tz)}</p>
      <p className="text-[34px] font-bold tabular-nums text-expense">{formatAmount(total)}</p>
      {rows.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink/50">No expenses this month yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map(([c, value]) => {
            const share = Math.round((value / total) * 100);
            return (
              <li key={c} className="flex items-center gap-3 rounded-card bg-card p-3 shadow-soft">
                <CategoryIcon category={c} />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-[15px] font-semibold">
                    <span>{CATEGORIES[c].label}</span>
                    <span className="tabular-nums">{formatAmount(value)}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-oat">
                      <div className={`h-full rounded-full ${TONES[CATEGORIES[c].tone].solid}`} style={{ width: `${share}%` }} />
                    </div>
                    <span className="w-9 text-right text-xs font-medium tabular-nums text-ink/50">{share}%</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
