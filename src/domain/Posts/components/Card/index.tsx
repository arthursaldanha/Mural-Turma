import { Avatar } from '@/shared/components/Avatar';
import Text from '@/shared/components/Text';

import { IPost } from '../../models/responses/reponseGetPosts';

interface ICardPostProps {
  post: IPost;
}

export const CardPosts: React.FC<ICardPostProps> = ({
  post: {
    title,
    content,
    user: { firstName, lastName, avatar },
  },
}) => {
  return (
    <article className="w-full h-auto p-4 rounded-lg flex flex-col justify-start gap-2 bg-zinc-800 ">
      <header className="w-full flex flex-col">
        <Text variant="xxmedium" weight="semibold">
          {title}
        </Text>
        <Text weight="regular" textAlign="justify">
          {content}
        </Text>
      </header>
      <footer className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar image={avatar ?? ''} />
          <Text className="!bg-transparent">{`${firstName} ${lastName}`}</Text>
        </div>
        <div>Tags</div>
      </footer>
    </article>
  );
};
