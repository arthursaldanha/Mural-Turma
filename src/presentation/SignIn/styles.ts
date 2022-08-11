import { ButtonHTMLAttributes } from 'react';

import styled, { css } from 'styled-components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const ContainerViewPort = styled.div`
  ${({ theme }) => css`
    min-height: 100vh;
    min-width: 100vw;
    padding: 20px 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${theme.colors.main.background.primary};
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    max-width: 400px;
    width: 100%;

    background-color: ${theme.colors.main.background.overlay.xxsmalldp};
    border-radius: 10px;
    padding: ${theme.sizes.xlarge};
  `}
`;

export const ContainerInput = styled.div`
  margin-bottom: 15px;
`;

export const ContainerForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  font-size: 16px;
  font-family: 'Inter';

  .title-recoverypassword a {
    text-decoration: none;
    color: #4acfac;
  }
`;

export const Button = styled.button<ButtonProps>`
  ${({ theme, disabled }) => css`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.main.primary};
    font-family: ${theme.typography.fontFamily.Inter};
    font-size: ${theme.typography.fontSizes.xxxsmall};
    font-weight: ${theme.typography.weight.medium};
    border-radius: 10px;
    padding: 1rem;
    transition: 300ms;
    cursor: pointer;

    ${() =>
      disabled &&
      css`
        color: #000;
        animation: loading 1.5s ease infinite;
        cursor: not-allowed;
      `}

    @keyframes loading {
      0% {
        background-color: ${theme.colors.main.primary};
      }
      50% {
        background-color: #2ba182;
      }
      100% {
        background-color: ${theme.colors.main.primary};
      }
    }
  `}
`;

export const ContainerSignUp = styled.div`
  margin-top: 20px;

  .title-signup {
    font-size: 16px;
    font-family: 'Inter';
  }

  .title-signup a {
    text-decoration: none;
    color: #4acfac;
  }
`;
