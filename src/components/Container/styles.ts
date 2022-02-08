import styled, { css } from 'styled-components'
import { ContainerProps } from 'types'

export const ContainerComponent = styled.div<ContainerProps>`
  ${({
    justifyContent,
    alignItems,
    alignContent,
    alignSelf,
    flexDirection,
    flexWrap,
    backgroundColor,
    padding,
    borderRadius,
    position,
    columnGap,
    rowGap
  }) => css`
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    align-content: ${alignContent};
    align-self: ${alignSelf};
    flex-direction: ${flexDirection};
    flex-wrap: ${flexWrap};
    column-gap: ${columnGap}
    row-gap: ${rowGap}

    width: 100%;

    position: ${position};

    padding: ${padding};
    border-radius: ${borderRadius};

    background-color: ${backgroundColor ? backgroundColor : 'transparent'};
  `}
`
