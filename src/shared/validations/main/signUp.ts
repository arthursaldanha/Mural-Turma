import * as yup from 'yup';

export const signUpSchema = yup
  .object({
    username: yup.string().required('Este campo é obrigatório'),
    firstName: yup
      .string()
      .min(2, 'O nome deve possuir no mínimo 2 caracteres')
      .required('Este campo é obrigatório'),
    lastName: yup
      .string()
      .min(2, 'O sobrenome deve possuir no mínimo 2 caracteres')
      .required('Este campo é obrigatório'),
    email: yup
      .string()
      .email('Digite um e-mail válido')
      .matches(
        /^([a-z]{2,20}\.[a-z]{2,20}[0-9]{3}@academico\.ifs\.edu\.br)+$/gm,
        {
          message:
            'O e-mail acadêmico deve seguir o formato: nome.sobrenome000@academico.ifs.edu.br',
        },
      )
      .required('Este campo é obrigatório'),
    password: yup.string().required('Este campo é obrigatório'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
      .required('Este campo é obrigatório'),
  })
  .required();
