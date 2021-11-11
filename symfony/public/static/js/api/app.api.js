import { baseInstance } from './index';

export const userInfo = () => baseInstance({ url: '/api/user', method: 'get' });

export const changeUserInfo = data =>
  baseInstance({ url: '/api/user/fio', method: 'post', data });

export const changePassword = data =>
  baseInstance({ url: '/api/user/password', method: 'post', data });

export const changeFinancePassword = data =>
  baseInstance({ url: '/api/settings/fin-password', method: 'post', data });

export const changeSocial = data =>
  baseInstance({ url: '/api/user/links', method: 'post', data });

export const changeDescription = data =>
  baseInstance({ url: '/api/user/description', method: 'post', data });

export const uploadImageToTelegram = blobImage => {
  const formData = new FormData();
  formData.append('file', blobImage);
  return baseInstance({
    url: '/api/user/to-telegram',
    method: 'post',
    data: formData,
  });
};
