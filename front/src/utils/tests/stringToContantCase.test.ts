import { stringToConstantCase } from '../stringToConstantCase.ts';

test('should transform "Organisme Complémentaire" to "ORGANISME_COMPLEMENTAIRE"', () => {
  expect(stringToConstantCase('Organisme Complémentaire')).toBe(
    'ORGANISME_COMPLEMENTAIRE'
  );
});

test('should transform "Hello World!" to "HELLO_WORLD"', () => {
  expect(stringToConstantCase('Hello World!')).toBe('HELLO_WORLD');
});

test('should handle empty string', () => {
  expect(stringToConstantCase('')).toBe('');
});
