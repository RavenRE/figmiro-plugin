import axios from 'axios';
import {getTokenFromStorage} from 'modules/auth/auth.service';

export const request = axios.create({
  baseURL: 'https://4ca76303.ngrok.io'
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
