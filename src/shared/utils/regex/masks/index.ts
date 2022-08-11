export function maskCard(value: string) {
  let cardWithMask = value.replace(/\D+/g, '');

  if (cardWithMask.length > 19) {
    cardWithMask = cardWithMask.substring(0, 19);
  }

  if (cardWithMask.length < 16) {
    cardWithMask = cardWithMask
      .replace(/\D+/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{6})(\d)/, '$1 $2')
      .replace(/(\d)/, '$1');
  }

  if (cardWithMask.replace(/\D+/g, '').length === 16) {
    cardWithMask = cardWithMask
      .replace(/\D+/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})/, '$1');
  }

  if (cardWithMask.replace(/\D+/g, '').length > 16) {
    cardWithMask = cardWithMask
      .replace(/\D+/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d)/, '$1');
  }

  return cardWithMask.trim();
}

export function maskData(value: string) {
  const dataWithMask = value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d+?$/, '$1');

  return dataWithMask;
}

export function maskCvv(value: string) {
  const cvvWithMask = value.replace(/\D+/g, '').replace(/(\d{4})\d+?$/, '$1');

  return cvvWithMask;
}
