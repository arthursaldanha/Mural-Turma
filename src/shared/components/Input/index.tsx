/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

import { useTheme } from 'styled-components';

import {
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

import { InputComponent } from './styles';

interface IInput extends InputProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: boolean;
}

export const Input: React.FC<IInput> = ({
  startIcon,
  endIcon,
  error,
  ...restProps
}) => {
  const { colors } = useTheme();

  return (
    <InputGroup>
      {startIcon && (
        <InputLeftElement pointerEvents="none">{startIcon}</InputLeftElement>
      )}
      <InputComponent
        focusBorderColor={colors.main.primary}
        errorBorderColor={colors.others.red300}
        error={error}
        {...restProps}
      />
      {endIcon && <InputRightElement>{endIcon}</InputRightElement>}
    </InputGroup>
  );
};
