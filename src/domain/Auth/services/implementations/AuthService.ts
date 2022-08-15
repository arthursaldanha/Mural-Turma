import { AxiosInstance } from 'axios';

import { IForgotPassword } from '../../models/forgotPassword';
import { IRecoveryPassword } from '../../models/recoveryPassword';
import { IPromiseSignIn, ISignIn } from '../../models/signIn';
import { ISignUp } from '../../models/signUp';
import { AuthServiceSkeleton } from '../AuthServiceSkeleton';

export default class AuthService implements AuthServiceSkeleton {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async signInWithUsername(username: string, password: string) {
    const { data } = await this.httpClient.post<IPromiseSignIn>('/login', {
      username,
      password,
    });

    return data;
  }

  async signUp(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const { data } = await this.httpClient.post('/user/signup', {
      username,
      firstName,
      lastName,
      email,
      password,
    });

    return data;
  }

  async forgotPassword(email: string) {
    const { data } = await this.httpClient.get<boolean>('/user/recovery', {
      params: { email },
    });

    return data;
  }

  async recoveryPassword(id: number, password: string, token: string) {
    const { data } = await this.httpClient.post('/user/recovery', {
      id,
      password,
      token,
    });
    return data;
  }
}
