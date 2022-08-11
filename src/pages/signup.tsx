import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';

import { SignUpFactory } from '@main/factories/SignUp';

const SignUpPage: NextPage = () => {
  return <SignUpFactory />;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'muralturma-accessToken': acessToken } = parseCookies(ctx);

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

export default SignUpPage;
