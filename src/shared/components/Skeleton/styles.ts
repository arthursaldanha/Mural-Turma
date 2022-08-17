import styled, { css, keyframes } from 'styled-components';

import { SkeletonProps } from '.';

const loading = css`
  ${({ theme: { colors } }) => keyframes`
    0%  {
      background-color: ${colors.others.gray400};
    }

    100% {
      background-color: ${colors.others.gray500};
    }
  `}
`;

export const Wrapper = styled.div<SkeletonProps>`
  ${({ theme: { colors }, type, width, height, margin, borderRadius }) => css`
    width: ${width};
    max-width: 100%;
    height: ${height};
    margin: ${margin};
    background: ${colors.others.gray500};
    border-radius: ${borderRadius || (type === 'rectangle' ? '6px' : '50%')};
    animation: ${loading} 1s linear infinite alternate;
  `}
`;
