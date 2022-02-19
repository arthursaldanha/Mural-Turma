import * as yup from 'yup'

export const signUpSchema = yup
  .object({
    username: yup.string().required('Este campo é obrigatório'),
    firstName: yup
      .string()
      .min(2, 'O nome deve possuir no mínimo 2 caracteres')
      .required('Este campo é obrigatório'),
    lastName: yup
      .string()
      .min(3, 'O sobrenome deve possuir no mínimo 3 caracteres')
      .required('Este campo é obrigatório'),
    email: yup
      .string()
      .email('Digite um email válido')
      .matches(/^(\S+@academico.ifs.edu.br)+$/gm, {
        message:
          'O email acadêmico deve seguir o formato: @academico.ifs.edu.br'
      })
      .required('Este campo é obrigatório'),
    password: yup.string().required('Este campo é obrigatório'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não correspondem entre si')
      .required('Este campo é obrigatório')
  })
  .required()
