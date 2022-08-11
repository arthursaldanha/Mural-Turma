import { AxiosInstance } from 'axios';

import { IAccount } from '../../models/account';
import { AccountServiceSkeleton } from '../AccountServiceSkeleton';

export default class AccountService implements AccountServiceSkeleton {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async findAccount(userId: number) {
    const { data } = await this.httpClient.get<IAccount>(`v1/user/${userId}`);

    return data;
  }
}
