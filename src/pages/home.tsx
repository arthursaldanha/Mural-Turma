import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';

import { IAccount } from '@/domain/Account/models/account';
import AccountService from '@/domain/Account/services/implementations/AccountService';
import { IResponseGetPost } from '@/domain/Posts/models/responses/reponseGetPosts';
import PostService from '@/domain/Posts/services/implementations/PostService';
import { httpClient } from '@/infra/AxiosHttpClient';
import { withMenu } from '@/shared/layout/withMenu';
import { HomeFactory } from '@main/factories/Home';

export interface HomePageProps {
  user: IAccount;
  posts: IResponseGetPost;
}

const HomePage: NextPage<HomePageProps> = ({ user, posts }) => (
  <HomeFactory user={user} posts={posts} />
);

export const getServerSideProps: GetServerSideProps = async context => {
  // const { 'muralturma-accessToken': acessToken, 'muralturma-user_id': userId } =
  //   parseCookies(context);

  // if (!acessToken) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //     props: {},
  //   };
  // }

  // const accountService = new AccountService(
  //   httpClient({
  //     baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string,
  //     ctx: context,
  //   }),
  // );

  // const postsService = new PostService(
  //   httpClient({
  //     baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string,
  //     ctx: context,
  //   }),
  // );

  // const userAccount: IAccount = await accountService.findAccount(
  //   Number(userId),
  // );

  // const postsUser: IResponseGetPost = await postsService.getPosts({
  //   classId: userAccount.classList[0].id,
  //   size: 10,
  // });

  // return {
  //   props: { user: userAccount, posts: postsUser },
  // };

  return {
    props: {},
  };
};

export default withMenu(HomePage);
