import axios from 'axios'
import { addTokenInterceptor } from './interceptors'

export const likeApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_LIKE_BASE || 'http://localhost:8080',
    timeout: 10_000,
})

addTokenInterceptor(likeApiClient)

