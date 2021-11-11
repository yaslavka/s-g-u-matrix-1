import { baseInstance } from './index';

export const transferMoneyToUser = data => baseInstance({ url: '/api/wallet/transfer', method: 'post', data });