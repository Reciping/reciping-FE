import axios from 'axios'


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080',
    withCredentials: true,
    timeout: 10_000,
  })

// 요청 시 토큰 자동 포함
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    (error) => Promise.reject(error)
  )