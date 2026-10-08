import "server-only";
import { db } from "./db";
import { monthStart } from "./dates";
import { getCurrentUser, getTimeZone } from "./session";

// Every read resolves the user itself, so callers can't ask for someone else's data.

const RECENT_LIMIT = 100;

export async function getRecentTransactions() {
  const user = await getCurrentUser();
  return db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { occurredAt: "desc" },
    take: RECENT_LIMIT,
  });
}

export async function getMonthTransactions() {
  const [user, tz] = await Promise.all([getCurrentUser(), getTimeZone()]);
  return db.transaction.findMany({
    where: { userId: user.id, occurredAt: { gte: monthStart(new Date(), tz) } },
    select: { amount: true, category: true },
  });
}

export function isObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}

export async function getTransaction(id: string) {
  if (!isObjectId(id)) return null;
  const user = await getCurrentUser();
  return db.transaction.findFirst({ where: { id, userId: user.id } });
}
