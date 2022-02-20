import { useContext, useState } from 'react'
import { AuthContext } from 'context/AuthContext'
import Link from 'next/link'
import Head from 'next/head'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components'

import { signInSchema } from 'schemas/signIn'
import { handleInputMask } from 'utils/masks'

import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { HiUserCircle } from 'react-icons/hi'
import * as S from './styles'

type SignInFormTypes = {
  username: string
  password: string
}

const SignIn = () => {
  const { signIn } = useContext(AuthContext)
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<SignInFormTypes>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormTypes) => {
    await signIn(data)
  }

  const [isVisible, setIsVisibility] = useState(false)

  return (
    <>
      <Head>
        <title>Login • Mural Turma</title>
      </Head>
      <S.ContainerViewPort>
        <S.Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerInput>
              <Input<SignInFormTypes>
                label="username"
                name="username"
                type="text"
                placeholder="Nome de usuário"
                autoComplete="off"
                startIcon={<HiUserCircle size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event) => handleInputMask('username', event)}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input<SignInFormTypes>
                label="password"
                name="password"
                placeholder="Senha"
                autoComplete="off"
                type={isVisible ? 'text' : 'password'}
                startIcon={<FaKey size="1.4rem" />}
                endIcon={
                  isVisible ? (
                    <FaRegEye
                      size="1.5rem"
                      onClick={() => setIsVisibility(!isVisible)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size="1.5rem"
                      onClick={() => setIsVisibility(!isVisible)}
                    />
                  )
                }
                register={register}
                errors={errors}
                onInput={(event) => handleInputMask('password', event)}
              />
              <S.ContainerForgotPassword>
                <h3 className="title-recoverypassword">
                  <Link href={'/forgot_password'} passHref>
                    <a>Esqueceu a senha?</a>
                  </Link>
                </h3>
              </S.ContainerForgotPassword>
            </S.ContainerInput>
            <S.Button type="submit" loading={isSubmitting}>
              Entrar
            </S.Button>
          </form>
          <S.ContainerSignUp>
            <h3 className="title-signup">
              Não possui login?{' '}
              <Link href={'/signup'} passHref>
                <a>Cadastre-se</a>
              </Link>
            </h3>
          </S.ContainerSignUp>
        </S.Container>
      </S.ContainerViewPort>
    </>
  )
}

export default SignIn
