import { AxiosRequestConfig, GenericAbortSignal } from 'axios';
import { z } from 'zod';
import { AxiosInstance, AxiosResponse, axios, isCancel } from './config/axios';

interface IServices {
  readonly url: string;
  abortController?: AbortController;
  cancelRequest(): void;
  isCancel(error: unknown): boolean;
  axios: AxiosInstance;
  fetchApi<T extends z.Schema, K = z.infer<T>>(params: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    schema: T;
    data?: any;
    params?: RequestInit;
    headers?: AxiosRequestConfig['headers'];
    signal?: GenericAbortSignal;
    transformResponse?: (response: z.infer<T>) => K;
  }): Promise<K>;
}

export abstract class Services implements IServices {
  abstract readonly url: string;
  abstract abortController?: AbortController;
  axios: AxiosInstance;

  constructor() {
    this.axios = axios;
  }

  isCancel(error: unknown): boolean {
    return isCancel(error);
  }

  cancelRequest(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  async fetchApi<
    Input = any,
    Schema extends z.Schema = any,
    Output = z.infer<Schema>
  >({
    method,
    url,
    schema,
    params,
    data,
    headers = {},
    signal,
    transformResponse,
  }: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    schema: Schema;
    data?: AxiosRequestConfig<Input>['data'];
    params?: Input;
    headers?: AxiosRequestConfig['headers'];
    signal?: GenericAbortSignal;
    transformResponse?: (response: z.infer<Schema>) => Output;
  }): Promise<Output> {
    const response: AxiosResponse<Schema> = await this.axios({
      method,
      url,
      data,
      params,
      headers,
      signal,
    });
    const dataResponse = schema.parse(response.data);
    return transformResponse ? transformResponse(dataResponse) : dataResponse;
  }
}
