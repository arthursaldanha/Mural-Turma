import { QueryClientProvider } from 'react-query';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from 'styled-components';

import AccountService from '@/domain/Account/services/implementations/AccountService';
import AuthService from '@/domain/Auth/services/implementations/AuthService';
import PostService from '@/domain/Posts/services/implementations/PostService';
import { httpClient } from '@/infra/AxiosHttpClient';
import { queryClient } from '@/infra/ReactQueryClient';
import { AuthProvider } from '@/shared/contexts/AuthContext';
import { PostProvider } from '@/shared/contexts/PostContext';
import { ToastProvider } from '@/shared/contexts/ToastContext';
import theme from '@/shared/styles';

import '@/shared/styles/global.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const accountService = new AccountService(
    httpClient({ baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string }),
  );

  const authService = new AuthService(
    httpClient({ baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string }),
  );

  const postService = new PostService(
    httpClient({ baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string }),
  );

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider factory={{ accountService, authService }}>
            <PostProvider factory={{ postService }}>
              <NextNProgress
                color={theme.colors.main.primary}
                startPosition={0.3}
                stopDelayMs={200}
                height={4}
                showOnShallow
                options={{ showSpinner: false }}
              />
              <Component {...pageProps} />
            </PostProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default MyApp;
