import { Suspense } from "react";
import { TransactionForm } from "@/components/transaction-form";
import { toInputDateTime } from "@/lib/dates";
import { getCurrentUser, getTimeZone } from "@/lib/session";

export const metadata = { title: "New expense · Flouze" };

export default function NewTransaction() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}

async function Form() {
  const [, tz] = await Promise.all([getCurrentUser(), getTimeZone()]);
  return <TransactionForm initial={{ amount: "", category: "food", note: "", when: toInputDateTime(new Date(), tz) }} />;
}
