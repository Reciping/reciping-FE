import axios from 'axios'


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080',
    timeout: 10_000,
  })

// 요청 시 토큰 자동 포함
api.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token')
      if (token) {
        token = token.trim()
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )