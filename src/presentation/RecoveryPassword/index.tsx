import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { IRecoveryPasswordForm } from '@/domain/Auth/models/recoveryPassword';
import { Input } from '@/shared/components/InputRHF/styles';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { handleInputMask } from '@/shared/utils/input/masks';
import { recoveryPasswordSchema } from '@/shared/validations/main/recoveryPassword';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';

export const RecoveryPasswordPresentation = (): JSX.Element => {
  const { isLoadingFetch, onRecoveryPassword } = useAuthContext();

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IRecoveryPasswordForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(recoveryPasswordSchema),
  });
  const router = useRouter();
  const { token, id } = router.query;

  const onSubmit = async ({ password }: IRecoveryPasswordForm) => {
    onRecoveryPassword({
      id: Number(id),
      password,
      token: String(token),
    });
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
              <Input
                label="password"
                name="password"
                type={isVisiblePassword ? 'text' : 'password'}
                placeholder="Digite sua nova senha"
                autoComplete="off"
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
                type={isVisibleConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                autoComplete="off"
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
              {isLoadingFetch ? 'Confirmando...' : 'Confirmar'}
            </S.Button>
          </form>
        </S.Container>
      </S.ContainerViewPort>
    </>
  );
};
