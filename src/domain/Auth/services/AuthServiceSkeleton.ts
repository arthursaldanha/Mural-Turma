import { IForgotPassword } from '../models/forgotPassword';
import { IPromiseSignIn } from '../models/signIn';

export interface AuthServiceSkeleton {
  signInWithUsername: (
    username: string,
    password: string,
  ) => Promise<IPromiseSignIn>;
  signUp: (
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  forgotPassword: (forgotPasswordSchema: IForgotPassword) => Promise<boolean>;
  recoveryPassword: (
    userId: number,
    password: string,
    token: string,
  ) => Promise<void>;
}
