import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CreatePost } from '@/domain/Posts/components/Modal/CreatePost';
import { ICreatePostsPayload } from '@/domain/Posts/models/requests/createPost';
import { PostServiceSkeleton } from '@/domain/Posts/services/PostServiceSkeleton';

import { DisclosureData, useDisclosure } from '../hooks/useDisclosure';
import { useToast } from '../hooks/useToast';

type postFactory = {
  postService: PostServiceSkeleton;
};

interface postProviderProps {
  factory: postFactory;
  children: ReactNode;
}

interface PostContextData {
  postDisclosure: DisclosureData;
  onCreatePost: (
    userId: string,
    classId: string,
    payload: ICreatePostsPayload,
  ) => void;
}

const PostContext = createContext({} as PostContextData);

export const usePostContext = () => useContext(PostContext);

export const PostProvider: React.FC<postProviderProps> = ({
  factory,
  children,
}) => {
  const postDisclosure = useDisclosure();

  const [postService] = useState<PostServiceSkeleton>(factory.postService);

  const [isLoadingFetch, setIsLoadingFetch] = useState(false);

  const { toast } = useToast();

  const onCreatePost = useCallback(
    async (userId: string, classId: string, payload: ICreatePostsPayload) => {
      try {
        setIsLoadingFetch(true);
        const data = await postService.createPost(userId, classId, payload);
        console.log('data :>> ', data);
      } catch (error) {
        toast({
          type: 'error',
          title: 'Houve algum problema ao criar uma publicação!',
          subTitle: 'Verifique os dados inseridos ou aguarde um momentinho!',
        });
      } finally {
        setIsLoadingFetch(false);
      }
    },
    [postService, toast],
  );

  const value = useMemo(() => {
    return { postDisclosure, onCreatePost };
  }, [postDisclosure, onCreatePost]);

  return (
    <PostContext.Provider value={value}>
      {children}
      <CreatePost
        isOpen={postDisclosure.isOpen}
        onClose={postDisclosure.onClose}
      />
    </PostContext.Provider>
  );
};
