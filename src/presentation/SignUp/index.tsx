import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';
import { MdAlternateEmail } from 'react-icons/md';

import Head from 'next/head';
import Link from 'next/link';

import { ISignUpForm } from '@/domain/Auth/models/signUp';
import { Input } from '@/shared/components/Input';
import { ErrorMessageValidation } from '@/shared/components/Input/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { signUpSchema } from '@/shared/validations/main/signUp';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

export const SignUpPresentation = (): JSX.Element => {
  const { isLoadingFetch, onSignUp } = useAuthContext();

  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isShowingPasswordConfirm, setIsShowingPasswordConfirm] =
    useState(false);

  const handleChangeVisiblePassword = () =>
    setIsShowingPassword(!isShowingPassword);

  const handleChangeVisiblePasswordConfirm = () =>
    setIsShowingPasswordConfirm(!isShowingPasswordConfirm);

  const {
    control,
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
                name="firstName"
                render={({ field: { onChange } }) => {
                  return (
                    <>
                      <Input
                        type="text"
                        placeholder="Nome"
                        autoComplete="off"
                        startIcon={<HiUserCircle size={20} color="#fff" />}
                        onChange={onChange}
                        error={!!errors?.firstName?.message}
                      />
                      {errors?.firstName && (
                        <ErrorMessageValidation>
                          {errors?.firstName?.message}
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
                name="lastName"
                render={({ field: { onChange } }) => {
                  return (
                    <>
                      <Input
                        type="text"
                        placeholder="Sobrenome"
                        autoComplete="off"
                        startIcon={<HiUserCircle size={20} color="#fff" />}
                        onChange={onChange}
                        error={!!errors?.lastName?.message}
                      />
                      {errors?.lastName && (
                        <ErrorMessageValidation>
                          {errors?.lastName?.message}
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
                name="email"
                render={({ field: { onChange } }) => {
                  return (
                    <>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        startIcon={<MdAlternateEmail size={20} color="#fff" />}
                        onChange={onChange}
                        error={!!errors?.email?.message}
                      />
                      {errors?.email && (
                        <ErrorMessageValidation>
                          {errors?.email?.message}
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
                            onClick={handleChangeVisiblePassword}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={20}
                            color="#fff"
                            onClick={handleChangeVisiblePassword}
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
            </S.ContainerInput>

            <S.ContainerInput>
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      type={isShowingPasswordConfirm ? 'text' : 'password'}
                      placeholder="Confirme a senha"
                      autoComplete="off"
                      startIcon={<FaKey size={20} color="#fff" />}
                      endIcon={
                        isShowingPasswordConfirm ? (
                          <FaRegEye
                            size={20}
                            color="#fff"
                            onClick={handleChangeVisiblePasswordConfirm}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={20}
                            color="#fff"
                            onClick={handleChangeVisiblePasswordConfirm}
                          />
                        )
                      }
                      onChange={onChange}
                      error={!!errors?.passwordConfirmation?.message}
                    />
                    {errors?.passwordConfirmation && (
                      <ErrorMessageValidation>
                        {errors?.passwordConfirmation?.message}
                      </ErrorMessageValidation>
                    )}
                  </>
                )}
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
