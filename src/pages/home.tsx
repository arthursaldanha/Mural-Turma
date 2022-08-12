import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';

import { IAccount } from '@/domain/Account/models/account';
import AccountService from '@/domain/Account/services/implementations/AccountService';
import { httpClient } from '@/infra/AxiosHttpClient';
import { withMenu } from '@/shared/layout/withMenu';
import { HomeFactory } from '@main/factories/Home';

export interface HomePageProps {
  user: IAccount | null;
}

const HomePage: NextPage<HomePageProps> = ({ user }) => (
  <HomeFactory user={user} />
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { 'muralturma-accessToken': acessToken, 'muralturma-user_id': userId } =
    parseCookies(context);

  if (!acessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  const accountService = new AccountService(
    httpClient({
      baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string,
      ctx: context,
    }),
  );

  const userAccount: IAccount | null = await accountService.findAccount(
    Number(userId),
  );

  return {
    props: { user: userAccount! || null },
  };
};

export default withMenu(HomePage);
