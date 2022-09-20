import { TypeFeedback } from '../common';

type ICreateFeedback = {
  description: string;
  type: TypeFeedback;
  file?: string | null;
};

export { type ICreateFeedback };
