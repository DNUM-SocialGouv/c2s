export const convertOctetsToKo = (octets: number): string => {
  if (octets < 0) {
    throw new Error('Octets value must be a non-negative number');
  }

  const kilobytes = octets / 1024;
  return `${kilobytes.toFixed(2)}`;
};
