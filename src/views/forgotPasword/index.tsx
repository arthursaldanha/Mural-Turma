import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components'
import { toast } from 'react-toastify'

import { handleInputMask } from 'utils/masks'
import { getAPIClient } from 'services/axios'
import { forgotPasswordSchema } from 'schemas/forgotPassword'

import { MdEmail } from 'react-icons/md'
import * as S from './styles'
import { useState } from 'react'

type ForgotPasswordFormTypes = {
  email: string
}

const RecoveryPassword = () => {
  const [isLoadingFetch, setIsLoadingFetch] = useState(false)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<ForgotPasswordFormTypes>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema)
  })

  const onSubmit = async ({ email }: ForgotPasswordFormTypes) => {
    setIsLoadingFetch(true)
    await getAPIClient()
      .get(`api/v1/user/recovery?email=${email}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            'Solicitação de alteração de senha criada com sucesso! Por favor, confira seu e-mail acadêmico!',
            {
              theme: 'colored'
            }
          )
        }
        setIsLoadingFetch(false)
      })
      .catch(() => {
        toast.error(
          'Este e-mail não existe! Por favor, verifique se está correto!',
          {
            theme: 'colored'
          }
        )
        setIsLoadingFetch(false)
      })
    setIsLoadingFetch(false)
  }

  return (
    <>
      <Head>
        <title>Esqueceu a senha? • Mural Turma</title>
      </Head>
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

            <S.Button
              type="submit"
              disabled={!isValid || isLoadingFetch}
              loading={isLoadingFetch}
            >
              {isLoadingFetch ? 'Enviando...' : 'Enviar'}
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
    </>
  )
}

export default RecoveryPassword
