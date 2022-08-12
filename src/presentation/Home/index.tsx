/* eslint-disable @typescript-eslint/no-unused-vars */
import { HomePageProps } from '@/pages/home';
import { useAuthContext } from '@/shared/contexts/AuthContext';

import * as S from './styles';

export const HomePresentation = ({ user }: HomePageProps): JSX.Element => {
  const { onSignOut } = useAuthContext();

  console.log('user :>> ', user);

  return (
    <S.ContainerDashboard>
      <button type="button" onClick={onSignOut}>
        Sair da Aplicação
      </button>
    </S.ContainerDashboard>
  );
};
