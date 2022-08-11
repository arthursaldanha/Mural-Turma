import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';
import { MdAlternateEmail, MdEmail } from 'react-icons/md';

import Head from 'next/head';
import Link from 'next/link';

import { ISignUpForm } from '@/domain/Auth/models/signUp';
import { Input } from '@/shared/components/InputRHF/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { handleInputMask } from '@/shared/utils/input/masks';
import { signUpSchema } from '@/shared/validations/main/signUp';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

export const SignUpPresentation = (): JSX.Element => {
  const { isLoadingFetch, onSignUp } = useAuthContext();

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const {
    register,
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
    await onSignUp({ username, firstName, lastName, email, password });
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
              <Input
                label="username"
                name="username"
                type="text"
                placeholder="Nome de usuário"
                autoComplete="off"
                startIcon={<MdAlternateEmail size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  handleInputMask('username', event)
                }
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input
                label="firstName"
                name="firstName"
                type="text"
                placeholder="Nome"
                autoComplete="off"
                startIcon={<HiUserCircle size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  handleInputMask('firstName', event)
                }
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input
                label="lastName"
                name="lastName"
                type="text"
                placeholder="Sobrenome"
                autoComplete="off"
                startIcon={<HiUserCircle size="1.5rem" />}
                register={register}
                errors={errors}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  handleInputMask('lastName', event)
                }
              />
            </S.ContainerInput>

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

            <S.ContainerInput>
              <Input
                label="password"
                name="password"
                placeholder="Digite uma senha"
                autoComplete="off"
                type={isVisiblePassword ? 'text' : 'password'}
                startIcon={<FaKey size="1.3rem" />}
                endIcon={
                  isVisiblePassword ? (
                    <FaRegEye
                      size="1.5rem"
                      onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size="1.5rem"
                      onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                    />
                  )
                }
                register={register}
                errors={errors}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  handleInputMask('password', event)
                }
              />
            </S.ContainerInput>

            <S.ContainerInput>
              <Input
                label="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Confirme sua senha"
                autoComplete="off"
                type={isVisibleConfirmPassword ? 'text' : 'password'}
                startIcon={<FaKey size="1.3rem" />}
                endIcon={
                  isVisibleConfirmPassword ? (
                    <FaRegEye
                      size="1.5rem"
                      onClick={() =>
                        setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                      }
                    />
                  ) : (
                    <FaRegEyeSlash
                      size="1.5rem"
                      onClick={() =>
                        setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                      }
                    />
                  )
                }
                register={register}
                errors={errors}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  handleInputMask('password', event)
                }
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
