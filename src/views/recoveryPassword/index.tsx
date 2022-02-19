import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components'

import * as S from './styles'
import { handleInputMask } from 'utils/masks'
import { getAPIClient } from 'services/axios'
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { recoveryPasswordSchema } from 'schemas/recoveryPassword'

type RecoveryPasswordFormTypes = {
  password: string
  passwordConfirmation: string
}

const RecoveryPassword = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<RecoveryPasswordFormTypes>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(recoveryPasswordSchema)
  })
  const router = useRouter()
  const { token, id } = router.query

  const onSubmit = async (data: RecoveryPasswordFormTypes) => {
    const { password } = data
    const finalData = JSON.stringify({
      id: id,
      password: password,
      token: token
    })
    await getAPIClient()
      .post(`api/v1/user/recovery`, finalData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          Router.push('/')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false)

  return (
    <S.ContainerViewPort>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerInput>
            <Input<RecoveryPasswordFormTypes>
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
              onChange={(event) => handleInputMask('password', event)}
            />
          </S.ContainerInput>

          <S.ContainerInput>
            <Input<RecoveryPasswordFormTypes>
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
              onChange={(event) => handleInputMask('password', event)}
            />
          </S.ContainerInput>

          <S.Button type="submit" disabled={isSubmitting}>
            Confirmar
          </S.Button>
        </form>
      </S.Container>
    </S.ContainerViewPort>
  )
}

export default RecoveryPassword
