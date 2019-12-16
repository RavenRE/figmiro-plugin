import axios from 'axios';
import {getTokenFromStorage} from 'modules/auth/auth.service';

export const request = axios.create({
  baseURL: 'https://b6b0a1c9.ngrok.io'
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
