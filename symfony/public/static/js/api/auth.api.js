import { createFormDataObj } from '../utils';
import { baseInstance } from './index';

export const signUp = userInfo =>
  baseInstance({
    url: '/registration',
    method: 'post',
    data: userInfo,
  });

export const signIn = credentials =>
  baseInstance({
    url: '/oauth/v2/token',
    method: 'post',
    data: createFormDataObj({ ...credentials, grant_type: 'password' }),
  });

export const inviter = params =>
  baseInstance({ url: '/inviter', method: 'get', params });
