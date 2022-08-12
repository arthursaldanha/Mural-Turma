import { ElementType, useState } from 'react';

import { Header } from '@/shared/components/Header';
import { Sidebar } from '@/shared/components/Sidebar';

import { Container, GeneralWrapper } from './styles';

interface Options {
  hasSidebar?: boolean;
  hasHeader?: boolean;
}

export const withMenu = (WrappedComponent: ElementType, options?: Options) => {
  const Wrapper = (props: unknown) => {
    const [hasSidebar] = useState(options?.hasSidebar ?? true);
    const [hasHeader] = useState(options?.hasHeader ?? true);

    return (
      <GeneralWrapper>
        {hasSidebar && <Sidebar />}
        <Container>
          {hasHeader && <Header />}
          <WrappedComponent {...props} />
        </Container>
      </GeneralWrapper>
    );
  };

  return Wrapper;
};
