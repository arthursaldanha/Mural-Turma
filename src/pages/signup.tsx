import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import { getAPIClient } from 'services/axios'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormInputTypes = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

const schema = yup
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
    password: yup.string().required('Este campo é obrigatório')
  })
  .required()

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors /* isValid, isDirty */ }
  } = useForm<FormInputTypes>({
    resolver: yupResolver(schema)
  })

  const [isHidingPassword, setIsHidingPassword] = useState(true)

  const handleClickShowPassword = () => {
    setIsHidingPassword(!isHidingPassword)
  }

  const onSubmit: SubmitHandler<FormInputTypes> = async ({
    username,
    firstName,
    lastName,
    email,
    password
  }: FormInputTypes) => {
    const data = {
      username,
      firstName,
      lastName,
      email,
      password
    }

    await getAPIClient().post('api/v1/user/signup', data)
    Router.push('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register('username')}
            placeholder="Nome de usuário"
            autoComplete="off"
          />
          <p>{errors.username?.message}</p>
        </div>

        <div>
          <input
            type="text"
            {...register('firstName')}
            placeholder="Nome"
            autoComplete="off"
          />
          <p>{errors.firstName?.message}</p>
        </div>

        <div>
          <input
            type="text"
            {...register('lastName')}
            placeholder="Sobrenome"
            autoComplete="off"
          />
          <p>{errors.lastName?.message}</p>
        </div>

        <div>
          <input
            type="text"
            {...register('email')}
            placeholder="Email Acadêmico"
            autoComplete="off"
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <input
            type={isHidingPassword ? 'password' : 'text'}
            {...register('password')}
            placeholder="Senha"
            autoComplete="off"
          />
          <button type="button" onClick={handleClickShowPassword}>
            Visualizar senha
          </button>
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
      <div>
        <Link href="/">Já possui um login?</Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['muralturma-token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default SignUp
