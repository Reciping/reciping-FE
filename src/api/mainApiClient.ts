import axios from 'axios'
import { addTokenInterceptor } from './interceptors'

export const mainApiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_MAIN_BASE ||
    'http://localhost:8080',
  timeout: 10_000,
})

addTokenInterceptor(mainApiClient)

mainApiClient.interceptors.request.use(
  config => {
    const userId =
      localStorage.getItem('userId')  // 로그인 시 저장해둔 값
      ?? '1123'                       // 또는 하드코드 테스트 ID
    // config.headers['X-USER-ID'] = userId
    return config
  },
  error => Promise.reject(error),
) 