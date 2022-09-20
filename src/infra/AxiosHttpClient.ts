/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext, PreviewData } from 'next';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ParsedUrlQuery } from 'querystring';

import { onForceLogout } from '@/shared/contexts/AuthContext';

interface HttpClientProps {
  baseURL: string;
  ctx?:
    | NextPageContext
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | null
    | undefined;
}

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

export const httpClient = ({ baseURL, ctx }: HttpClientProps) => {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL,
  });

  if (cookies['muralturma-accessToken']) {
    api.defaults.headers.common.Authorization = `Bearer ${cookies['muralturma-accessToken']}`;
  }

  api.interceptors.request.use(config => {
    cookies = parseCookies();
    const {
      'muralturma-refreshToken': refreshToken,
      'muralturma-user_id': userID,
    } = cookies;

    if (!refreshToken && userID && window.location.pathname !== '/') {
      destroyCookie(undefined, 'muralturma-accessToken');
      destroyCookie(undefined, 'muralturma-refreshToken');
      destroyCookie(undefined, 'muralturma-user_id');
      Router.push('/');

      isRefreshing = false;

      throw new axios.Cancel(
        'Request canceled because Refresh Token is expired',
      );
    }

    return config;
  });

  api.interceptors.response.use(
    response => response,
    error => {
      if (
        error.response?.status === 498 &&
        error.response?.data?.code === 'accessToken.expired'
      ) {
        cookies = parseCookies(ctx);

        const originalRequest = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post(
              `/user/refreshtoken`,
              {
                refreshToken: cookies['muralturma-refreshToken'],
              },
              {
                headers: {
                  Authorization: '',
                },
              },
            )
            .then(response => {
              const { accessToken, refreshToken } = response.data;

              setCookie(ctx, 'muralturma-accessToken', accessToken, {
                maxAge: 60 * 10, // 10 minutes
                path: '/',
              });

              setCookie(ctx, 'muralturma-refreshToken', refreshToken, {
                maxAge: 60 * 30, // 30 minutes
                path: '/',
              });

              api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

              failedRequestsQueue.forEach(request =>
                request.onSuccess(accessToken),
              );
              failedRequestsQueue = [];
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err));
              failedRequestsQueue = [];

              if (process.browser) {
                onForceLogout();
              }
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;

              resolve(api(originalRequest));
            },
            onFailure: (err: Error) => {
              reject(err);
            },
          });
        });
      }

      return Promise.reject(error);
    },
  );

  return api;
};
