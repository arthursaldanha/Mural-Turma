import { IAccount } from '../models/account';

export interface AccountServiceSkeleton {
  findAccount: (userId: number) => Promise<IAccount>;
}
