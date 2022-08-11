import styled from 'styled-components';

import { IToastProps } from '.';
import { ColorPallete } from './CollorPallete';

export const StyledAlerts = styled.div<IToastProps>`
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;

  -webkit-animation: fadein 6s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 6s; /* Firefox < 16 */
  -ms-animation: fadein 6s; /* Internet Explorer */
  -o-animation: fadein 6s; /* Opera < 12.1 */
  animation: fadein 6s;

  padding: 10px;
  width: ${props =>
    props.size === 'md'
      ? '200px'
      : props.size === 'sm'
        ? 'fit-content'
        : '360px'};
  height: fit-content;
  background-color: ${props =>
    props.type === 'sucess'
      ? ColorPallete.successBackground
      : props.type === 'alert'
        ? ColorPallete.alertBackground
        : props.type === 'error'
          ? ColorPallete.errorBackground
          : ColorPallete.green3};
  border-radius: 8px 8px 0 0;

  border-bottom: 2px solid
    ${props =>
    props.type === 'sucess'
      ? ColorPallete.success
      : props.type === 'alert'
        ? ColorPallete.alert
        : props.type === 'error'
          ? ColorPallete.error
          : ColorPallete.green3};

  > svg {
    max-width: 30px;
    max-height: 30px;
    color: ${props =>
    props.type === 'sucess'
      ? ColorPallete.success
      : props.type === 'alert'
        ? ColorPallete.alert
        : props.type === 'error'
          ? ColorPallete.error
          : ColorPallete.green3};

    font-size: 20px;
  }

  > * {
    > h1 {
      color: ${ColorPallete.grey1};
      text-align: left;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      margin-left: 5px;
    }

    > p {
      color: ${ColorPallete.grey2};
      font-size: 12px;
      font-weight: 500;
      line-height: 14.63px;
      margin-left: 5px;
    }
  }

  > span {
    padding-left: 10px;
    color: ${ColorPallete.grey2};
    cursor: pointer;
    font-size: 18px;

    transition: 0.1s;

    :hover {
      color: ${ColorPallete.grey1};
    }
  }

  /* ANIMATIONS */
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes fadein {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fadein {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  @-ms-keyframes fadein {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes fadein {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const StyledAlertsNoTitle = styled(StyledAlerts)`
  flex-direction: row;
  align-items: center;
`;
