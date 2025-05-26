import axios from 'axios'
import { addTokenInterceptor } from './interceptors'

// 이벤트 전용 인스턴스
export const eventApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_EVENT_BASE || 'http://localhost:8080',
    timeout: 10_000,
})

addTokenInterceptor(eventApiClient) 