import styled, { css } from 'styled-components';

export const WrapperHeader = styled.header`
  ${({ theme: { colors } }) => css`
    width: 100%;
    min-height: 60px;
    padding: 8px 16px;
    background: ${colors.main.background.overlay.xxsmalldp};
  `}
`;
