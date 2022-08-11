// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';

export const getAndSetXClient = () => {
  if (typeof window === 'undefined') return '';

  const storageValue = localStorage.getItem('sec-client');

  if (storageValue) return storageValue;

  const newValue = v4();
  localStorage.setItem('sec-client', newValue);

  return newValue;
};
