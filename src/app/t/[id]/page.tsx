import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TransactionForm } from "@/components/transaction-form";
import { isCategory } from "@/components/ui";
import { toInputDateTime } from "@/lib/dates";
import { toInputAmount } from "@/lib/money";
import { getTimeZone } from "@/lib/session";
import { getTransaction } from "@/lib/transactions";

export const metadata = { title: "Edit entry · Flouze" };

export default function EditTransaction({ params }: PageProps<"/t/[id]">) {
  return (
    <Suspense>
      <Form params={params} />
    </Suspense>
  );
}

async function Form({ params }: { params: PageProps<"/t/[id]">["params"] }) {
  const { id } = await params;
  const [t, tz] = await Promise.all([getTransaction(id), getTimeZone()]);
  if (!t) notFound();
  return (
    <TransactionForm
      initial={{
        id: t.id,
        amount: toInputAmount(t.amount),
        category: isCategory(t.category) ? t.category : "other",
        note: t.note ?? "",
        when: toInputDateTime(t.occurredAt, tz),
      }}
    />
  );
}
