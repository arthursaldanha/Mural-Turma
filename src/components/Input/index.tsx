import React, { useState, SetStateAction } from 'react'
import { InputProps } from 'types'
import { Container } from '../index'
import * as S from './styles'

export const Input: React.FC<InputProps> = ({
  value,
  readOnly,
  placeholder,
  startIcon,
  endIcon,
  sucessMessage,
  errorMessage,
  alertMessage,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [valueDefault, setValueDefault] = useState('')

  return (
    <Container flexDirection="column" position="relative" {...props}>
      <S.ContainerInput>
        <S.InputField
          value={value || valueDefault}
          errorMessage={errorMessage}
          sucessMessage={sucessMessage}
          alertMessage={alertMessage}
          startIcon={startIcon}
          endIcon={endIcon}
          readOnly={readOnly}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setValueDefault(e.target.value)
          }
        />
        <S.Label startIcon={startIcon} endIcon={endIcon} isFocused={isFocused}>
          {placeholder}
        </S.Label>
      </S.ContainerInput>
    </Container>
  )
}
