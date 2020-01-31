import axios, {AxiosError} from 'axios';
import {getTokenFromStorage} from 'modules/auth/auth.service';
import {AppError, AppErrorType} from 'helpers/AppError';

export const request = axios.create({
  baseURL: 'https://0ddd8f64.ngrok.io'
});

export const {CancelToken} = axios;
export {Canceler} from 'axios';

request.interceptors.request.use(async config => {
  const token = await getTokenFromStorage();
  if (token) {
    config.headers.Authorization = `hash ${token}`;
  }
  if (config.params) {
    config.params = JSON.parse(JSON.stringify(config.params));
  }
  return config;
});

request.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (!error.response) {
      throw new AppError(AppErrorType.NETWORK_ERROR);
    }
    throw new AppError(error.response.data.reason);
  }
);
