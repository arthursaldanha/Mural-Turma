import styled, { css } from 'styled-components';

interface ISidebar {
  isOpen: boolean;
}

export const WrapperSidebar = styled.aside<ISidebar>`
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
        overflow: hidden;
      }
    }
  `}
`;

export const UnorderedList = styled.li`
  height: 50px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const SidebarItem = styled(UnorderedList)<ISidebar>`
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

      > div {
        align-items: center;
        border-radius: 6px;
        display: flex;
        font-size: 20px;
        height: 100%;
        justify-content: center;
        min-width: 60px;

        > svg {
          width: 40px;
          color: ${colors.main.primary};
        }
      }

      span {
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

export const LogoutUser = styled(UnorderedList)<ISidebar>`
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

      > div {
        min-width: 60px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;

        > svg {
          width: 40px;
          color: ${colors.others.red300};
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
