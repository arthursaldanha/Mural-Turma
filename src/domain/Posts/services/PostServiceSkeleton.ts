import { ICreatePostsPayload } from '../models/requests/createPost';
import { IGetPosts } from '../models/requests/getPosts';
import { IResponseGetPost } from '../models/responses/reponseGetPosts';

export interface PostServiceSkeleton {
  createPost: (
    userId: string,
    classId: string,
    payload: ICreatePostsPayload,
  ) => Promise<any>;
  getPosts: (params: IGetPosts) => Promise<IResponseGetPost>;
}
