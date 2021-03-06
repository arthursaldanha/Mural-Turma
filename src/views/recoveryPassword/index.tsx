import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

import { Input } from 'components'

import { handleInputMask } from 'utils/masks'
import { recoveryPasswordSchema } from 'schemas/recoveryPassword'
import { getAPIClient } from 'services/axios'

import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import * as S from './styles'

type RecoveryPasswordFormTypes = {
  password: string
  passwordConfirmation: string
}

const RecoveryPassword = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false)
  const [isLoadingFetch, setIsLoadingFetch] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<RecoveryPasswordFormTypes>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(recoveryPasswordSchema)
  })
  const router = useRouter()
  const { token, id } = router.query

  const onSubmit = async (data: RecoveryPasswordFormTypes) => {
    setIsLoadingFetch(true)
    const { password } = data
    const finalData = JSON.stringify({
      id: id,
      password: password,
      token: token
    })
    await getAPIClient()
      .post(`api/v1/user/recovery`, finalData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            'Senha alterada com sucesso! Em instantes, você será redirecionado para a página inicial!',
            {
              theme: 'colored'
            }
          )
          setTimeout(() => {
            Router.push('/')
          }, 2000)
          setIsLoadingFetch(false)
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(`${error.response.data}`, {
            theme: 'colored'
          })
        } else {
          toast.error(
            'Algo de inesperado aconteceu! Tente novamente mais tarde',
            {
              theme: 'colored'
            }
          )
        }
      })
    setIsLoadingFetch(false)
  }

  return (
    <>
      <Head>
        <title>Recuperar a senha • Mural Turma</title>
      </Head>
      <S.ContainerViewPort>
        <S.Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerInput>
              <Input<RecoveryPasswordFormTypes>
                label="password"
                name="password"
                type={isVisiblePassword ? 'text' : 'password'}
                placeholder="Digite sua nova senha"
                autoComplete="off"
                startIcon={<FaKey size="1.3rem" />}
                endIcon={
                  isVisiblePassword ? (
                    <FaRegEye
                      size="1.5rem"
                      onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size="1.5rem"
                      onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                    />
                  )
                }
                register={register}
                errors={errors}
                onInput={(event) => handleInputMask('password', event)}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input<RecoveryPasswordFormTypes>
                label="passwordConfirmation"
                name="passwordConfirmation"
                type={isVisibleConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                autoComplete="off"
                startIcon={<FaKey size="1.3rem" />}
                endIcon={
                  isVisibleConfirmPassword ? (
                    <FaRegEye
                      size="1.5rem"
                      onClick={() =>
                        setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                      }
                    />
                  ) : (
                    <FaRegEyeSlash
                      size="1.5rem"
                      onClick={() =>
                        setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                      }
                    />
                  )
                }
                register={register}
                errors={errors}
                onInput={(event) => handleInputMask('password', event)}
              />
            </S.ContainerInput>

            <S.Button
              type="submit"
              disabled={!isValid || isLoadingFetch}
              loading={isLoadingFetch}
            >
              {isLoadingFetch ? 'Confirmando...' : 'Confirmar'}
            </S.Button>
          </form>
        </S.Container>
      </S.ContainerViewPort>
    </>
  )
}

export default RecoveryPassword
