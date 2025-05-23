import axios from 'axios'
import { addTokenInterceptor } from './interceptors'

/** 광고 API 인스턴스 */
export const adsApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ADS_BASE || 'http://localhost:8080',
  timeout: 10_000,
})

addTokenInterceptor(adsApiClient) 