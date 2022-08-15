import { Controller, useForm } from 'react-hook-form';
import { MdAlternateEmail } from 'react-icons/md';

import Head from 'next/head';
import Link from 'next/link';

import { Input } from '@/shared/components/Input';
import { ErrorMessageValidation } from '@/shared/components/Input/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { forgotPasswordSchema } from '@/shared/validations/main/forgotPassword';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

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
      <S.ContainerViewPort>
        <S.Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerInput>
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
            </S.ContainerInput>

            <S.Button
              type="submit"
              disabled={!isValid || isLoadingFetch}
              loading={isLoadingFetch}
            >
              {isLoadingFetch ? 'Enviando...' : 'Enviar'}
            </S.Button>
          </form>
          <S.ContainerRecoveryPassword>
            <h3 className="title-signup">
              <Link href="/" passHref>
                <a>Voltar para o Login</a>
              </Link>
            </h3>
          </S.ContainerRecoveryPassword>
        </S.Container>
      </S.ContainerViewPort>
    </>
  );
};
