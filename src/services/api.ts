import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8000',
  withCredentials: true,
  timeout: 10_000
})

// ✅ 요청 인터셉터: JWT 토큰 자동 포함
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // 또는 sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)