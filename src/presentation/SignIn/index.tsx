/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';

import Head from 'next/head';
import Link from 'next/link';

import { ISignIn, ISignInForm } from '@/domain/Auth/models/signIn';
import { Input } from '@/shared/components/Input';
import { ErrorMessageValidation } from '@/shared/components/Input/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { signInSchema } from '@/shared/validations/main/signIn';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

export const SignInPresentation = (): JSX.Element => {
  const { isLoadingFetch, onSignIn } = useAuthContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignInForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const handleChange = () => setIsShowingPassword(!isShowingPassword);

  const onSubmit: SubmitHandler<ISignIn> = async ({ username, password }) => {
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
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange } }) => {
                  return (
                    <>
                      <Input
                        type="text"
                        placeholder="Nome de usuário"
                        autoComplete="off"
                        startIcon={<HiUserCircle size={20} color="#fff" />}
                        onChange={onChange}
                        error={!!errors?.username?.message}
                      />
                      {errors?.username && (
                        <ErrorMessageValidation>
                          {errors?.username?.message}
                        </ErrorMessageValidation>
                      )}
                    </>
                  );
                }}
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      type={isShowingPassword ? 'text' : 'password'}
                      placeholder="Senha"
                      autoComplete="off"
                      startIcon={<FaKey size={20} color="#fff" />}
                      endIcon={
                        isShowingPassword ? (
                          <FaRegEye
                            size={20}
                            color="#fff"
                            onClick={handleChange}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={20}
                            color="#fff"
                            onClick={handleChange}
                          />
                        )
                      }
                      onChange={onChange}
                      error={!!errors?.password?.message}
                    />
                    {errors?.password && (
                      <ErrorMessageValidation>
                        {errors?.password?.message}
                      </ErrorMessageValidation>
                    )}
                  </>
                )}
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
