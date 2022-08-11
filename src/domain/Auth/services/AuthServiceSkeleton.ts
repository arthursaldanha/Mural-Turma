import { IForgotPassword } from '../models/forgotPassword';
import { IRecoveryPassword } from '../models/recoveryPassword';
import { IPromiseSignIn, ISignIn } from '../models/signIn';
import { ISignUp } from '../models/signUp';

export interface AuthServiceSkeleton {
  signInWithUsername: (signInSchema: ISignIn) => Promise<IPromiseSignIn>;
  signUp: (signUpSchema: ISignUp) => Promise<void>;
  forgotPassword: (forgotPasswordSchema: IForgotPassword) => Promise<boolean>;
  recoveryPassword: (
    recoveryPasswordSchema: IRecoveryPassword,
  ) => Promise<void>;
}
