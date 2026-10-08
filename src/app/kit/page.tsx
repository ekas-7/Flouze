import {
  Button,
  CATEGORIES,
  CategoryIcon,
  DayHeader,
  Dock,
  Fab,
  Sheet,
  Skeleton,
  SummaryHeader,
  TimeMarker,
  TONES,
  TransactionCard,
  TransactionCardSkeleton,
  type Category,
  type Tone,
} from "@/components/ui";

export const metadata = { title: "UI kit · Flouze" };

// Living reference for the UI kit, with sample data.
export default function Kit() {
  return (
    <main className="flex flex-1 flex-col">
      <SummaryHeader title="Record" expenses={57200} income={519400} />
      <Sheet>
        <DayHeader date="29 Dec" weekday="Thu" income={0} expenses={26100} />
        <TimeMarker time="14:00" />
        <div className="space-y-2.5">
          <TransactionCard category="food" time="14:50" amount={-5000} />
          <TransactionCard category="groceries" time="14:08" amount={-5800} />
        </div>
        <TimeMarker time="13:00" />
        <div className="space-y-2.5">
          <TransactionCard category="dessert" time="13:56" amount={-8500} />
          <TransactionCard category="transport" time="13:57" amount={-6800} note="Uber to office" />
        </div>

        <DayHeader date="28 Dec" weekday="Wed" income={519400} expenses={31100} />
        <TimeMarker time="13:00" />
        <div className="space-y-2.5">
          <TransactionCard category="games" time="13:57" amount={-5900} />
          <TransactionCard category="beauty" time="13:40" amount={-16800} />
          <TransactionCard category="income" time="09:00" amount={519400} note="Salary" />
        </div>

        <h2 className="mt-10 mb-3 text-lg font-bold">Categories</h2>
        <div className="grid grid-cols-4 gap-4">
          {(Object.keys(CATEGORIES) as Category[]).map((c) => (
            <div key={c} className="flex flex-col items-center gap-1.5">
              <CategoryIcon category={c} size={52} />
              <span className="text-xs font-medium text-ink/60">{CATEGORIES[c].label}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-10 mb-3 text-lg font-bold">Palette</h2>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(TONES) as Tone[]).map((t) => (
            <div key={t} className={`rounded-card p-3 text-sm font-semibold ${TONES[t].bg} ${TONES[t].ink}`}>
              {t}
            </div>
          ))}
          <div className="rounded-card bg-cream p-3 text-sm font-semibold shadow-soft">cream</div>
          <div className="rounded-card bg-oat p-3 text-sm font-semibold">oat</div>
          <div className="rounded-card bg-ink p-3 text-sm font-semibold text-cream">ink</div>
        </div>

        <h2 className="mt-10 mb-3 text-lg font-bold">Buttons</h2>
        <div className="space-y-3">
          <Button>Primary</Button>
          <Button variant="soft">Soft</Button>
        </div>

        <h2 className="mt-10 mb-3 text-lg font-bold">Loading</h2>
        <div className="-mx-4">
          <SummaryHeader />
        </div>
        <div className="space-y-2.5">
          <Skeleton className="h-6 w-28 rounded-full" />
          <TransactionCardSkeleton />
        </div>
      </Sheet>
      <Fab href="/kit" />
      <Dock />
    </main>
  );
}
