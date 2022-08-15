import styled, { css } from 'styled-components';

export const WrapperCardPost = styled.article`
  ${({ theme: { colors } }) => css`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: ${colors.main.background.overlay.xmediumdp};
    border-radius: 6px;

    > header {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 6px;

      > div {
        &:last-of-type {
          /* height: 50px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis; */

          > span {
          }
        }
      }
    }

    > footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div {
        &:first-of-type {
          display: flex;
          align-items: center;
          gap: 4px;

          > span {
            &:first-of-type {
              background-color: transparent !important;
            }
          }
        }

        &:last-of-type {
        }
      }
    }
  `}
`;
