export function joinWithComma(
  ...parts: (string | number | null | undefined)[]
): string {
  return parts
    .map((part) => (part == null ? "" : String(part).trim()))
    .filter(Boolean)
    .join(", ");
}
