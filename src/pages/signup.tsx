import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import SignUp from 'views/signup'

const SignUpPage = () => {
  return <SignUp />
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

export default SignUpPage
