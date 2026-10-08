// Grouping and labels must follow the user's clock, not the server's.

export const DEFAULT_TZ = "Asia/Kolkata";

const formatters = new Map<string, Intl.DateTimeFormat>();

function parts(date: Date, timeZone: string) {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    formatters.set(timeZone, f);
  }
  const p: Record<string, string> = {};
  for (const { type, value } of f.formatToParts(date)) p[type] = value;
  return p;
}

export function isTimeZone(tz: string) {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/** "2026-10-09" */
export function dayKey(date: Date, tz: string) {
  const p = parts(date, tz);
  return `${p.year}-${p.month}-${p.day}`;
}

/** "14:05" */
export function timeOf(date: Date, tz: string) {
  const p = parts(date, tz);
  return `${p.hour}:${p.minute}`;
}

/** "14:00" */
export function hourOf(date: Date, tz: string) {
  return `${parts(date, tz).hour}:00`;
}

/** Value for <input type="datetime-local">. */
export function toInputDateTime(date: Date, tz: string) {
  const p = parts(date, tz);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

function offsetAt(date: Date, tz: string) {
  const p = parts(date, tz);
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - Math.floor(date.getTime() / 60000) * 60000;
}

/** First instant of the month containing `now`, in `tz`. */
export function monthStart(now: Date, tz: string) {
  const p = parts(now, tz);
  const local = Date.UTC(+p.year, +p.month - 1, 1);
  // Re-check the offset at the month start itself: DST may differ from today.
  const guess = local - offsetAt(now, tz);
  return new Date(local - offsetAt(new Date(guess), tz));
}

export function dayLabel(date: Date, tz: string, now = new Date()) {
  const key = dayKey(date, tz);
  if (key === dayKey(now, tz)) return "Today";
  if (key === dayKey(new Date(now.getTime() - 86_400_000), tz)) return "Yesterday";
  return date.toLocaleDateString("en-IN", { timeZone: tz, day: "numeric", month: "short" });
}

export function weekdayOf(date: Date, tz: string) {
  return date.toLocaleDateString("en-IN", { timeZone: tz, weekday: "short" });
}

export function monthName(date: Date, tz: string) {
  return date.toLocaleDateString("en-IN", { timeZone: tz, month: "long" });
}
