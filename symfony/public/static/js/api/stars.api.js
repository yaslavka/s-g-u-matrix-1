import { baseInstance } from './index';

export const matrixQueue = params =>
  baseInstance({ url: '/api/matrix/get-matrix-queue', method: 'get', params });
