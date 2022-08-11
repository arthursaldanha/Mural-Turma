import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';

import { SignInFactory } from '@main/factories/SignIn';

const SignInPage: NextPage = () => {
  return <SignInFactory />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { 'muralturma-accessToken': acessToken } = parseCookies(context);

  if (acessToken) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SignInPage;
