import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import jwt_decode from 'jwt-decode';
import Router, { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';

import { IAccount } from '@/domain/Account/models/account';
import { AccountServiceSkeleton } from '@/domain/Account/services/AccountServiceSkeleton';
import { IForgotPassword } from '@/domain/Auth/models/forgotPassword';
import { AuthServiceSkeleton } from '@/domain/Auth/services/AuthServiceSkeleton';

import { useToast } from '../hooks/useToast';

type tokenDecodedTypes = IAccount & {
  userId: number;
  sub: string;
};

type AuthFactory = {
  accountService: AccountServiceSkeleton;
  authService: AuthServiceSkeleton;
};

interface AuthProviderProps {
  factory: AuthFactory;
  children: ReactNode;
}

interface AuthContextData {
  account: IAccount | null;
  isAuthenticated: boolean;
  isLoadingFetch: boolean;
  onSignIn: (username: string, password: string) => void;
  onSignOut: () => void;
  onSignUp: (
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => void;
  onForgotPassword: (string: string) => void;
  onRecoveryPassword: (id: number, password: string, token: string) => void;
  setAccount: Dispatch<SetStateAction<IAccount | null>>;
}

export const onForceLogout = () => {
  destroyCookie(undefined, 'muralturma-accessToken');
  destroyCookie(undefined, 'muralturma-refreshToken');
  destroyCookie(undefined, 'muralturma-user_id');

  Router.push('/');
};

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  factory,
  children,
}) => {
  // const [accountService, setAccountService] = useState<AccountServiceSkeleton>(
  //   factory.accountService,
  // );
  const { push } = useRouter();

  const [authService] = useState<AuthServiceSkeleton>(factory.authService);

  const [account, setAccount] = useState<IAccount | null>(null);

  const isAuthenticated = !!account;

  const [isLoadingFetch, setIsLoadingFetch] = useState(false);

  const { toast } = useToast();

  const onSignIn = useCallback(
    async (username: string, password: string) => {
      try {
        setIsLoadingFetch(true);
        const data = await authService.signInWithUsername(username, password);

        const { accessToken, refreshToken } = data;

        const { userId }: tokenDecodedTypes = jwt_decode(accessToken);

        setCookie(null, 'muralturma-accessToken', accessToken, {
          maxAge: 60 * 10, // 10 minutes
          path: '/',
        });

        setCookie(null, 'muralturma-refreshToken', refreshToken, {
          maxAge: 60 * 30, // 30 minutes
          path: '/',
        });

        setCookie(null, 'muralturma-user_id', `${userId}`, {
          maxAge: 60 * 30, // 30 minutes
          path: '/',
        });

        push('/home');
      } catch (error) {
        toast({
          type: 'error',
          title: 'Usuário ou senha inválidos!',
          subTitle: 'Verifique se o nome de usuário e senha estão corretos!',
        });
      } finally {
        setIsLoadingFetch(false);
      }
    },
    [authService, toast, push],
  );

  const onSignUp = useCallback(
    async (
      username: string,
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ) => {
      try {
        setIsLoadingFetch(true);
        await authService.signUp(
          username,
          firstName,
          lastName,
          email,
          password,
        );

        toast({
          type: 'success',
          title: 'Cadastro realizado!',
          subTitle: 'Verifique o seu e-mail para confirmar a conta.',
        });

        setTimeout(() => {
          push('/');
        }, 3000);
      } catch (error) {
        toast({
          type: 'error',
          title: 'Houve um problema!',
          subTitle: 'Verifique os dados inseridos e tente novamente.',
        });
      } finally {
        setIsLoadingFetch(false);
      }
    },
    [authService, toast, push],
  );

  const onForgotPassword = useCallback(
    async (email: string) => {
      try {
        setIsLoadingFetch(true);
        await authService.forgotPassword(email);

        toast({
          type: 'success',
          title: 'Pedido de alteração realizado!',
          subTitle: 'Verifique o seu e-mail para alterar a senha.',
        });

        setTimeout(() => {
          push('/');
        }, 5 * 1000);
      } catch (error) {
        toast({
          type: 'error',
          title: 'Houve um problema!',
          subTitle: 'Verifique o e-mail inserido e tente novamente.',
        });
      } finally {
        setIsLoadingFetch(false);
      }
    },
    [authService, toast, push],
  );

  const onRecoveryPassword = useCallback(
    async (id: number, password: string, token: string) => {
      try {
        setIsLoadingFetch(true);
        await authService.recoveryPassword(
          id,
          password,
          encodeURIComponent(token),
        );

        toast({
          type: 'success',
          title: 'Sucesso!',
          subTitle: 'Sua senha foi alterada com sucesso.',
        });

        setTimeout(() => {
          push('/');
        }, 4 * 1000);
      } catch (error) {
        toast({
          type: 'error',
          title: 'Houve um problema!',
          subTitle:
            'Esta solicitação de senha está expirada. Por favor, solicite-a novamente!',
        });
      } finally {
        setIsLoadingFetch(false);
      }
    },
    [authService, toast, push],
  );

  const onSignOut = useCallback(() => {
    destroyCookie(undefined, 'muralturma-accessToken');
    destroyCookie(undefined, 'muralturma-refreshToken');
    destroyCookie(undefined, 'muralturma-user_id');
    setAccount(null);

    push('/');
  }, [setAccount, push]);

  const value = useMemo(() => {
    return {
      account,
      isAuthenticated,
      isLoadingFetch,
      setAccount,
      onSignIn,
      onSignOut,
      onSignUp,
      onForgotPassword,
      onRecoveryPassword,
    };
  }, [
    account,
    isAuthenticated,
    isLoadingFetch,
    setAccount,
    onSignIn,
    onSignOut,
    onSignUp,
    onForgotPassword,
    onRecoveryPassword,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
