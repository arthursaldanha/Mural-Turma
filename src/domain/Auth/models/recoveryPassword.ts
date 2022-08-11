interface IRecoveryPassword {
  id: number;
  password: string;
  token: string;
}

interface IRecoveryPasswordForm {
  password: string;
  repeatPassword: string;
}

export { type IRecoveryPassword, type IRecoveryPasswordForm };
