export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeAllFirstLetter(text: string) {
  return convertToLower(text).replace(/(?:^|\s)\S/g, string =>
    string.toUpperCase(),
  );
}

export function convertToLower(text: string) {
  return text.toLowerCase();
}
