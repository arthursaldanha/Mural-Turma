import styled, { css } from 'styled-components';

export const WrapperDashboard = styled.main`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    padding: 24px;
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      'main firstAside'
      'main secondAside';
    gap: 24px;
    background: ${colors.main.background.primary};
    overflow: hidden;

    .box {
      background: ${colors.main.background.overlay.xsmalldp};
      border-radius: 8px;
    }

    .box1 {
      height: 100%;
      grid-area: main;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #b6b6b6;
        border-radius: 20px;
        border: 3px solid ${colors.main.background.overlay.xxlargedp};
      }
    }

    .box2 {
      grid-area: firstAside;
    }

    .box3 {
      grid-area: secondAside;
    }
  `}
`;
