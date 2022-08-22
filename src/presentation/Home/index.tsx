/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { motion } from 'framer-motion';
import Head from 'next/head';

import { CardPosts } from '@/domain/Posts/components/Card';
import {
  IPost,
  IResponseGetPost,
} from '@/domain/Posts/models/responses/reponseGetPosts';
import PostService from '@/domain/Posts/services/implementations/PostService';
import { httpClient } from '@/infra/AxiosHttpClient';
import { HomePageProps } from '@/pages/home';

import { containerAnimation, itemAnimation } from './animations';

const postsService = new PostService(
  httpClient({
    baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string,
  }),
);

const onFetchPosts = async (page = 0) => {
  const data = await postsService.getPosts({
    classId: 1,
    page,
    size: 10,
  });
  return data;
};

export const HomePresentation = ({
  user: userData,
  posts,
}: HomePageProps): JSX.Element => {
  const wrapperPosts = useRef<HTMLDivElement>(null);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['posts'],
    ({ pageParam = 0 }) => onFetchPosts(pageParam),
    {
      getNextPageParam: lastPage => {
        const isLastPage = lastPage.last;
        return isLastPage ? undefined : lastPage.pageable.pageNumber + 1;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
    },
  );

  useEffect(() => {
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target;

      if (
        hasNextPage &&
        scrollHeight - Math.round(scrollTop) === clientHeight
      ) {
        await fetchNextPage();
      }
    };

    const element = document.querySelector('#caixa_principal');

    element!.addEventListener('scroll', onScroll);
    return () => {
      element!.removeEventListener('scroll', onScroll);
    };
  }, [hasNextPage]);

  return (
    <>
      <Head>
        <title>Home • Mural Turma</title>
      </Head>
      <main className="h-full w-full p-6 grid grid-areas-presentationHome grid-cols-presentationHome grid-rows-presentationHome gap-6 bg-zinc-1000 overflow-hidden">
        <motion.section
          id="caixa_principal"
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
          className="h-full p-4 flex flex-col gap-2 grid-in-main bg-zinc-900 rounded-lg overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400"
          ref={wrapperPosts}
        >
          {data?.pages.map(page =>
            page.content.map(post => (
              <motion.div variants={itemAnimation} key={post.id}>
                <CardPosts post={post} />
              </motion.div>
            )),
          )}
        </motion.section>
        <section className="grid-in-firstAside bg-zinc-900 rounded-lg" />
        <section className="grid-in-secondAside bg-zinc-900 rounded-lg" />
      </main>
    </>
  );
};
