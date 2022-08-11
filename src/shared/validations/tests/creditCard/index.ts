import { unmask } from '@/shared/utils/regex';

const isCheckingNumberCard = (value: string) => {
  const unmaskedNumber = unmask(value);
  return unmaskedNumber.length >= 14 && unmaskedNumber.length <= 19;
};

const isCheckingExpirationMonthCard = (value: string) => {
  const unmaskedDate = unmask(value);
  const expirationMonth = parseInt(unmaskedDate.substring(0, 2), 10);

  return expirationMonth >= 1 && expirationMonth <= 12;
};

const isCheckingExpirationYearCard = (value: string) => {
  const unmaskedDate = unmask(value);
  const actualYear = new Date().getFullYear();
  const expirationYear = parseInt(unmaskedDate.substring(2, 4), 10) + 2000;

  return expirationYear >= actualYear;
};

const isCheckingExpirationPreviousDate = (value: string) => {
  const unmaskedDate = unmask(value);

  const actualMounth = new Date().getMonth() + 1;
  const actualYear = new Date().getFullYear();

  const expirationMonth = parseInt(unmaskedDate.substring(0, 2), 10);
  const expirationYear = parseInt(unmaskedDate.substring(2, 4), 10) + 2000;

  return !(expirationMonth < actualMounth && expirationYear <= actualYear);
};

const isCheckingCvv = (value: string) => {
  const unmaskedCVV = unmask(value);

  return unmaskedCVV.length >= 3;
};

export {
  isCheckingNumberCard,
  isCheckingExpirationMonthCard,
  isCheckingExpirationYearCard,
  isCheckingExpirationPreviousDate,
  isCheckingCvv,
};
