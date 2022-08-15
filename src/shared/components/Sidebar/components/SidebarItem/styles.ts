import styled, { css } from 'styled-components';

import {
  ISidebarComponentProps,
  UnorderedList,
  WrapperIcon,
} from '../../styles';

export const WrapperSidebarIcon = styled(WrapperIcon)`
  ${({ theme: { colors } }) => css`
    > svg {
      width: 40px;
      color: ${colors.main.primary};
    }
  `}
`;

export const WrapperSidebarItem = styled(UnorderedList)<ISidebarComponentProps>`
  ${({ theme: { colors }, isOpen }) => css`
    > a {
      align-items: center;
      background-color: transparent;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      height: 100%;
      list-style: none;
      text-decoration: none;
      transition: all 0.3s ease;
      width: 100%;

      &:hover {
        background-color: ${colors.main.primary};

        span,
        > div > svg {
          color: ${colors.main.background.overlay.xxsmalldp};
        }
      }

      span {
        opacity: ${isOpen ? '1' : '0'};
        transition: all 0.3s ease;
        white-space: nowrap;
      }
    }
  `}
`;
