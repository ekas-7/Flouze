import { Suspense } from "react";
import {
  DayHeader,
  Mascot,
  Sheet,
  SummaryHeader,
  TimeMarker,
  TransactionCard,
  isCategory,
} from "@/components/ui";
import { dayKey, dayLabel, hourOf, monthName, timeOf, weekdayOf } from "@/lib/dates";
import { getTimeZone } from "@/lib/session";
import { getMonthTransactions, getRecentTransactions } from "@/lib/transactions";

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense fallback={<SummaryHeader title=" " expenses={0} income={0} />}>
        <Content />
      </Suspense>
    </main>
  );
}

type Row = Awaited<ReturnType<typeof getRecentTransactions>>[number];
type Day = { key: string; date: Date; income: number; expenses: number; hours: { hour: string; rows: Row[] }[] };

function groupByDayAndHour(rows: Row[], tz: string) {
  const days: Day[] = [];
  for (const row of rows) {
    const key = dayKey(row.occurredAt, tz);
    let day = days.at(-1);
    if (day?.key !== key) days.push((day = { key, date: row.occurredAt, income: 0, expenses: 0, hours: [] }));
    if (row.amount < 0) day.expenses -= row.amount;
    else day.income += row.amount;

    const hour = hourOf(row.occurredAt, tz);
    let group = day.hours.at(-1);
    if (group?.hour !== hour) day.hours.push((group = { hour, rows: [] }));
    group.rows.push(row);
  }
  return days;
}

async function Content() {
  const [tz, recent, month] = await Promise.all([getTimeZone(), getRecentTransactions(), getMonthTransactions()]);
  const expenses = month.reduce((sum, t) => (t.amount < 0 ? sum - t.amount : sum), 0);
  const income = month.reduce((sum, t) => (t.amount > 0 ? sum + t.amount : sum), 0);
  const days = groupByDayAndHour(recent, tz);

  return (
    <>
      <SummaryHeader title={monthName(new Date(), tz)} expenses={expenses} income={income} />
      <Sheet>
        {days.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <Mascot className="w-28 opacity-80" />
            <p className="font-semibold">Nothing logged yet</p>
            <p className="text-sm text-ink/50">Tap the pencil to add your first expense.</p>
          </div>
        )}
        {days.map((day) => (
          <div key={day.key}>
            <DayHeader
              date={dayLabel(day.date, tz)}
              weekday={weekdayOf(day.date, tz)}
              income={day.income}
              expenses={day.expenses}
            />
            {day.hours.map((group) => (
              <div key={group.hour}>
                <TimeMarker time={group.hour} />
                <div className="space-y-2.5">
                  {group.rows.map((t) => (
                    <TransactionCard
                      key={t.id}
                      href={`/t/${t.id}`}
                      category={isCategory(t.category) ? t.category : "other"}
                      time={timeOf(t.occurredAt, tz)}
                      amount={t.amount}
                      note={t.note}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </Sheet>
    </>
  );
}
