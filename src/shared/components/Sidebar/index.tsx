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
import { LogoutUser, WrapperLogoutIcon, WrapperSidebar } from './styles';

const itemsSidebar = [
  { title: 'Página Inicial', Icon: Home2, path: '/home' },
  { title: 'Favoritos', Icon: Star1, path: '/favorites' },
  { title: 'Notificações', Icon: Notification, path: '/notifications' },
  { title: 'Suas atividades', Icon: Clock, path: '/your-activity' },
];

export const Sidebar = () => {
  const { onSignOut } = useAuthContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <WrapperSidebar
      isOpen={isSidebarOpen}
      initial="hidden"
      animate="visible"
      variants={wrapperSidebarAnimation}
    >
      <nav>
        <header>
          <motion.div variants={logoSidebarAnimation}>
            <span>
              <img src="/images/logo.svg" alt="Logo" />
            </span>
          </motion.div>

          <div onClick={toggleSidebar}>
            <BsArrowRightShort size="32" />
          </div>
        </header>

        <div>
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

            <LogoutUser
              isOpen={isSidebarOpen}
              onClick={onSignOut}
              variants={sidebarItemAnimation}
            >
              <nav>
                <WrapperLogoutIcon>
                  <Logout size="24" />
                </WrapperLogoutIcon>
                <span>Sair</span>
              </nav>
            </LogoutUser>
          </ul>
        </div>
      </nav>
    </WrapperSidebar>
  );
};
