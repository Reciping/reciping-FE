import { api } from './axiosInstance'

// --- 응답 타입 정의 (API 명세에 맞춰서) -------------
export interface Recipe {
  id: number
  title: string
  image_url: string
  like: number
  created_at: string
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

// --- 실제 호출 함수 --------------------------------
// 엔드포인트는 백엔드 사양에 맞춰 조정. 
export const searchRecipes = async (params: SearchParams): Promise<SearchResponse> => {
  const res = await api.get<SearchResponse>('/api/v1/recipes/search', {
    params,
  })
  return res.data
}
