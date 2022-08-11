import React from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';

import { RecoveryPasswordFactory } from '@main/factories/RecoveryPassword';

const RecoveryPasswordPage: NextPage = () => {
  return <RecoveryPasswordFactory />;
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

export default RecoveryPasswordPage;
