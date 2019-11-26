import axios, {AxiosTransformer} from 'axios';
import {serialize} from 'utils/serialize';
import {camelToSnake, snakeToCamel} from 'utils/caseFormatters';
import {storage} from 'services/storage';

export const request = axios.create({
  baseURL: 'https://miro.com/api/v1'
});

// export const AUTH_KEY = 'auth';
// request.interceptors.request.use(config => {
//   const auth = storage.get(AUTH_KEY);
//   if (auth && auth.token) {
//     config.headers.Authorization = `Bearer ${auth.token}`;
//   }
//   if (config.params) {
//     config.params = JSON.parse(JSON.stringify(config.params));
//   }
//   return config;
// });
