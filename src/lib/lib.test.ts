import { test } from "node:test";
import assert from "node:assert/strict";
import { formatAmount, parseAmount } from "./money.ts";
import { dayKey, dayLabel, hourOf, monthStart } from "./dates.ts";

test("parseAmount", () => {
  assert.equal(parseAmount("50"), 5000);
  assert.equal(parseAmount("1,234.5"), 123450);
  assert.equal(parseAmount(" ₹ 99.99 "), 9999);
  assert.equal(parseAmount(".5"), 50);
  assert.equal(parseAmount("12."), 1200);
  assert.equal(parseAmount("10000000"), 1_00_00_000_00);
  for (const bad of ["", "0", "0.00", ".", "1.234", "-5", "abc", "1e3", "10000000.01"]) {
    assert.equal(parseAmount(bad), null, bad);
  }
});

test("formatAmount", () => {
  assert.equal(formatAmount(5000), "50");
  assert.equal(formatAmount(12340), "123.40");
  assert.equal(formatAmount(123456700), "12,34,567");
  assert.equal(formatAmount(-5000, { signed: true }), "\u221250");
  assert.equal(formatAmount(0, { signed: true }), "+0");
});

test("dates follow the user's zone, not UTC", () => {
  const tz = "Asia/Kolkata";
  // 2026-09-30 19:00 UTC is 1 Oct 00:30 in India.
  const lateNight = new Date("2026-09-30T19:00:00Z");
  assert.equal(dayKey(lateNight, tz), "2026-10-01");
  assert.equal(hourOf(lateNight, tz), "00:00");
  assert.equal(monthStart(lateNight, tz).toISOString(), "2026-09-30T18:30:00.000Z");
  assert.equal(monthStart(new Date("2026-10-31T18:00:00Z"), tz).toISOString(), "2026-09-30T18:30:00.000Z");
  assert.equal(monthStart(new Date("2026-03-15T12:00:00Z"), "America/New_York").toISOString(), "2026-03-01T05:00:00.000Z");
  assert.equal(dayLabel(lateNight, tz, new Date("2026-10-01T10:00:00Z")), "Today");
  assert.equal(dayLabel(lateNight, tz, new Date("2026-10-02T10:00:00Z")), "Yesterday");
});
