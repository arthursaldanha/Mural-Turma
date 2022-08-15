interface IRecoveryPassword {
  id: number;
  password: string;
  token: string;
}

interface IRecoveryPasswordForm {
  password: string;
  passwordConfirmation: string;
}

export { type IRecoveryPassword, type IRecoveryPasswordForm };
