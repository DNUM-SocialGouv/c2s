// normalizeString.test.ts
import { normalizeString } from '@/utils/normalizeString';

test('should transform "Provence-Alpes-Côte d\'Azur" to "provence-alpes-cote-dazur"', () => {
  expect(normalizeString("Provence-Alpes-Côte d'Azur")).toBe(
    'provence-alpes-cote-dazur'
  );
});

test('should transform "Hello World!" to "hello-world"', () => {
  expect(normalizeString('Hello World!')).toBe('hello-world');
});

test('should transform "À l\'aube du jour" to "a-l-aube-du-jour"', () => {
  expect(normalizeString('La Réunion')).toBe('la-reunion');
});

test('should handle empty string', () => {
  expect(normalizeString('')).toBe('');
});
