import assert from "node:assert/strict";
import test from "node:test";
import { parseMxnToCents, sumCents } from "./money.mjs";

test("parses MXN values as integer cents", () => {
  assert.equal(parseMxnToCents("0.01"), 1);
  assert.equal(parseMxnToCents("185.00"), 18500);
});

test("sums contribution cents without rounding", () => {
  assert.equal(sumCents([18500, 1500]), 20000);
});

test("rejects zero, negative, malformed, and fractional-cent amounts", () => {
  for (const value of ["0.00", "-1.00", "abc", "1.234", ""]) {
    assert.equal(parseMxnToCents(value), null, `expected ${value} to be rejected`);
  }
});

test("rejects values beyond the safe integer range", () => {
  assert.equal(parseMxnToCents("90071992547409.92"), null);
});
