import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://56008acd.ngrok.io'
});
