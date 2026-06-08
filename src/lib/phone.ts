/** Reduce pasted Saudi mobile input to national digits 5XXXXXXXX. */
export function saudiNationalDigits(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("00966")) digits = digits.slice(5);
  else if (digits.startsWith("966")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return /^5\d{8}$/.test(digits) ? digits : null;
}

/** Canonical local format for the backend: 05XXXXXXXX. */
export function toLocalSaudiPhone(value: string): string {
  const national = saudiNationalDigits(value);
  return national ? `0${national}` : value.trim();
}

/** Meta / Snap pixel advanced matching: 9665XXXXXXXX (digits only). */
export function toCountryDigits(value: string): string | undefined {
  const national = saudiNationalDigits(value);
  return national ? `966${national}` : undefined;
}

/** TikTok pixel / Events API: +9665XXXXXXXX. */
export function toE164SaudiPhone(value: string): string | undefined {
  const national = saudiNationalDigits(value);
  return national ? `+966${national}` : undefined;
}
