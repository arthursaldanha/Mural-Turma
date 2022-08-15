import { HomePageProps } from '@/pages/home';
import { HomePresentation } from '@/presentation/Home';

export const HomeFactory = ({ user, posts }: HomePageProps) => (
  <HomePresentation user={user} posts={posts} />
);
