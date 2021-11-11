import { baseInstance } from './index';

export const getUserStructure = params =>
  baseInstance({ url: '/api/structure', method: 'get', params });
