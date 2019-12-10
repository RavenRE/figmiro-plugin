import axios from 'axios';
import {API} from 'config';
import {getTokenFromStorage} from 'modules/auth/auth.service';

export const request = axios.create({
  baseURL: API
});

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
