"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { deleteTransaction, saveTransaction } from "@/app/actions";
import { Button, CATEGORIES, CategoryIcon, type Category } from "@/components/ui";

type Initial = { id?: string; amount: string; category: Category; note: string; when: string };

export function TransactionForm({ initial }: { initial: Initial }) {
  const [state, save, pending] = useActionState(saveTransaction, null);
  const [amount, setAmount] = useState(initial.amount);
  const [category, setCategory] = useState(initial.category);
  const [note, setNote] = useState(initial.note);
  const [when, setWhen] = useState(initial.when);
  const isIncome = category === "income";

  function submit(form: FormData) {
    // datetime-local has no zone; the device's clock is the one the user meant.
    if (when) form.set("occurredAt", new Date(when).toISOString());
    save(form);
  }

  return (
    <form action={submit} className="flex flex-1 flex-col px-5 pt-3 pb-6">
      <header className="flex items-center justify-between">
        <Link href="/" className="py-2 pr-4 font-semibold text-ink/60">
          Cancel
        </Link>
        <h1 className="font-bold">{initial.id ? "Edit entry" : isIncome ? "New income" : "New expense"}</h1>
        <span className="w-16" />
      </header>

      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="category" value={category} />

      <label className="mt-8 flex items-baseline justify-center gap-1">
        <span className={`text-3xl font-bold ${isIncome ? "text-income" : "text-expense"}`}>
          {isIncome ? "+" : "\u2212"}₹
        </span>
        <input
          name="amount"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          aria-label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: `${Math.max(amount.length, 1) + 0.3}ch` }}
          className="max-w-[80%] bg-transparent text-6xl font-bold tabular-nums outline-none placeholder:text-ink/20"
        />
      </label>

      <fieldset className="mt-8 grid grid-cols-4 gap-x-2 gap-y-4">
        <legend className="sr-only">Category</legend>
        {(Object.keys(CATEGORIES) as Category[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
            className="flex flex-col items-center gap-1.5"
          >
            <span className={`rounded-[16px] p-0.5 transition ${c === category ? "ring-2 ring-ink" : ""}`}>
              <CategoryIcon category={c} size={52} />
            </span>
            <span className={`text-xs font-medium ${c === category ? "text-ink" : "text-ink/50"}`}>
              {CATEGORIES[c].label}
            </span>
          </button>
        ))}
      </fieldset>

      <div className="mt-8 space-y-3">
        <input
          name="note"
          maxLength={80}
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-card bg-card px-4 py-3.5 shadow-soft outline-none placeholder:text-ink/40"
        />
        <label className="flex items-center justify-between rounded-card bg-card px-4 py-2.5 shadow-soft">
          <span className="text-ink/60">When</span>
          <input
            type="datetime-local"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            className="bg-transparent text-right font-medium tabular-nums outline-none"
          />
        </label>
      </div>

      {state?.error && (
        <p role="alert" className="mt-4 text-center text-sm font-medium text-expense">
          {state.error}
        </p>
      )}

      <div className="mt-auto space-y-3 pt-8">
        <Button disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
        {initial.id && (
          <Button
            variant="soft"
            formAction={deleteTransaction}
            className="text-expense"
            onClick={(e) => {
              if (!confirm("Delete this entry?")) e.preventDefault();
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
