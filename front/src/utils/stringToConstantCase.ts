export function stringToConstantCase(stringToNormalize: string): string {
  const normalized: string = stringToNormalize
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_]/g, '');
  return normalized;
}
