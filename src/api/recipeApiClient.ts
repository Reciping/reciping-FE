import axios from 'axios'
import { addTokenInterceptor } from './interceptors'

// 레시피 검색·조회 전용 인스턴스
export const recipeApiClient = axios.create({
    baseURL : import.meta.env.VITE_API_RECIPE_BASE || 'http://localhost:8080',
    timeout: 10_000,
})

addTokenInterceptor(recipeApiClient)
