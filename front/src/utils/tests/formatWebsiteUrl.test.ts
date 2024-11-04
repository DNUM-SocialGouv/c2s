import { formatWebsiteUrl } from '../formatWebsiteUrl.ts';

test('should return an empty link when no website is provided', () => {
  const website = '';
  expect(formatWebsiteUrl(website)).toBe('#');
});

test('should keep the url unchanged when a mailto url is provided', () => {
  const website = 'mailto:someone@example.com';
  expect(formatWebsiteUrl(website)).toBe('mailto:someone@example.com');
});

test('should add "//" for links without "http", "https", or "mailto"', () => {
  const url = 'www.medium.com';
  expect(formatWebsiteUrl(url)).toBe('//www.medium.com');
});
