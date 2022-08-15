import { AxiosInstance } from 'axios';

import { IPostsRequest } from '../../models/requests/getPosts';
import { IResponseGetPost } from '../../models/responses/reponseGetPosts';
import { PostServiceSkeleton } from '../PostServiceSkeleton';

export default class PostService implements PostServiceSkeleton {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async getPosts(postParams: IPostsRequest) {
    const { data } = await this.httpClient.get<IResponseGetPost>('/post', {
      params: { ...postParams },
    });

    return data;
  }
}
