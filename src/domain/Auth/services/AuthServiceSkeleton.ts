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
  forgotPassword: (email: string) => Promise<boolean>;
  recoveryPassword: (
    id: number,
    password: string,
    token: string,
  ) => Promise<void>;
}
