import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export interface ISidebarComponentProps {
  isOpen: boolean;
}

export const WrapperSidebar = styled(motion.aside)<ISidebarComponentProps>`
  ${({ theme: { colors }, isOpen }) => css`
    width: ${isOpen ? '250px' : '88px'};
    height: 100%;
    padding: 16px 14px 10px;
    background: ${colors.main.background.overlay.xxsmalldp};
    transition: all 0.3s ease;
    z-index: 10;

    > nav {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > header {
        position: relative;

        > div {
          &:first-of-type {
            align-items: center;
            display: flex;
            justify-content: center;

            > span {
              align-items: center;
              border-radius: 6px;
              display: flex;
              justify-content: center;
              min-width: 60px;

              > img {
                width: 45px;
              }
            }
          }

          &:last-of-type {
            align-items: center;
            background-color: ${colors.main.primary};
            border-radius: 50%;
            color: ${colors.main.background.overlay.xxsmalldp};
            cursor: pointer;
            display: flex;
            font-size: 22px;
            height: 25px;
            justify-content: center;
            position: absolute;
            right: -25px;
            top: 50%;
            transform: ${isOpen
              ? 'translateY(-50%) rotate(180deg)'
              : 'translateY(-50%) rotate(0deg)'};
            transition: all 0.3s ease;
            width: 25px;
          }
        }
      }

      > div {
        margin-top: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  `}
`;

export const UnorderedList = styled(motion.li)`
  height: 50px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const WrapperIcon = styled.div`
  min-width: 60px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const LogoutUser = styled(UnorderedList)<ISidebarComponentProps>`
  ${({ theme: { colors }, isOpen }) => css`
    > nav {
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
        background-color: ${colors.others.red300};

        span,
        > div > svg {
          color: ${colors.main.text.onSurface.high};
        }
      }

      > span {
        color: ${colors.main.text.onSurface.high};
        font-family: 'Inter';
        font-size: 17px;
        font-weight: 500;
        opacity: ${isOpen ? '1' : '0'};
        transition: all 0.3s ease;
        white-space: nowrap;
      }
    }
  `}
`;

export const WrapperLogoutIcon = styled(WrapperIcon)`
  ${({ theme: { colors } }) => css`
    > svg {
      width: 40px;
      color: ${colors.others.red300};
    }
  `}
`;
