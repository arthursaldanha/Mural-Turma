/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { IRecoveryPasswordForm } from '@/domain/Auth/models/recoveryPassword';
import { Input } from '@/shared/components/Input';
import { ErrorMessageValidation } from '@/shared/components/Input/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { recoveryPasswordSchema } from '@/shared/validations/main/recoveryPassword';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

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
      <S.ContainerViewPort>
        <S.Container>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              {isLoadingFetch ? 'Confirmando...' : 'Confirmar'}
            </S.Button>
          </form>
        </S.Container>
      </S.ContainerViewPort>
    </>
  );
};
