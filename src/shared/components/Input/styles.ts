import styled, { css } from 'styled-components';

import theme from '@/shared/styles';
import { Input as ChakraInput } from '@chakra-ui/react';

interface InputComponent {
  error?: boolean;
}

const getBorderColor = (error: boolean | undefined) => {
  if (error) {
    return css`
      border-color: ${theme.colors.others.red300} !important;
    `;
  }

  return css`
    border-color: ${theme.colors.main.background.overlay.xxlargedp} !important;
  `;
};

const getStylesOnFocus = (error: boolean | undefined) => {
  if (error) {
    return css`
      border-color: ${theme.colors.others.red300} !important;
      box-shadow: 0 0 0 0 ${theme.colors.others.red300} !important;
    `;
  }

  return css`
    border-color: ${theme.colors.main.primary} !important;
    box-shadow: 0 0 0 0 ${theme.colors.main.primary} !important;
  `;
};

export const InputComponent = styled(ChakraInput)<InputComponent>`
  ${({ theme: { colors, typography }, error }) => css`
    color: ${colors.main.text.onSurface.high} !important;
    background-color: ${colors.main.background.overlay.xxsmalldp} !important;
    border: 2px solid !important;
    font-size: ${typography.fontSizes.xxxxsmall};
    outline: ${colors.main.primary};
    box-shadow: none !important
    transition: 200ms;
    ${getBorderColor(error)};

    &:focus,
    &:active {
      ${getStylesOnFocus(error)}
      background-color: ${colors.main.background.overlay.xxmediumdp} !important;
    }

    /* Autocomplete styles in Chrome*/
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      background-color: white;
      color: ${colors.main.text.onSurface.high};
      border: 2px solid ${colors.main.background.overlay.xxlargedp};
      box-shadow: 0 0 0px 1000px ${colors.main.background.overlay.xxsmalldp}
        inset;
      -webkit-box-shadow: 0 0 0px 1000px
        ${colors.main.background.overlay.xxsmalldp} inset;
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: ${colors.main.text.onSurface.high};
    }

     /* Chrome/Opera/Safari */
    ::-webkit-input-placeholder {
      color: ${colors.main.text.onSurface.high};
      font-family: 'Inter' !important;
    }

    /* Firefox 19+ */
    ::-moz-placeholder {
      color: ${colors.main.text.onSurface.high};
      font-family: 'Inter' !important;

    }

    /* IE 10+ */
    :-ms-input-placeholder {
      color: ${colors.main.text.onSurface.high};
      font-family: 'Inter' !important;

    }

    /* Firefox 18- */
    :-moz-placeholder {
      color: ${colors.main.text.onSurface.high};
      font-family: 'Inter' !important;

    }
  `}
`;

export const ErrorMessageValidation = styled.span`
  ${({ theme: { colors, typography } }) => css`
    margin: 0.5rem 0 0 0.4rem;
    color: ${colors.others.red300};
    font-family: ${typography.fontFamily.Inter};
    font-weight: ${typography.weight.medium};
    font-size: ${typography.fontSizes.xxsmall};
    line-height: 1rem;
  `}
`;
