/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';

import Head from 'next/head';
import Link from 'next/link';

import { ISignIn, ISignInForm } from '@/domain/Auth/models/signIn';
import { Loading } from '@/shared/components/Feedback/Loading';
import { Input } from '@/shared/components/Input';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { signInSchema } from '@/shared/validations/main/signIn';
import { yupResolver } from '@hookform/resolvers/yup';

export const SignInPresentation = (): JSX.Element => {
  const { isLoadingFetch, onSignIn } = useAuthContext();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
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
                        startIcon={<HiUserCircle size={18} color="#fff" />}
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
                            onClick={handleChange}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={18}
                            color="#fff"
                            onClick={handleChange}
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

              <div className="flex justify-end mt-2.5 text-base font-inter">
                <h3>
                  <Link href="/forgot_password" passHref>
                    <a className="text-green-500 hover:text-green-400 decoration-none transition-all duration-200 ease">
                      Esqueceu a senha?
                    </a>
                  </Link>
                </h3>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoadingFetch}
              className="w-full flex justify-center items-center text-zinc-800 bg-green-500 text-base font-inter font-medium rounded-[10px] p-4 transition-all duration-300 ease cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-400"
            >
              {isLoadingFetch ? <Loading /> : 'Entrar'}
            </button>
          </form>

          <div className="mt-5">
            <h3 className="text-base font-inter">
              Não possui login?{' '}
              <Link href="/signup" passHref>
                <a className="text-green-500 hover:text-green-400 decoration-none transition-all duration-200 ease">
                  Cadastre-se
                </a>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
