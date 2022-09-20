export interface FeedbackServiceSkeleton {
  getFeedbacks: () => Promise<any>;
  createFeedbacks: (params: FormData) => Promise<any>;
}
