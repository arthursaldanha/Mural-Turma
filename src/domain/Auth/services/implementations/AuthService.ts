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

  async signInWithUsername(signInSchema: ISignIn) {
    const { data } = await this.httpClient.post<IPromiseSignIn>('/v1/login', {
      signInSchema,
    });

    return data;
  }

  async signUp(signUpSchema: ISignUp) {
    const { data } = await this.httpClient.post('/api/v1/user/signup', {
      signUpSchema,
    });

    return data;
  }

  async forgotPassword(forgotPasswordSchema: IForgotPassword) {
    const { data } = await this.httpClient.get<boolean>(
      '/api/v1/user/recovery',
      {
        params: { email: forgotPasswordSchema },
      },
    );

    return data;
  }

  async recoveryPassword(recoveryPasswordSchema: IRecoveryPassword) {
    const { data } = await this.httpClient.post('/api/v1/user/recovery', {
      recoveryPasswordSchema,
    });
    return data;
  }
}
