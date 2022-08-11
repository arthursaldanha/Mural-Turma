import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import Head from 'next/head';
import Link from 'next/link';

import { Input } from '@/shared/components/InputRHF/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { handleInputMask } from '@/shared/utils/input/masks';
import { forgotPasswordSchema } from '@/shared/validations/main/forgotPassword';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

type ForgotPasswordFormTypes = {
  email: string;
};

export const ForgotPasswordPresentation = (): JSX.Element => {
  const { isLoadingFetch, onForgotPassword } = useAuthContext();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ForgotPasswordFormTypes>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async ({ email }: ForgotPasswordFormTypes) => {
    await onForgotPassword({ email });
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
              <Input
                label="email"
                name="email"
                type="text"
                placeholder="Email"
                autoComplete="off"
                startIcon={<MdEmail size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  handleInputMask('email', event)
                }
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
