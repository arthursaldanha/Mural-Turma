import { Icon as Iconsax } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Text from '@/shared/components/Text';

import { sidebarItemAnimation } from '../../animations';
import { WrapperSidebarIcon, WrapperSidebarItem } from './styles';

interface ISidebarItem {
  isOpen: boolean;
  title: string;
  Icon: Iconsax;
  path: string;
}

export const SidebarItem: React.FC<ISidebarItem> = ({
  isOpen,
  title,
  Icon,
  path,
}) => {
  const { pathname } = useRouter();

  const isActiveRouter = (route: string) => {
    return pathname.includes(route);
  };

  return (
    <WrapperSidebarItem isOpen={isOpen} variants={sidebarItemAnimation}>
      <Link href={path} passHref>
        <a>
          <WrapperSidebarIcon>
            <Icon
              size="24"
              variant={isActiveRouter(path) ? 'Bold' : 'Outline'}
            />
          </WrapperSidebarIcon>
          <Text variant="xxxxsmall" fontFamily="Inter" weight="medium">
            {title}
          </Text>
        </a>
      </Link>
    </WrapperSidebarItem>
  );
};
