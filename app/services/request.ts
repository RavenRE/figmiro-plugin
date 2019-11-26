import axios from 'axios';
import {API_URL} from 'services/api-config';

export const request = axios.create({
  baseURL: API_URL
});
