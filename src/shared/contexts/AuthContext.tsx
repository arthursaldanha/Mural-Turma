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
import { setCookie } from 'nookies';

import { IAccount } from '@/domain/Account/models/account';
import { AccountServiceSkeleton } from '@/domain/Account/services/AccountServiceSkeleton';
import { IForgotPassword } from '@/domain/Auth/models/forgotPassword';
import { IRecoveryPassword } from '@/domain/Auth/models/recoveryPassword';
import { ISignIn } from '@/domain/Auth/models/signIn';
import { ISignUp } from '@/domain/Auth/models/signUp';
import { AuthServiceSkeleton } from '@/domain/Auth/services/AuthServiceSkeleton';

import { useToast } from '../hooks/useToast';
import { destroyCookie } from '../utils/cookie';

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
  onSignIn: (credentials: ISignIn) => void;
  onSignOut: () => void;
  onSignUp: (signUpSchema: ISignUp) => void;
  onForgotPassword: (forgotPasswordSchema: IForgotPassword) => void;
  onRecoveryPassword: (recoveryPasswordSchema: IRecoveryPassword) => void;
  setAccount: Dispatch<SetStateAction<IAccount | null>>;
}

export const onForceLogout = () => {
  destroyCookie('muralturma-accessToken');
  destroyCookie('muralturma-refreshToken');
  destroyCookie('muralturma-user_id');

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
    async (signInSchema: ISignIn) => {
      try {
        setIsLoadingFetch(true);
        const data = await authService.signInWithUsername(signInSchema);

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
    async (signUpSchema: ISignUp) => {
      try {
        setIsLoadingFetch(true);
        await authService.signUp(signUpSchema);

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
    async (forgotPasswordSchema: IForgotPassword) => {
      try {
        setIsLoadingFetch(true);
        await authService.forgotPassword(forgotPasswordSchema);

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
    async (recoveryPasswordSchema: IRecoveryPassword) => {
      try {
        setIsLoadingFetch(true);
        await authService.recoveryPassword(recoveryPasswordSchema);

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
    destroyCookie('muralturma-accessToken');
    destroyCookie('muralturma-refreshToken');
    destroyCookie('muralturma-user_id');
    setAccount(null);
  }, [setAccount]);

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
