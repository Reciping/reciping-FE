import axios from 'axios'


console.log('▶ recipeApi baseURL:', import.meta.env.VITE_API_RECIPE_BASE)

// 레시피 검색·조회 전용 인스턴스
export const recipeApi = axios.create({
    baseURL: import.meta.env.VITE_API_RECIPE_BASE,
    timeout: 10_000,
})

console.log('🌏 RECIPE BASE URL =', recipeApi.defaults.baseURL)
// (레시피 조회는 비회원도 가능하다면 인터셉터 생략)
