import { recipeApi } from "./recipeApi"

// --- 응답 타입 정의 (API 명세에 맞춰서) -------------
export interface Recipe {
  id: number
  title: string
  imageUrl: string
  likeCount: number
  createdAt: string
  modifiedAt: string
  liked: false
}

export interface SearchResponse {
  total: number
  page: number
  limit: number
  recipes: Recipe[]
}

// --- 요청 파라미터 타입 정의 ------------------------
export interface SearchParams {
  keyword: string
  mode?: 'category' | 'ingredient' | 'menu'
  // category mode 일 때만 사용
  type?: string
  situation?: string
  ingredient?: string
  method?: string
  page?: number
}
/**
 * 레시피 검색
 */
export const searchRecipes = (params: SearchParams) => {
  return recipeApi.get<SearchResponse>('/api/v1/recipes/search', { params })
}

/**
 * 레시피 상세 조회
 */
export const getRecipeById = (id: string | number) => {
  return recipeApi.get<Recipe>(`/api/v1/recipes/${id}`)
}

/**
 * 홈 기본 레시피 목록을 가져옵니다.
 * GET /api/v1/recipes/default
 * 서버가 Recipe[] 배열을 직접 리턴한다고 가정
 */
export const getDefaultRecipes = (): Promise<Recipe[]> =>
  recipeApi
    .get<Recipe[]>('/api/v1/recipes/default')
    .then(res => res.data)