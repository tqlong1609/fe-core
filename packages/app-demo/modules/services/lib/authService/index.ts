import { isAxiosError } from '../../config/axios';
import { API_URL } from '../../config/url';
import { Services } from '../../Services';
import { authenticationResponseSchema } from './schema';
import {
  LoginParams,
  RegisterParams,
  AccessToken,
  AuthenticationResponse,
} from './type';

const unknownError = 'Unexpected error occurred';

interface IAuthService {
  get registerUrl(): string;
  register(data: RegisterParams): Promise<AuthenticationResponse>;

  get loginUrl(): string;
  login(data: LoginParams): Promise<AuthenticationResponse>;

  get refreshTokenUrl(): string;
  refreshToken(data: AccessToken): Promise<AuthenticationResponse>;
}

export class AuthService extends Services implements IAuthService {
  url: string = API_URL + '/auth';
  abortController?: AbortController;

  registerUrl: string = this.url + '/register';
  loginUrl: string = this.url + '/login';
  refreshTokenUrl: string = this.url + '/refreshToken';

  register = async (data: RegisterParams): Promise<AuthenticationResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        RegisterParams,
        typeof authenticationResponseSchema,
        AuthenticationResponse
      >({
        method: 'POST',
        url: this.registerUrl,
        schema: authenticationResponseSchema,
        data,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return {
        message: response.message,
        token: response.token,
      };
    } catch (error) {
      if (this.isCancel(error)) {
        // Handle other errors
        throw error;
      } else if (isAxiosError(error)) {
        throw new Error(
          error.response ? error.response.data.message : unknownError
        );
      }
      throw new Error(unknownError);
    }
  };
  login = async (data: LoginParams): Promise<AuthenticationResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        LoginParams,
        typeof authenticationResponseSchema,
        AuthenticationResponse
      >({
        method: 'POST',
        url: this.loginUrl,
        schema: authenticationResponseSchema,
        data,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return {
        message: response.message,
        token: response.token,
      };
    } catch (error) {
      if (this.isCancel(error)) {
        // Handle other errors
        throw error;
      } else if (isAxiosError(error)) {
        throw new Error(
          error.response ? error.response.data.message : unknownError
        );
      }
      throw new Error(unknownError);
    }
  };
  refreshToken = async (
    accessToken: AccessToken
  ): Promise<AuthenticationResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        unknown,
        typeof authenticationResponseSchema,
        AuthenticationResponse
      >({
        method: 'POST',
        url: this.refreshTokenUrl,
        schema: authenticationResponseSchema,
        data: {},
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return {
        message: response.message,
        token: response.token,
      };
    } catch (error) {
      if (this.isCancel(error)) {
        // Handle other errors
        throw error;
      } else if (isAxiosError(error)) {
        throw new Error(
          error.response ? error.response.data.message : unknownError
        );
      }
      throw new Error(unknownError);
    }
  };
}
export * from './type';
