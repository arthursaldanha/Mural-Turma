/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { FormEvent } from 'react';

export function handleInputMask(
  name:
    | 'name'
    | 'firstName'
    | 'lastName'
    | 'username'
    | 'email'
    | 'birthday'
    | 'phone'
    | 'password',
  event: FormEvent<HTMLInputElement>,
) {
  const valueInput = event.currentTarget.value;

  const masks = {
    name: (value: string) => value,
    firstName: (value: string) =>
      value
        .replace(/[^A-zçÇÁÀÃÂáàãâÉÈÊéèêÍÌÎíìîÓÒÔóòôÚÙÛúùû]+/g, '')
        .replace(/[[\]\\]+/g, ''),
    lastName: (value: string) =>
      value.replace(/[^A-zçÇÁÀÃÂáàãâÉÈÊéèêÍÌÎíìîÓÒÔóòôÚÙÛúùû]+/g, ''),
    username: (value: string) => value.replace(/[^a-z0-9._]/gi, ''),
    password: (value: string) => value.replace(/\s+/g, ''),
    email: (value: string) => value.replace(/[^a-z0-9._@]/gi, ''),
    birthday: (value: string) => value,
    phone: (value: string) =>
      value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1'),
  };

  return (event.currentTarget.value = masks[name](valueInput));
}
