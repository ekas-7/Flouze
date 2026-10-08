import {
  Button,
  CATEGORIES,
  CategoryIcon,
  DayHeader,
  Dock,
  Fab,
  Sheet,
  SummaryHeader,
  TimeMarker,
  TONES,
  TransactionCard,
  type Category,
  type Tone,
} from "@/components/ui";

export const metadata = { title: "UI kit · Flouze" };

// Living reference for the UI kit, with sample data.
export default function Kit() {
  return (
    <main className="flex flex-1 flex-col">
      <SummaryHeader title="Record" expenses={572} income={5194} />
      <Sheet>
        <DayHeader date="29 Dec" weekday="Thu" income={0} expenses={261} />
        <TimeMarker time="14:00" />
        <div className="space-y-2.5">
          <TransactionCard category="food" time="14:50" amount={-50} />
          <TransactionCard category="groceries" time="14:08" amount={-58} />
        </div>
        <TimeMarker time="13:00" />
        <div className="space-y-2.5">
          <TransactionCard category="dessert" time="13:56" amount={-85} />
          <TransactionCard category="transport" time="13:57" amount={-68} note="Uber to office" />
        </div>

        <DayHeader date="28 Dec" weekday="Wed" income={5194} expenses={311} />
        <TimeMarker time="13:00" />
        <div className="space-y-2.5">
          <TransactionCard category="games" time="13:57" amount={-59} />
          <TransactionCard category="beauty" time="13:40" amount={-168} />
          <TransactionCard category="other" time="09:00" amount={5194} note="Salary" />
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
      </Sheet>
      <Fab href="/kit" />
      <Dock />
    </main>
  );
}
