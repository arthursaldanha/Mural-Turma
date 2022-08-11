import styled, { css } from 'styled-components';

import { ContainerProps } from '@/shared/types';

export const ContainerComponent = styled.div<ContainerProps>`
  ${({
  justifyContent,
  alignItems,
  alignContent,
  alignSelf,
  flexDirection,
  flexWrap,
  backgroundColor,
  borderRadius,
  padding,
  margin,
  position,
  columnGap,
  rowGap,
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

    border-radius: ${borderRadius};
    padding: ${padding};
    margin: ${margin}

    background-color: ${backgroundColor || 'transparent'};
  `}
`;
