import { stringToNormalCase } from './stringToNormalCase';

test('should transform "MES_ETABLISSEMENTS" to "Mes etablissements"', () => {
  expect(stringToNormalCase('MES_ETABLISSEMENTS')).toBe('Mes etablissements');
});

test('should transform "SOME_CONSTANT_CASE_STRING" to "Some constant case string"', () => {
  expect(stringToNormalCase('SOME_CONSTANT_CASE_STRING')).toBe(
    'Some constant case string'
  );
});

test('should handle a single word in constant case', () => {
  expect(stringToNormalCase('SINGLEWORD')).toBe('Singleword');
});

test('should handle empty string', () => {
  expect(stringToNormalCase('')).toBe('');
});

test('should handle already formatted string', () => {
  expect(stringToNormalCase('AlreadyFormatted')).toBe('Alreadyformatted');
});
