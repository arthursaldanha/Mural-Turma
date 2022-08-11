import React from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';

import { ForgotPasswordFactory } from '@main/factories/ForgotPassword';

const ForgotPasswordPage: NextPage = () => {
  return <ForgotPasswordFactory />;
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

export default ForgotPasswordPage;
