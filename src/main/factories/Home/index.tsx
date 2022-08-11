import { HomePageProps } from '@/pages/home';
import { HomePresentation } from '@/presentation/Home';

export const HomeFactory = ({ user }: HomePageProps) => (
  <HomePresentation user={user} />
);
