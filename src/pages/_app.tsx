import { QueryClientProvider } from 'react-query';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import AccountService from '@/domain/Account/services/implementations/AccountService';
import AuthService from '@/domain/Auth/services/implementations/AuthService';
import { httpClient } from '@/infra/AxiosHttpClient';
import { reactQueryClient } from '@/infra/ReactQueryClient';
import { AuthProvider } from '@/shared/contexts/AuthContext';
import { ToastProvider } from '@/shared/contexts/ToastContext';
import theme from '@/shared/styles';
import GlobalStyle from '@/shared/styles/global';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const accountService = new AccountService(
    httpClient({ baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string }),
  );

  const authService = new AuthService(
    httpClient({ baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string }),
  );

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <QueryClientProvider client={reactQueryClient}>
          <AuthProvider factory={{ accountService, authService }}>
            <Component {...pageProps} />
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
