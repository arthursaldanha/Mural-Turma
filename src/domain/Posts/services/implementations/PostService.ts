import { AxiosInstance } from 'axios';

import { ICreatePostsPayload } from '../../models/requests/createPost';
import { IGetPosts } from '../../models/requests/getPosts';
import { IResponseGetPost } from '../../models/responses/reponseGetPosts';
import { PostServiceSkeleton } from '../PostServiceSkeleton';

export default class PostService implements PostServiceSkeleton {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async createPost(
    userId: string,
    classId: string,
    payload: ICreatePostsPayload,
  ) {
    const { data } = await this.httpClient.post<IResponseGetPost>(
      '/post',
      { ...payload },
      {
        params: { userId, classId },
      },
    );

    return data;
  }

  async getPosts(postParams: IGetPosts) {
    const { data } = await this.httpClient.get<IResponseGetPost>('/post', {
      params: { ...postParams },
    });

    return data;
  }
}
