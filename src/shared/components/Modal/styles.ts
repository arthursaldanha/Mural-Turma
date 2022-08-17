import styled, { css } from 'styled-components';

interface WrapperProps {
  backgroundColor?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme: { colors }, backgroundColor }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    flex: 1;
    background-color: ${backgroundColor || ''};

    > header {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      svg {
        color: ${colors.others.gray800};
        margin: 16px 16px 0 0;

        cursor: pointer;
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

        svg {
          margin: 8px 16px;
        }
      }
    }
  `}
`;
