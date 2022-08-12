/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';
import { MdAlternateEmail, MdEmail } from 'react-icons/md';

import Head from 'next/head';
import Link from 'next/link';

import { ISignUpForm } from '@/domain/Auth/models/signUp';
import { Input } from '@/shared/components/InputRHF/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { handleInputMask } from '@/shared/utils/input/masks';
import { signUpSchema } from '@/shared/validations/main/signUp';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

export const SignUpPresentation = (): JSX.Element => {
  const { isLoadingFetch, onSignUp } = useAuthContext();

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ISignUpForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<ISignUpForm> = async ({
    username,
    firstName,
    lastName,
    email,
    password,
  }: ISignUpForm) => {
    console.log('data :>> ', {
      username,
      firstName,
      lastName,
      email,
      password,
    });
    await onSignUp(username, firstName, lastName, email, password);
  };

  return (
    <>
      <Head>
        <title>Cadastre-se • Mural Turma</title>
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
                {...register('firstName', {
                  required: 'Please enter your first name.',
                })}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <input
                {...register('lastName', {
                  required: 'Please enter your first name.',
                })}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <input
                {...register('email', {
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
            </S.ContainerInput>

            <S.ContainerInput>
              <input
                {...register('passwordConfirmation', {
                  required: 'Please enter your first name.',
                })}
              />
            </S.ContainerInput>
            <S.Button
              type="submit"
              disabled={!isValid || isLoadingFetch}
              loading={isLoadingFetch}
            >
              {isLoadingFetch ? 'Cadastrando...' : 'Cadastrar'}
            </S.Button>
          </form>
          <S.ContainerSignUp>
            <h3 className="title-signup">
              Já possui login?{' '}
              <Link href="/" passHref>
                <a>Entrar</a>
              </Link>
            </h3>
          </S.ContainerSignUp>
        </S.Container>
      </S.ContainerViewPort>
    </>
  );
};
