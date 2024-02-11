import axios from 'axios';
import {IS_ANDROID, URLS} from '../../constants/theme';

export const apiClient = axios.create({
  baseURL: IS_ANDROID ? URLS?.BASE_URL_DEV_ANDROID : URLS.BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
