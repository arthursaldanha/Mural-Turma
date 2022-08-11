import { useState } from 'react';

import { CloseCircle, TickCircle, InfoCircle } from 'iconsax-react';

import { Container } from '../Container';
import { StyledAlerts, StyledAlertsNoTitle } from './styles';

export interface IToastProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'sucess' | 'alert' | 'error';
  title?: string;
  subTitle?: string;
  size?: 'lg' | 'md' | 'sm';
}

export const Toast: React.FC<IToastProps> = ({
  type,
  title,
  subTitle,
  size,
}) => {
  const [getCloseClick, setGetCloseClick] = useState(false);

  setTimeout(() => {
    setGetCloseClick(true);
  }, 6000);

  return !title ? (
    <StyledAlertsNoTitle
      type={type}
      title={title}
      size={size}
      style={{ display: getCloseClick ? 'none' : 'flex' }}
    >
      <svg>
        {type === 'sucess' ? (
          <TickCircle />
        ) : type === 'alert' ? (
          <InfoCircle />
        ) : (
          <CloseCircle />
        )}
      </svg>

      <Container flexDirection="column">
        <p>{subTitle}</p>
      </Container>

      <span onClick={() => setGetCloseClick(true)}>
        <CloseCircle variant="Bold" size={16} />
      </span>
    </StyledAlertsNoTitle>
  ) : (
    <StyledAlerts
      type={type}
      title={title}
      size={size}
      style={{ display: getCloseClick ? 'none' : 'flex' }}
    >
      <svg>
        {type === 'sucess' ? (
          <TickCircle />
        ) : type === 'alert' ? (
          <InfoCircle />
        ) : (
          <CloseCircle />
        )}
      </svg>

      <Container flexDirection="column">
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </Container>

      <span onClick={() => setGetCloseClick(true)}>
        <CloseCircle variant="Bold" size={16} />
      </span>
    </StyledAlerts>
  );
};
