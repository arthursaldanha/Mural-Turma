import Text from '@/shared/components/Text';

import { IPost } from '../../models/responses/reponseGetPosts';
import { WrapperCardPost } from './styles';

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
    <WrapperCardPost>
      <header>
        <div>
          <Text variant="xxmedium" weight="semibold">
            {title}
          </Text>
        </div>
        <div>
          <Text weight="regular" textAlign="justify">
            {content}
          </Text>
        </div>
      </header>
      <footer>
        <div>
          {/* <Avatar
            size="sm"
            name={`${firstName} ${lastName}`}
            src={avatar ?? ''}
          /> */}
          <Text>{`${firstName} ${lastName}`}</Text>
        </div>
        <div>Tags</div>
      </footer>
    </WrapperCardPost>
  );
};
