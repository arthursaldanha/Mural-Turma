import styled, { css } from 'styled-components';

import { TextProps } from '@/shared/types';

export const TextComponent = styled.span<TextProps>`
  ${({ theme, variant, fontFamily, weight, color, textAlign }) => css`
    font-size: ${variant
      ? theme.typography.fontSizes[variant]
      : theme.typography.fontSizes.xxxsmall};

    font-weight: ${weight
      ? theme.typography.weight[weight]
      : theme.typography.weight.regular};

    font-family: ${fontFamily
      ? theme.typography.fontFamily[fontFamily]
      : theme.typography.fontFamily.Inter};

    color: ${color || theme.colors.main.text.onSurface.high};

    text-align: ${textAlign || 'start'};
  `}
`;
