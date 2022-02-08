import styled, { css } from 'styled-components'
import { InputProps } from 'types'

interface IconProp extends InputProps {
  isFocused: boolean
}

interface LabelProps extends InputProps {
  isFocused: boolean
}

export const ContainerInput = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  /* height: 3.125rem; */
`

export const InputField = styled.input<InputProps>`
  outline: none;
  /* padding: 16px 10px; */
  height: 40px;
  padding-left: ${(props) => props.startIcon && '44px'};
  padding-right: ${(props) => props.endIcon && '44px'};
  width: 100%;

  border-radius: 8px;

  &:focus {
  }
`

export const Label = styled.label<LabelProps>`
  ${({ startIcon, isFocused, readOnly }) => css`
    position: absolute;
    pointer-events: none;
    left: ${!startIcon || (isFocused && !readOnly) ? '12px' : '44px'};
    top: ${isFocused && !readOnly ? '0%' : '50%'};
    transform: translateY(-50%);
    transition: 300ms;

    /* color: #fff; */
  `}
`

export const SvgStart = styled.div<IconProp>`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  /* color: #fff; */
`

export const SvgEnd = styled.div<IconProp>`
  position: absolute;
  left: calc(100% - 37px);
  top: 50%;
  transform: translateY(-50%);
  /* color: #fff; */
`
