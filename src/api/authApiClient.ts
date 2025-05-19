import axios from 'axios'


export const authApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_BASE || 'http://localhost:8080',
  timeout: 10_000,
  withCredentials: true,
})

// 요청 시 토큰 자동 포함
authApiClient.interceptors.request.use(
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

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

authApiClient.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config

    // Access Token이 만료된 경우 + 재시도 안 했을 때만
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        // 이미 refresh 중이면 큐에 쌓음
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = 'Bearer ' + token
              resolve(authApiClient(originalRequest))
            },
            reject: (error: any) => reject(error),
          })
        })
      }

      isRefreshing = true

      try {
        // ✅ Refresh Token을 쿠키로 전송
        const res = await axios.post('/api/v1/auth/refresh', {}, {
          baseURL: authApiClient.defaults.baseURL,
          withCredentials: true, // 쿠키 전송
        })

        const newAccessToken = res.headers['authorization']
        if (newAccessToken) {
          localStorage.setItem('token', newAccessToken)
          authApiClient.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken
          processQueue(null, newAccessToken)

          // 실패한 원래 요청 재시도
          originalRequest.headers.Authorization = 'Bearer ' + newAccessToken
          return authApiClient(originalRequest)
        } else {
          throw new Error('No access token in refresh response')
        }
      } catch (refreshError) {
        processQueue(refreshError, null)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  }
)