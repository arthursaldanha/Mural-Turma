import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'
import RecoveryPassword from 'views/forgotPasword'

const RecoveryPasswordPage = () => {
  return <RecoveryPassword />
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

export default RecoveryPasswordPage
