import { Input, Text } from 'components'
import { AuthContext } from 'context/AuthContext'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputTypes = {
  username: string
  password: string
}

const Home = () => {
  const {
    register,
    handleSubmit
    // formState: { errors, isValid, isDirty }
  } = useForm<FormInputTypes>()

  const { signIn } = useContext(AuthContext)

  const onSubmit: SubmitHandler<FormInputTypes> = async ({
    username,
    password
  }: FormInputTypes) => {
    const data = {
      username,
      password
    }

    await signIn(data)
  }

  const [testeinput, setTesteinput] = useState<string>('')

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('username')} placeholder="Username" />
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
        />
        <button type="submit">Entrar</button>
      </form>
      <Link href="/signup">Cadastre-se</Link>
      <br />
      <Input
        placeholder="teste"
        value={testeinput}
        onChange={(e) => setTesteinput(e.target.value)}
      />
      <Text fontFamily="inter">{testeinput}</Text>
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

export default Home
