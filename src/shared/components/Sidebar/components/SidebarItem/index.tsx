import { motion } from 'framer-motion';
import { Icon as Iconsax } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { sidebarItemAnimation } from '../../animations';

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
    <motion.li
      className="group flex items-center list-none h-[50px] mt-2.5"
      variants={sidebarItemAnimation}
    >
      <Link href={path} passHref>
        <a className="h-full w-full flex justify-start items-center bg-transparent hover:bg-green-500 rounded-md cursor-pointer list-none decoration-none transition-all duration-300 ease">
          <div className="flex justify-center items-center rounded-md min-w-[60px] text-xl">
            <Icon
              size="24"
              variant={isActiveRouter(path) ? 'Bold' : 'Outline'}
              className="w-6 h-6 text-green-500 group-hover:text-zinc-900 transition-all duration-300 ease"
            />
          </div>
          <span
            className={`text-zinc-100 group-hover:text-zinc-900 text-lg font-inter font-medium ${
              isOpen ? 'opacity-100' : 'opacity-0'
            } transition-all duration-300 ease whitespace-nowrap`}
          >
            {title}
          </span>
        </a>
      </Link>
    </motion.li>
  );
};
