import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import SignIn from 'views/signin'

const SignInPage = () => {
  return <SignIn />
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

export default SignInPage
