// All amounts are integer paise. Negative = expense, positive = income.

export const MAX_AMOUNT = 1_00_00_000_00; // ₹1 crore

const whole = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** `signed` prefixes + or a true minus sign. */
export function formatAmount(paise: number, { signed = false } = {}) {
  const abs = Math.abs(paise);
  const value = (abs % 100 ? decimal : whole).format(abs / 100);
  if (!signed) return value;
  return `${paise < 0 ? "\u2212" : "+"}${value}`;
}

/** "1,234.5" -> 123450. Null unless a positive amount with at most 2 decimals, up to MAX_AMOUNT. */
export function parseAmount(input: string): number | null {
  const s = input.replace(/[\s,₹]/g, "");
  if (!/^(?=.*\d)\d*(\.\d{0,2})?$/.test(s)) return null;
  const [rupees, paise = ""] = s.split(".");
  const total = Number(rupees || 0) * 100 + Number(paise.padEnd(2, "0"));
  return total > 0 && total <= MAX_AMOUNT ? total : null;
}

/** For prefilling an input: 123450 -> "1234.5". */
export function toInputAmount(paise: number) {
  return String(Math.abs(paise) / 100);
}
