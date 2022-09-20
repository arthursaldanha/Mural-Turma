import { AxiosInstance } from 'axios';

import { FeedbackServiceSkeleton } from '../FeedbacksServiceSkeleton';

export default class FeedbackService implements FeedbackServiceSkeleton {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async getFeedbacks() {
    const { data } = await this.httpClient.get<any>('/feedbacks');

    return data;
  }

  async createFeedbacks(postParams: FormData) {
    const { data } = await this.httpClient.post<any>(
      '/feedbacks',
      postParams,
      {},
    );

    return data;
  }
}
