import * as yup from 'yup'

export const recoveryPasswordSchema = yup
  .object()
  .shape({
    password: yup.string().required('Este campo é obrigatório'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não correspondem entre si')
      .required('Este campo é obrigatório')
  })
  .required()
