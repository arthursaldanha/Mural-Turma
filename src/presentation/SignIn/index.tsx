import { FormEvent, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';

/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import Link from 'next/link';

import { ISignIn, ISignInForm } from '@/domain/Auth/models/signIn';
import { Input } from '@/shared/components/InputRHF';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { handleInputMask } from '@/shared/utils/input/masks';
import { signInSchema } from '@/shared/validations/main/signIn';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

export const SignInPresentation = (): JSX.Element => {
  const [isVisible, setIsVisibility] = useState(false);
  const { isLoadingFetch, onSignIn } = useAuthContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<ISignIn> = async ({ username, password }) => {
    console.log('data :>> ', { username, password });
    await onSignIn(username, password);
  };

  return (
    <>
      <Head>
        <title>Login • Mural Turma</title>
      </Head>
      <S.ContainerViewPort>
        <S.Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerInput>
              <input
                {...register('username', {
                  required: 'Please enter your first name.',
                })}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <input
                {...register('password', {
                  required: 'Please enter your first name.',
                })}
              />

              <S.ContainerForgotPassword>
                <h3 className="title-recoverypassword">
                  <Link href="/forgot_password" passHref>
                    <a>Esqueceu a senha?</a>
                  </Link>
                </h3>
              </S.ContainerForgotPassword>
            </S.ContainerInput>
            <S.Button type="submit" disabled={isLoadingFetch}>
              {isLoadingFetch ? 'Carregando...' : 'Entrar'}
            </S.Button>
          </form>
          <S.ContainerSignUp>
            <h3 className="title-signup">
              Não possui login?{' '}
              <Link href="/signup" passHref>
                <a>Cadastre-se</a>
              </Link>
            </h3>
          </S.ContainerSignUp>
        </S.Container>
      </S.ContainerViewPort>
    </>
  );
};
