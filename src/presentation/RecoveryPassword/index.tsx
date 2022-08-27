/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { IRecoveryPasswordForm } from '@/domain/Auth/models/recoveryPassword';
import { Loading } from '@/shared/components/Feedback/Loading';
import { Input } from '@/shared/components/Input';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { recoveryPasswordSchema } from '@/shared/validations/main/recoveryPassword';
import { yupResolver } from '@hookform/resolvers/yup';

export const RecoveryPasswordPresentation = (): JSX.Element => {
  const { isLoadingFetch, onRecoveryPassword } = useAuthContext();

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
  } = useForm<IRecoveryPasswordForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(recoveryPasswordSchema),
  });
  const {
    query: { token, id },
  } = useRouter();

  const onSubmit = async ({ password }: IRecoveryPasswordForm) => {
    onRecoveryPassword(Number(id), password, String(token));
  };

  return (
    <>
      <Head>
        <title>Recuperar a senha • Mural Turma</title>
      </Head>
      <div className="min-h-screen min-w-screen py-5 px-2.5 flex justify-center items-center bg-zinc-1000">
        <div className="max-w-md w-full p-8 bg-zinc-900 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
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
              {isLoadingFetch ? <Loading /> : 'Confirmar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
