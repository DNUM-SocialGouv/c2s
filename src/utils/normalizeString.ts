export function normalizeString(stringToNormalize: string): string {
  let normalized: string = stringToNormalize.toLowerCase();
  normalized = normalized.replace(/\s+/g, '-');
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  normalized = normalized.replace(/[^a-z0-9-]/g, '');
  return normalized;
}
