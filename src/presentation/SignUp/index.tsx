import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';
import { MdAlternateEmail } from 'react-icons/md';

import Head from 'next/head';
import Link from 'next/link';

import { ISignUpForm } from '@/domain/Auth/models/signUp';
import { Loading } from '@/shared/components/Feedback/Loading';
import { Input } from '@/shared/components/Input';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { signUpSchema } from '@/shared/validations/main/signUp';
import { yupResolver } from '@hookform/resolvers/yup';

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
      <div className="min-h-screen min-w-screen py-5 px-2.5 flex justify-center items-center bg-zinc-1000">
        <div className="max-w-md w-full p-8 bg-zinc-900 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
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
                        // startIcon={<HiUserCircle size={20} color="#fff" />}
                        onChange={onChange}
                        error={!!errors?.username?.message}
                      />
                      {errors?.username && (
                        <div className="mt-2 ml-2 text-sm text-red-300 font-inter font-medium leading-4">
                          {errors?.username?.message}
                        </div>
                      )}
                    </>
                  );
                }}
              />
            </div>

            <div className="mb-4">
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
                        startIcon={<HiUserCircle size={18} color="#fff" />}
                        onChange={onChange}
                        error={!!errors?.firstName?.message}
                      />
                      {errors?.firstName && (
                        <div className="mt-2 ml-2 text-sm text-red-300 font-inter font-medium leading-4">
                          {errors?.firstName?.message}
                        </div>
                      )}
                    </>
                  );
                }}
              />
            </div>

            <div className="mb-4">
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
                        startIcon={<HiUserCircle size={18} color="#fff" />}
                        onChange={onChange}
                        error={!!errors?.lastName?.message}
                      />
                      {errors?.lastName && (
                        <div className="mt-2 ml-2 text-sm text-red-300 font-inter font-medium leading-4">
                          {errors?.lastName?.message}
                        </div>
                      )}
                    </>
                  );
                }}
              />
            </div>

            <div className="mb-4">
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
                        startIcon={<MdAlternateEmail size={18} color="#fff" />}
                        onChange={onChange}
                        error={!!errors?.email?.message}
                      />
                      {errors?.email && (
                        <div className="mt-2 ml-2 text-sm text-red-300 font-inter font-medium leading-4">
                          {errors?.email?.message}
                        </div>
                      )}
                    </>
                  );
                }}
              />
            </div>

            <div className="mb-4">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      type={isShowingPassword ? 'text' : 'password'}
                      placeholder="Senha"
                      autoComplete="off"
                      startIcon={<FaKey size={18} color="#fff" />}
                      endIcon={
                        isShowingPassword ? (
                          <FaRegEye
                            size={18}
                            color="#fff"
                            onClick={handleChangeVisiblePassword}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={18}
                            color="#fff"
                            onClick={handleChangeVisiblePassword}
                          />
                        )
                      }
                      onChange={onChange}
                      error={!!errors?.password?.message}
                    />
                    {errors?.password && (
                      <div className="mt-2 ml-2 text-sm text-red-300 font-inter font-medium leading-4">
                        {errors?.password?.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { onChange } }) => (
                  <>
                    <Input
                      type={isShowingPasswordConfirm ? 'text' : 'password'}
                      placeholder="Confirme a senha"
                      autoComplete="off"
                      startIcon={<FaKey size={18} color="#fff" />}
                      endIcon={
                        isShowingPasswordConfirm ? (
                          <FaRegEye
                            size={18}
                            color="#fff"
                            onClick={handleChangeVisiblePasswordConfirm}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={18}
                            color="#fff"
                            onClick={handleChangeVisiblePasswordConfirm}
                          />
                        )
                      }
                      onChange={onChange}
                      error={!!errors?.passwordConfirmation?.message}
                    />
                    {errors?.passwordConfirmation && (
                      <div className="mt-2 ml-2 text-sm text-red-300 font-inter font-medium leading-4">
                        {errors?.passwordConfirmation?.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoadingFetch}
              className="w-full flex justify-center items-center text-zinc-800 bg-green-500 text-base font-inter font-medium rounded-[10px] p-4 transition-all duration-300 ease cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-400"
            >
              {isLoadingFetch ? <Loading /> : 'Cadastrar'}
            </button>
          </form>

          <div className="mt-5">
            <h3 className="text-base font-inter">
              Já possui login?{' '}
              <Link href="/" passHref>
                <a className="text-green-500 hover:text-green-400 decoration-none transition-all duration-200 ease">
                  Entrar
                </a>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
