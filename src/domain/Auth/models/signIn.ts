interface ISignIn {
  username: string;
  password: string;
}

interface IPromiseSignIn {
  accessToken: string;
  refreshToken: string;
}

interface ISignInForm {
  username: string;
  password: string;
}

export { type ISignIn, type IPromiseSignIn, type ISignInForm };
