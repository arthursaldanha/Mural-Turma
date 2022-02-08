import styled, { css } from 'styled-components'
import { TextProps } from 'types'

export const TextComponent = styled.label<TextProps>`
  ${({ theme, variant, fontFamily, weight, color }) => css`
    font-size: ${variant
      ? theme.typography.fontSizes[variant]
      : theme.typography.fontSizes.xxxsmall};

    font-weight: ${weight
      ? theme.typography.weight[weight]
      : theme.typography.weight.regular};

    font-family: ${fontFamily
      ? theme.typography.fontFamily[fontFamily]
      : theme.typography.fontFamily.Inter};

    color: ${color === 'black'
      ? theme.colors.main.text.onPrimary.high
      : color === 'whiteDisabled'
      ? theme.colors.main.text.onSurface.disabled
      : color === 'whiteMedium'
      ? theme.colors.main.text.onSurface.medium
      : theme.colors.main.text.onSurface.high};
  `}
`
