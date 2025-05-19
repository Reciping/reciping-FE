import axios from 'axios'


/** 광고 API 인스턴스 */
export const adsApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ADS_BASE,
  timeout: 10_000,
}) 