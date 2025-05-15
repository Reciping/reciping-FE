import axios from 'axios'


/** 광고 API 인스턴스 */
export const adsApi = axios.create({
  baseURL: import.meta.env.VITE_API_ADS_BASE,
  timeout: 10_000,
})

/** 광고 객체 타입 */
export interface Ad {
  id: number
  title: string
  imageUrl: string
  targetUrl: string
}
