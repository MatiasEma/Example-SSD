export function sanitizeText(value: string): string {
  return value.trim().replace(/[<>]/g, '');
}
