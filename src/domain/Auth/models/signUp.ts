interface ISignUp {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ISignUpForm {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export { type ISignUp, type ISignUpForm };
