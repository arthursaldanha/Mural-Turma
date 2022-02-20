import { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { getAPIClient } from 'services/axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { handleInputMask } from 'utils/masks'
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { HiUserCircle } from 'react-icons/hi'
import { MdAlternateEmail, MdEmail } from 'react-icons/md'
import { signUpSchema } from 'schemas/signUp'

import { Input } from 'components'

import * as S from './styles'
import { toast } from 'react-toastify'

type SignUpFormTypes = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUp = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit
  } = useForm<SignUpFormTypes>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signUpSchema)
  })

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false)

  const onSubmit: SubmitHandler<SignUpFormTypes> = async (
    data: SignUpFormTypes
  ) => {
    await getAPIClient()
      .post('api/v1/user/signup', data)
      .then(() => {
        toast.success(
          'Cadastro criado com sucesso! Em instantes, você receberá um email para ativação da conta.',
          {
            theme: 'colored',
            autoClose: 8000
          }
        )
        setTimeout(() => {
          Router.push('/')
        }, 2000)
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
  }

  return (
    <>
      <Head>
        <title>Cadastre-se • Mural Turma</title>
      </Head>
      <S.ContainerViewPort>
        <S.Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerInput>
              <Input<SignUpFormTypes>
                label="username"
                name="username"
                type="text"
                placeholder="Nome de usuário"
                autoComplete="off"
                startIcon={<MdAlternateEmail size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event) => handleInputMask('username', event)}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input<SignUpFormTypes>
                label="firstName"
                name="firstName"
                type="text"
                placeholder="Nome"
                autoComplete="off"
                startIcon={<HiUserCircle size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event) => handleInputMask('firstName', event)}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input<SignUpFormTypes>
                label="lastName"
                name="lastName"
                type="text"
                placeholder="Sobrenome"
                autoComplete="off"
                startIcon={<HiUserCircle size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event) => handleInputMask('lastName', event)}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input<SignUpFormTypes>
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

            <S.ContainerInput>
              <Input<SignUpFormTypes>
                label="password"
                name="password"
                placeholder="Digite uma senha"
                autoComplete="off"
                type={isVisiblePassword ? 'text' : 'password'}
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
              <Input<SignUpFormTypes>
                label="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Confirme sua senha"
                autoComplete="off"
                type={isVisibleConfirmPassword ? 'text' : 'password'}
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
            <S.Button type="submit" disabled={!isValid} loading={isSubmitting}>
              Cadastrar
            </S.Button>
          </form>
          <S.ContainerSignUp>
            <h3 className="title-signup">
              Já possui login?{' '}
              <Link href={'/'} passHref>
                <a>Entrar</a>
              </Link>
            </h3>
          </S.ContainerSignUp>
        </S.Container>
      </S.ContainerViewPort>
    </>
  )
}

export default SignUp
