
export interface IAuthUser {
  email: string;
  password: string;
  isVerified: boolean;
  refreshToken?: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}
