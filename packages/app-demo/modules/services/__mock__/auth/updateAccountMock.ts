import { axiosMockAdapterInstance } from '../../config/axios';
import { IAccount } from '../../entities';
import { SocialService } from '../../lib';
import {
  UpdateAccountParams,
  UpdateAccountResponse,
} from '../../lib/socialService/type';
import accountsData from './data/accounts.json';

const accounts: Array<IAccount> = accountsData;

axiosMockAdapterInstance
  .onPost(new SocialService().updateAccountUrl)
  .reply((config) => {
    const data = JSON.parse(config.data) as UpdateAccountParams;
    const isAccountExist = accounts.some(
      (account) => account.email === data.email
    );
    if (!isAccountExist) {
      // handle
    }
    return [
      200,
      {
        message: 'Login success',
      } as UpdateAccountResponse,
    ];
  });
