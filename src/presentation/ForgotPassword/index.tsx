import { Controller, useForm } from 'react-hook-form';
import { MdAlternateEmail } from 'react-icons/md';

import Head from 'next/head';
import Link from 'next/link';

import { Loading } from '@/shared/components/Feedback/Loading';
import { Input } from '@/shared/components/Input';
import { ErrorMessageValidation } from '@/shared/components/Input/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { forgotPasswordSchema } from '@/shared/validations/main/forgotPassword';
import { yupResolver } from '@hookform/resolvers/yup';

type ForgotPasswordFormTypes = {
  email: string;
};

export const ForgotPasswordPresentation = (): JSX.Element => {
  const { isLoadingFetch, onForgotPassword } = useAuthContext();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ForgotPasswordFormTypes>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async ({ email }: ForgotPasswordFormTypes) => {
    await onForgotPassword(email);
  };

  return (
    <>
      <Head>
        <title>Esqueceu a senha? • Mural Turma</title>
      </Head>
      <div className="min-h-screen min-w-screen py-5 px-2.5 flex justify-center items-center bg-zinc-1000">
        <div className="max-w-md w-full p-8 bg-zinc-900 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange } }) => {
                  return (
                    <>
                      <Input
                        name="email"
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
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoadingFetch}
              className="w-full flex justify-center items-center text-zinc-800 bg-green-500 text-base font-inter font-medium rounded-[10px] p-4 transition-all duration-300 ease cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-400"
            >
              {isLoadingFetch ? <Loading /> : 'Enviar'}
            </button>
          </form>
          <div className="mt-5">
            <h3 className="text-base font-inter">
              <Link href="/" passHref>
                <a className="text-green-500 hover:text-green-400 decoration-none transition-all duration-200 ease">
                  Voltar para o Login
                </a>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
