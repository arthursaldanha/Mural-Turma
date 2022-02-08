import { GetServerSideProps } from 'next'
import { getAPIClient } from 'services/axios'
import { parseCookies } from 'nookies'
import { User } from 'types/user'
import { useContext } from 'react'
import { AuthContext } from 'context/AuthContext'

type HomeProps = {
  userTheme: string
  userData: User
}

export default function Dashboard({ userData }: HomeProps) {
  const { user, signOut, setUser } = useContext(AuthContext)
  setUser(userData)

  return (
    <>
      <h1>Página logada</h1>
      <p>ID de Usuário: {user?.id}</p>
      <p>Email: {user?.email}</p>
      <p>Nome de usuário: {user?.username}</p>
      <p>Nome: {user?.firstName}</p>
      <p>Sobrenome: {user?.lastName}</p>
      <p>Avatar: {user?.avatar}</p>

      <button onClick={signOut}>Sair da Aplicação</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['muralturma-token']: token, ['muralturma-user_id']: userId } =
    parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
      props: {}
    }
  }

  const { data } = await apiClient.get(`/api/v1/user/${userId}`)

  return {
    props: { userData: data }
  }
}
