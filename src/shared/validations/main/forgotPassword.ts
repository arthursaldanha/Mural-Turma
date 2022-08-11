import * as yup from 'yup';

export const forgotPasswordSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Digite um e-mail válido')
      .matches(
        /^([a-z]{2,20}\.[a-z]{2,20}[0-9]{3}@academico\.ifs\.edu\.br)+$/gm,
        {
          message:
            'Este e-mail não segue o formato acadêmico! Verifique-o e tente novamente.',
        },
      )
      .required('Este campo é obrigatório'),
  })
  .required();
