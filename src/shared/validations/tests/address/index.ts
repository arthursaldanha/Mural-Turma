import { unmask } from '@/shared/utils/regex';

const isCheckingPostalCode = (value: string) => {
  const unmaskedCep = unmask(value);

  return unmaskedCep.length === 8;
};

const isCheckingNumberResidence = (value: string) => {
  const unmaskedNumber = unmask(value);

  const testNumber = /^(?:\d{1,4}[a-z]?)?$/i.test(unmaskedNumber);

  return testNumber;
};

export { isCheckingPostalCode, isCheckingNumberResidence };
