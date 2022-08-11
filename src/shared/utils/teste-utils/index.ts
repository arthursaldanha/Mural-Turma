export function parseSizeWithPixelToNumber(size: string): number {
  const valueWithoutCharacters = size.replace(/\D/g, '');
  return Number(valueWithoutCharacters);
}
