import styled, { css } from 'styled-components';

import { ContainerProps, InputProps } from '@/shared/types';

type StartIconProps = {
  isFocused: boolean;
};

type EndIconProps = {
  isFocused: boolean;
};

export const ContainerGeneral = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerInput = styled.div<ContainerProps>`
  ${(/* { theme } */) => css`
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: 50px;
    `
  }
`;

export const Input = styled.input<InputProps>`
  ${({ theme, startIcon, endIcon }) => css`
    height: 50px;
    color: ${theme.colors.main.text.onSurface.high};
    background-color: ${theme.colors.main.background.overlay.xxsmalldp};
    border: 2px solid ${theme.colors.main.background.overlay.xxlargedp};
    border-radius: 4px;
    font-size: 1.1rem;
    line-height: 1.5rem;
    font-style: normal;
    font-weight: 400;
    width: 100%;
    padding: ${startIcon && endIcon
      ? '0.5rem 2.7rem'
      : startIcon
        ? '0.5rem 0.5rem 0.5rem 2.7rem'
        : endIcon
          ? '0.5rem 2.7rem 0.5rem 0.7rem'
          : '0.5rem'};
    outline: ${theme.colors.main.primary};
    transition: 200ms;

    &:focus,
    &:active {
      border-color: ${theme.colors.main.primary};
      background-color: ${theme.colors.main.background.overlay.xxmediumdp};
    }

    /* Autocomplete styles in Chrome*/
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      background-color: white;
      color: ${theme.colors.main.text.onSurface.high};
      border: 2px solid ${theme.colors.main.background.overlay.xxlargedp};
      box-shadow: 0 0 0px 1000px
        ${theme.colors.main.background.overlay.xxsmalldp} inset;
      -webkit-box-shadow: 0 0 0px 1000px
        ${theme.colors.main.background.overlay.xxsmalldp} inset;
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: ${theme.colors.main.text.onSurface.high};
    }
  `}
`;

export const StartIcon = styled.div<StartIconProps>`
  ${({ theme, isFocused }) => css`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${!isFocused ? theme.colors.others.gray400 : '#fff'};
    transition: 300ms;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 14px;
  `}
`;

export const EndIcon = styled.div<EndIconProps>`
  ${({ theme, isFocused }) => css`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${!isFocused ? theme.colors.others.gray400 : '#fff'};
    transition: 300ms;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    cursor: pointer;
  `}
`;

export const MessageError = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.main.secundary.salmon};
    font-family: ${theme.typography.fontFamily.Inter};
    font-weight: ${theme.typography.weight.semibold};
    font-size: ${theme.typography.fontSizes.xxsmall};
    margin: 5px 0 0 5px;
  `}
`;

export const ErrorMessageValidation = styled.span`
  ${({ theme }) => css`
    margin: 0.4rem 0 0 0.4rem;
    color: ${theme.colors.main.secundary.salmon};
    font-family: ${theme.typography.fontFamily.Inter};
    font-weight: ${theme.typography.weight.medium};
    font-size: ${theme.typography.fontSizes.xxsmall};
    line-height: 1rem;
  `}
`;
