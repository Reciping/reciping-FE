import axios from 'axios'

export const authApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_LIKE_BASE || 'http://localhost:8080',
    withCredentials: true,
    timeout: 10_000,
})

