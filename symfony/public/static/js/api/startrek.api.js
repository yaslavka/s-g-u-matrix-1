import { baseInstance } from './index';

export const startrekStatistics = () =>
  baseInstance({ url: '/api/star-trek/statistic', method: 'get' });

export const getInstallMatrix = () =>
  baseInstance({ url: '/api/star-trek/get-install-matrix', method: 'get' });

export const startrekStatistic = () =>
  baseInstance({ url: '/api/star-trek/table', method: 'get' });

export const startrekBuy = () =>
  baseInstance({ url: '/api/star-trek/buy', method: 'post' });

export const startrekPlanets = params =>
  baseInstance({ url: '/api/star-trek/list', method: 'get', params });

export const startrekFirstLinePlanets = params =>
  baseInstance({
    url: '/api/star-trek/list-first-line',
    method: 'get',
    params,
  });

export const changeAutoRefillPlanets = data =>
  baseInstance({ url: '/api/star-trek/auto-update', method: 'post', data });

export const startrekPlanetsUpdate = data =>
  baseInstance({
    url: '/api/star-trek/update',
    method: 'post',
    data,
  });

export const startrekCometLaunch = data =>
  baseInstance({ url: '/api/star-trek/install-matrix', method: 'post', data });
