import { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

import {
  Home2,
  Notification,
  Star1,
  Clock,
  Setting2,
  Logout,
} from 'iconsax-react';
import Link from 'next/link';

import { useAuthContext } from '@/shared/contexts/AuthContext';

import { LogoutUser, SidebarItem, WrapperSidebar } from './styles';

export const Sidebar = () => {
  const { onSignOut } = useAuthContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <WrapperSidebar isOpen={isSidebarOpen}>
      <nav className="sidebar close">
        <header>
          <div className="image-text">
            <span className="image">
              <img src="/images/logo.svg" alt="Logo" />
            </span>
          </div>

          <div onClick={toggleSidebar}>
            <BsArrowRightShort size="32" />
          </div>
        </header>

        <div>
          <div>
            <ul>
              <SidebarItem isOpen={isSidebarOpen}>
                <Link href="/home" passHref>
                  <a>
                    <div>
                      <Home2 size="24" />
                    </div>
                    <span className="text nav-text">Página Inicial</span>
                  </a>
                </Link>
              </SidebarItem>

              <SidebarItem isOpen={isSidebarOpen}>
                <Link href="/favorites" passHref>
                  <a>
                    <div>
                      <Star1 size="24" />
                    </div>
                    <span>Favoritos</span>
                  </a>
                </Link>
              </SidebarItem>

              <SidebarItem isOpen={isSidebarOpen} className="">
                <Link href="/notifications" passHref>
                  <a>
                    <div>
                      <Notification size="24" />
                    </div>
                    <span>Notificações</span>
                  </a>
                </Link>
              </SidebarItem>

              <SidebarItem isOpen={isSidebarOpen}>
                <Link href="/your-activity" passHref>
                  <a>
                    <div>
                      <Clock size="24" />
                    </div>
                    <span>Suas atividades</span>
                  </a>
                </Link>
              </SidebarItem>
            </ul>
          </div>

          <ul>
            <SidebarItem isOpen={isSidebarOpen}>
              <Link href="/your-activity" passHref>
                <a>
                  <div>
                    <Setting2 size="24" />
                  </div>
                  <span>Suas atividades</span>
                </a>
              </Link>
            </SidebarItem>

            <LogoutUser isOpen={isSidebarOpen} onClick={onSignOut}>
              <nav>
                <div>
                  <Logout size="24" />
                </div>
                <span>Sair</span>
              </nav>
            </LogoutUser>
          </ul>
        </div>
      </nav>
    </WrapperSidebar>
  );
};
