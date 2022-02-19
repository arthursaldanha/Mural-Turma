import * as yup from 'yup'

export const forgotPasswordSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Digite um email válido')
      .matches(/^(\S+@academico.ifs.edu.br)+$/gm, {
        message:
          'O email acadêmico deve seguir o formato: @academico.ifs.edu.br'
      })
      .required('Este campo é obrigatório')
  })
  .required()
