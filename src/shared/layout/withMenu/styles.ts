import Div100vh from 'react-div-100vh';

import styled from 'styled-components';

export const GeneralWrapper = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding-bottom: 60px;
  }
`;
