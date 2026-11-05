function parseMxnToCents(value) {
  const normalized = String(value).trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;

  const [whole, decimal = ""] = normalized.split(".");
  const cents = Number(whole) * 100 + Number(decimal.padEnd(2, "0"));
  // Converts a positive MXN amount to integer cents so currency never uses binary floating-point arithmetic.
  // The demo accepts no fractional cents or rounding because all money is stored as exact cents.
  if (!Number.isSafeInteger(cents) || cents <= 0) return null;
  return cents;
}

function sumCents(amounts) {
  const total = amounts.reduce((sum, amount) => sum + amount, 0);
  return Number.isSafeInteger(total) ? total : null;
}

function formatMxn(cents) {
  const wholePesos = Math.floor(cents / 100);
  const fraction = String(cents % 100).padStart(2, "0");
  return `MXN ${new Intl.NumberFormat("es-MX").format(wholePesos)}.${fraction}`;
}

export { formatMxn, parseMxnToCents, sumCents };
