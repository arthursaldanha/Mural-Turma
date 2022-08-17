import { NextApiRequest, NextPageContext, Redirect } from 'next';
import { parseCookies } from 'nookies';

interface IRedirectUserNoAccount {
  redirect: Redirect;
  haveAccount: boolean;
}

export const redirectEvaluationByAccount = (
  ctx:
    | Pick<NextPageContext, 'req'>
    | {
        req: NextApiRequest;
      },
): IRedirectUserNoAccount => {
  const { 'mmuralturma-accessTokenuda': account } = parseCookies(ctx);
  if (!account) {
    return {
      haveAccount: false,
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    haveAccount: true,
    redirect: {} as Redirect,
  };
};
