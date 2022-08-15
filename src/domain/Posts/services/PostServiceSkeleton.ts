import { IPostsRequest } from '../models/requests/getPosts';
import { IResponseGetPost } from '../models/responses/reponseGetPosts';

export interface PostServiceSkeleton {
  getPosts: (postParams: IPostsRequest) => Promise<IResponseGetPost>;
}
