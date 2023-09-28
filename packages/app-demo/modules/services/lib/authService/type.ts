import { IAccount } from "../../entities";

export type GetAccountParams = void;
export type GetAccountResponse = IAccount[];

export type AccessToken = string;
export type RegisterParams = Pick<
  IAccount,
  "email" | "firstName" | "lastName" | "password"
>;
export type LoginParams = {
  isRememberMe: boolean;
  email: string;
  password: string;
};

export type AuthenticationResponse = {
  statusCode?: number;
  message: string;
  token?: string;
};
