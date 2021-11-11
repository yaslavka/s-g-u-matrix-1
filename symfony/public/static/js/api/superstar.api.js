import { baseInstance } from './index';

export const getSuperStarQueue = params =>
  baseInstance({ url: '/api/matrix/super/queue', method: 'get', params });
