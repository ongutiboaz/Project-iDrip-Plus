/**
 * Normalize Kenyan phone numbers to Safaricom STK format: 254XXXXXXXXX
 *
 * Accepts:
 *  +2547XXXXXXXX
 *  +2541XXXXXXXX
 *  2547XXXXXXXX
 *  2541XXXXXXXX
 *  07XXXXXXXX
 *  01XXXXXXXX
 *  7XXXXXXXX
 *  1XXXXXXXX
 */
export default function normalizePhone(phone) {
  if (!phone) return null;

  let value = phone.toString().trim();

  // remove spaces, dashes, parentheses
  value = value.replace(/[\s\-()]/g, "");

  // +2547XXXXXXXX or +2541XXXXXXXX → 254XXXXXXXXX
  if (value.startsWith("+254")) {
    value = value.slice(1);
  }

  // 07XXXXXXXX or 01XXXXXXXX → 254XXXXXXXXX
  if (value.startsWith("07") || value.startsWith("01")) {
    return `254${value.slice(1)}`;
  }

  // 7XXXXXXXX or 1XXXXXXXX → 254XXXXXXXXX
  if (
    (value.startsWith("7") || value.startsWith("1")) &&
    value.length === 9
  ) {
    return `254${value}`;
  }

  // Already normalized
  if (
    (value.startsWith("2547") || value.startsWith("2541")) &&
    value.length === 12
  ) {
    return value;
  }

  throw new Error("Invalid Kenyan phone number format");
}
