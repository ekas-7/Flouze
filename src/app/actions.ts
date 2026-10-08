"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isCategory } from "@/components/ui/tokens";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseAmount } from "@/lib/money";
import { getCurrentUser } from "@/lib/session";
import { isObjectId } from "@/lib/transactions";

export async function signInWithGoogle(): Promise<FormState> {
  let url: string | undefined;
  try {
    ({ url } = await auth.api.signInSocial({
      body: { provider: "google", callbackURL: "/" },
      headers: await headers(),
    }));
  } catch (error) {
    console.error("Google sign-in failed:", error);
  }
  if (!url) return { error: "Google sign-in isn't available right now. Please try again later." };
  redirect(url);
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/sign-in");
}

export type FormState = { error: string } | null;

export async function saveTransaction(_: FormState, form: FormData): Promise<FormState> {
  const user = await getCurrentUser();

  const amount = parseAmount(String(form.get("amount") ?? ""));
  if (!amount) return { error: "Enter an amount between ₹0.01 and ₹1,00,00,000." };

  const category = String(form.get("category") ?? "");
  if (!isCategory(category)) return { error: "Pick a category." };

  const rawDate = String(form.get("occurredAt") ?? "");
  const occurredAt = rawDate ? new Date(rawDate) : new Date();
  if (Number.isNaN(occurredAt.getTime())) return { error: "That date doesn't look right." };

  const note = String(form.get("note") ?? "").trim().slice(0, 80) || null;
  const data = { amount: category === "income" ? amount : -amount, category, note, occurredAt };

  const id = String(form.get("id") ?? "");
  if (id) {
    const { count } = isObjectId(id)
      ? await db.transaction.updateMany({ where: { id, userId: user.id }, data })
      : { count: 0 };
    if (!count) return { error: "This entry no longer exists." };
  } else {
    await db.transaction.create({ data: { ...data, userId: user.id } });
  }
  redirect("/");
}

export async function deleteTransaction(form: FormData) {
  const user = await getCurrentUser();
  const id = String(form.get("id") ?? "");
  if (isObjectId(id)) await db.transaction.deleteMany({ where: { id, userId: user.id } });
  redirect("/");
}
