import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components'

import { MdEmail } from 'react-icons/md'

import * as S from './styles'
import { handleInputMask } from 'utils/masks'
import Link from 'next/link'
import { getAPIClient } from 'services/axios'
import { forgotPasswordSchema } from 'schemas/forgotPassword'
import { toast } from 'react-toastify'

type ForgotPasswordFormTypes = {
  email: string
}

const RecoveryPassword = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit
  } = useForm<ForgotPasswordFormTypes>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema)
  })

  const onSubmit = async ({ email }: ForgotPasswordFormTypes) => {
    await getAPIClient()
      .get(`api/v1/user/recovery?email=${email}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            'Solicitação de alteração de senha criada com sucesso! Por favor, confira seu email acadêmico!',
            {
              theme: 'colored'
            }
          )
        }
      })
      .catch(() => {
        toast.error(
          'Este email não existe! Por favor, verifique se está correto!',
          {
            theme: 'colored'
          }
        )
      })
  }

  return (
    <S.ContainerViewPort>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerInput>
            <Input<ForgotPasswordFormTypes>
              label="email"
              name="email"
              type="text"
              placeholder="Email"
              autoComplete="off"
              startIcon={<MdEmail size="1.5rem" />}
              register={register}
              errors={errors}
              onInput={(event) => handleInputMask('email', event)}
            />
          </S.ContainerInput>

          <S.Button type="submit" disabled={!isValid} loading={isSubmitting}>
            Enviar
          </S.Button>
        </form>
        <S.ContainerRecoveryPassword>
          <h3 className="title-signup">
            <Link href={'/'} passHref>
              <a>Voltar para o Login</a>
            </Link>
          </h3>
        </S.ContainerRecoveryPassword>
      </S.Container>
    </S.ContainerViewPort>
  )
}

export default RecoveryPassword
