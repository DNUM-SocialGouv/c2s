import { formatDate } from './formatDate';

test('should format the date "2024-09-04T14:41:21.838+00:00" to "04/09/2024 - 14h41"', () => {
  const isoDate = '2024-09-04T14:41:21.838+00:00';
  expect(formatDate(isoDate)).toBe('04/09/2024 - 14h41');
});

test('should format the date with single-digit day and month "2024-01-09T05:03:21.838+00:00" to "09/01/2024 - 05h03"', () => {
  const isoDate = '2024-01-09T05:03:21.838+00:00';
  expect(formatDate(isoDate)).toBe('09/01/2024 - 05h03');
});

test('should format the date with single-digit day and month with zero padding "2024-12-01T21:07:00.000+00:00" to "01/12/2024 - 21h07"', () => {
  const isoDate = '2024-12-01T21:07:00.000+00:00';
  expect(formatDate(isoDate)).toBe('01/12/2024 - 21h07');
});

test('should format the date for midnight "2024-09-04T00:00:00.000+00:00" to "04/09/2024 - 00h00"', () => {
  const isoDate = '2024-09-04T00:00:00.000+00:00';
  expect(formatDate(isoDate)).toBe('04/09/2024 - 00h00');
});
