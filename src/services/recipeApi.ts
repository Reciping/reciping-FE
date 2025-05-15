import axios from 'axios'

const baseURL =
  import.meta.env.VITE_API_RECIPE_BASE ||
  import.meta.env.VITE_API_BASE ||
  'http://localhost:8080'

// 레시피 검색·조회 전용 인스턴스
export const recipeApi = axios.create({
    baseURL,
    timeout: 10_000,
})
