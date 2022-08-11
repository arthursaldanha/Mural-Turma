import * as yup from 'yup';

import { fullNameRegex, unmask } from '@/shared/utils/regex';

import {
  isCheckingNumberResidence,
  isCheckingPostalCode,
} from '../tests/address';
import { checkCnpjIsValid, checkCpfIsValid } from '../tests/cpf_cnpj';
import {
  isCheckingCvv,
  isCheckingExpirationMonthCard,
  isCheckingExpirationPreviousDate,
  isCheckingExpirationYearCard,
  isCheckingNumberCard,
} from '../tests/creditCard';
import { isCheckingDate } from '../tests/date';
import { isCheckingPhone } from '../tests/phone';

const email = yup
  .string()
  .email('E-mail inválido')
  .required('E-mail obrigatório');

const name = yup
  .string()
  .matches(fullNameRegex, 'Informe nome e sobrenome')
  .required('Nome obrigatório');

const cpf = yup
  .string()
  .required('CPF obrigatório')
  .test('testCpf', 'Informe um CPF válido', value => {
    const result = checkCpfIsValid(value ?? '');
    return result;
  });

const cpf_cnpj = yup
  .string()
  .required('CPF/CNPJ obrigatório')
  .test('testCpfCnpj', 'Informe um CPF/CNPJ válido', value => {
    if (unmask(value ?? '').length <= 11) {
      const result = checkCpfIsValid(value ?? '');
      return result;
    }

    const result = checkCnpjIsValid(value ?? '');
    return result;
  });

const phone = yup
  .string()
  .required('Telefone obrigatório')
  .test('testPhone', 'Telefone inválido', value => {
    const result = isCheckingPhone(value ?? '');
    return result;
  });

const date = yup.string().test('testDate', 'Informe uma data válida', value => {
  const result = isCheckingDate(value ?? '');
  return result;
});

const postalCode = yup
  .string()
  .required('CEP obrigatório')
  .test('testCep', 'Informe um CEP válido', value => {
    const result = isCheckingPostalCode(value ?? '');
    return result;
  });

const street = yup.string().required('Rua obrigatória');

const number = yup.string().test('testCep', 'Número inválido', value => {
  const result = isCheckingNumberResidence(value ?? '');
  return result;
});

const neighborhood = yup.string().required('Bairro obrigatório');

const cardNumber = yup
  .string()
  .required('Número obrigatório')
  .test('testSize', 'Número inválido', value => {
    const result = isCheckingNumberCard(value ?? '');
    return result;
  });

const expirationDate = yup
  .string()
  .required('Validade é obrigatório.')
  .test('testSize', 'Data inválida', value => {
    const unmaskedDate = unmask(value ?? '');
    return unmaskedDate.length === 4;
  })
  .test('testMonth', 'Mês  inválido', value => {
    const result = isCheckingExpirationMonthCard(value ?? '');
    return result;
  })
  .test('testMonth', 'Ano inválido', value => {
    const result = isCheckingExpirationYearCard(value ?? '');
    return result;
  })
  .test('testPreviousDate', 'Data inválida', value => {
    const result = isCheckingExpirationPreviousDate(value ?? '');
    return result;
  });

const cvv = yup
  .string()
  .required('CVV obrigatório')
  .test('testCVV', 'Informe um CVV válido', value => {
    const result = isCheckingCvv(value ?? '');
    return result;
  });
const cardName = yup.string().required('Apelido obrigatório');

export {
  email,
  name,
  cpf,
  cpf_cnpj,
  phone,
  date,
  postalCode,
  street,
  number,
  neighborhood,
  cardNumber,
  expirationDate,
  cvv,
  cardName,
};
