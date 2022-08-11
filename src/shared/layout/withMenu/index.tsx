import { ElementType, useEffect, useRef, useState } from 'react';

import { MenuDrawer } from '@/presentation/Menu/components/MenuDrawer';
import { Header } from '@/shared/components/Header';
import { Navtab } from '@/shared/components/Navtab';
import { MenuProvider } from '@/shared/contexts/MenuContext';
import { useBreakpoint } from '@/shared/hooks/useBreakpoint';
import { useDisclosure } from '@/shared/hooks/useDisclosure';

import { Container, GeneralWrapper } from './styles';

interface Options {
  hasHeaderMobile?: boolean;
  hasHeaderDesktop?: boolean;
}

export const withMenu = (WrappedComponent: ElementType, options?: Options) => {
  const Wrapper = (props: unknown) => {
    const [hasHeaderMobile] = useState(options?.hasHeaderMobile ?? true);
    const [hasHeaderDesktop] = useState(options?.hasHeaderDesktop ?? true);

    const { isDesktop, isFetching } = useBreakpoint({});

    const drawerMenuDisclosure = useDisclosure();

    const ref = useRef<HTMLDivElement>(null);

    const hasHeader =
      (hasHeaderMobile && !isDesktop) || (hasHeaderDesktop && isDesktop);

    useEffect(() => {
      const handleOnClickOutside = (event: MouseEvent) => {
        const toggleMenuButton = document.getElementById('menu-drawer');

        if (
          ref.current?.contains(event.target as Node) &&
          toggleMenuButton !== event.target
        ) {
          drawerMenuDisclosure.onClose();
        }
      };

      document.addEventListener('mousedown', handleOnClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleOnClickOutside);
      };
    });

    if (isFetching) {
      return null;
    }

    return (
      <MenuProvider>
        <GeneralWrapper>
          <Container ref={ref}>
            {hasHeader && (
              <Header onDisclosureMenu={drawerMenuDisclosure.onToggle} />
            )}
            <WrappedComponent {...props} />
            {!isDesktop && <Navtab />}
          </Container>
          {isDesktop && (
            <MenuDrawer
              isVisible={drawerMenuDisclosure.isOpen}
              onDrawerMenuClose={drawerMenuDisclosure.onClose}
            />
          )}
        </GeneralWrapper>
      </MenuProvider>
    );
  };

  return Wrapper;
};
