import { convertOctetsToKo } from '../convertOctetsToKo';

it('should convert 899993 octets to "878.12"', () => {
  const octets = 899993;
  expect(convertOctetsToKo(octets)).toBe('878.90');
});

it('should convert 1024 octets to "1.00"', () => {
  const octets = 1024;
  expect(convertOctetsToKo(octets)).toBe('1.00');
});

it('should convert 0 octets to "0.00"', () => {
  const octets = 0;
  expect(convertOctetsToKo(octets)).toBe('0.00');
});
