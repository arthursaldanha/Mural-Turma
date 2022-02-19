import { ChangeEvent } from 'react'

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
  event: ChangeEvent<HTMLInputElement>
) {
  const {
    target: { value }
  } = event

  const masks = {
    name: (value: string) => value,
    firstName: (value: string) =>
      value.replace(/[^A-z]+/g, '').replace(/[[\]\\]+/g, ''),
    lastName: (value: string) => value.replace(/[^A-z]+/g, ''),
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
        .replace(/(-\d{4})\d+?$/, '$1')
  }

  return (event.target.value = masks[name](value))
}
