import { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

import { motion } from 'framer-motion';
import {
  Home2,
  Notification,
  Star1,
  Clock,
  Setting2,
  Logout,
} from 'iconsax-react';

import { useAuthContext } from '@/shared/contexts/AuthContext';

import {
  logoSidebarAnimation,
  sidebarItemAnimation,
  wrapperSidebarAnimation,
} from './animations';
import { SidebarItem } from './components/SidebarItem';

const itemsSidebar = [
  { title: 'Página Inicial', Icon: Home2, path: '/home' },
  { title: 'Favoritos', Icon: Star1, path: '/favorites' },
  { title: 'Notificações', Icon: Notification, path: '/notifications' },
  { title: 'Suas atividades', Icon: Clock, path: '/your-activity' },
];

export const Sidebar = () => {
  const { onSignOut } = useAuthContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev);
  }

  return (
    <motion.aside
      className={`${
        isSidebarOpen ? 'w-[250px]' : 'w-[88px]'
      } h-screen pt-4 pb-2.5 px-[14px] bg-zinc-900 transition-all duration-300 ease z-10`}
      initial="hidden"
      animate="visible"
      variants={wrapperSidebarAnimation}
    >
      <nav className="h-full flex flex-col justify-between">
        <header className="relative">
          <motion.div
            className="flex justify-center items-center"
            variants={logoSidebarAnimation}
          >
            <span className="flex justify-center items-center rounded-md min-w-[60px]">
              <img className="w-[45px]" src="/images/logo.svg" alt="Logo" />
            </span>
          </motion.div>

          <div
            className={`w-6 h-6 absolute top-2/4 right-[-25px] flex justify-center items-center bg-green-500 rounded-full cursor-pointer text-2xl ${
              isSidebarOpen
                ? 'translate-y-[-50%] rotate-180'
                : 'translate-y-[-50%] rotate-0'
            } transition-all duration-300 ease`}
            onClick={toggleSidebar}
          >
            <BsArrowRightShort className="text-zinc-800" size="32" />
          </div>
        </header>

        <div className="flex flex-col justify-between flex-1 mt-5 overflow-y-scroll scrollbar-none">
          <div>
            <ul>
              {itemsSidebar.map(({ title, Icon, path }) => (
                <SidebarItem
                  key={title}
                  isOpen={isSidebarOpen}
                  title={title}
                  Icon={Icon}
                  path={path}
                />
              ))}
            </ul>
          </div>

          <ul>
            <SidebarItem
              isOpen={isSidebarOpen}
              title="Configurações"
              Icon={Setting2}
              path="/settings"
            />

            <motion.li
              className="group flex items-center list-none h-[50px] mt-2.5"
              onClick={onSignOut}
              variants={sidebarItemAnimation}
            >
              <nav className="flex items-center bg-transparent rounded-lg cursor-pointer h-full w-full list-none transition-all duration-300 ease hover:bg-red-400">
                <div className="flex justify-center items-center rounded-md min-w-[60px] text-xl">
                  <Logout
                    className="w-6 h-6 text-red-400 group-hover:text-zinc-900 transition-all duration-300 ease"
                    size="24"
                  />
                </div>
                <span
                  className={`text-zinc-100 group-hover:text-zinc-900 text-lg font-inter font-medium ${
                    isSidebarOpen ? 'opacity-100' : 'opacity-0'
                  } transition-all duration-300 ease whitespace-nowrap`}
                >
                  Sair
                </span>
              </nav>
            </motion.li>
          </ul>
        </div>
      </nav>
    </motion.aside>
  );
};
