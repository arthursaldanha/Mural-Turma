import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';

import Head from 'next/head';
import Link from 'next/link';

import { ISignIn, ISignInForm } from '@/domain/Auth/models/signIn';
import { Input } from '@/shared/components/InputRHF/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { handleInputMask } from '@/shared/utils/input/masks';
import { signInSchema } from '@/shared/validations/main/signIn';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

export const SignInPresentation = (): JSX.Element => {
  const [isVisible, setIsVisibility] = useState(false);
  const { isLoadingFetch, onSignIn } = useAuthContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<ISignInForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: ISignIn) => {
    console.log('data :>> ', data);
    await onSignIn(data);
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
              <Input
                label="username"
                name="username"
                type="text"
                placeholder="Nome de usuário"
                autoComplete="off"
                startIcon={<HiUserCircle size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event: FormEvent<HTMLInputElement>) =>
                  handleInputMask('username', event)
                }
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input
                label="password"
                name="password"
                placeholder="Senha"
                autoComplete="off"
                type={isVisible ? 'text' : 'password'}
                startIcon={<FaKey size="1.4rem" />}
                endIcon={
                  isVisible ? (
                    <FaRegEye
                      size="1.5rem"
                      onClick={() => setIsVisibility(!isVisible)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size="1.5rem"
                      onClick={() => setIsVisibility(!isVisible)}
                    />
                  )
                }
                register={register}
                errors={errors}
                onInput={(event: FormEvent<HTMLInputElement>) =>
                  handleInputMask('password', event)
                }
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
