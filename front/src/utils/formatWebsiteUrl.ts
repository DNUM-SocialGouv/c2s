export const formatWebsiteUrl = (website: string): string => {
  if (!website) return '#';

  if (
    website.startsWith('http://') ||
    website.startsWith('https://') ||
    website.startsWith('mailto:')
  ) {
    return website;
  }

  return `//${website}`;
};
