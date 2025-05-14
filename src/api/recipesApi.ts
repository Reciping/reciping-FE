// src/api/recipesApi.ts
import { recipeApi } from '../services/recipeApi'

/**
 * 레시피 기본 정보 타입
 */
export interface Recipe {
  id: number
  userId: number
  title: string
  content: string

  cookingTime: string | null
  difficulty:  string | null
  category:    string | null
  situation:   string | null
  method:      string | null
  ingredient:  string | null

  objectName: string | null
  keyName:    string | null
  filePath:   string | null

  imageUrl:  string
  likeCount: number
  tags:      string[]

  createdAt: string
  modifiedAt: string
  bookmarked: boolean
  liked:      boolean
}

/**
 * 검색 API 응답 타입
 */
export interface SearchResponse {
  total: number
  page: number
  limit: number
  recipes: Recipe[]
}

/**
 * 검색 파라미터 타입
 */
export interface SearchParams {
  keyword: string
  mode?: 'category' | 'ingredient' | 'menu'
  // category 모드일 때만 사용
  type?: string
  situation?: string
  ingredient?: string
  method?: string
  page?: number
}

/**
 * 레시피 검색
 * GET /api/v1/recipes/search?keyword=...&mode=...&...
 */
export const searchRecipes = (params: SearchParams) =>
  recipeApi.get<SearchResponse>('/api/v1/recipes/search', { params })

/**
 * 레시피 상세 조회 (이미지 없이 본문만)
 * GET /api/v1/recipes/:id
 */
export const getRecipeById = (id: string | number) =>
  recipeApi.get<Recipe>(`/api/v1/recipes/${id}`)

/**
 * 홈 기본 레시피 목록 조회
 * GET /api/v1/recipes/default
 */
export const getDefaultRecipes = async (): Promise<Recipe[]> => {
  const res = await recipeApi.get<Recipe[]>('/api/v1/recipes/default')
  return res.data
}

/**
 * 댓글 항목 타입
 */
export interface CommentItem {
  id: string
  recipeId: number
  userId: number
  content: string
  createdAt: string
  modifiedAt: string
}

/**
 * 댓글 페이지 정보 타입
 */
export interface CommentPage {
  content: CommentItem[]
  number: number           // 현재 페이지 번호 (1-based or 0-based, 백엔드 spec 따라)
  size: number             // 한 페이지당 댓글 수
  totalElements: number    // 전체 댓글 수
  numberOfElements: number // 이 페이지에 실제 포함된 댓글 수
  first: boolean
  last: boolean
  totalPages: number
  hasContent: boolean
}

/**
 * 상세 레시피 + 댓글 페이징 응답 전체 구조
 */
export interface RecipeDetailResponse {
  recipe: Recipe
  comments: CommentPage
}

/**
 * 상세 레시피 + 댓글 조회
 * GET /api/v1/recipes/:id?page={page}&size={size}
 */
export const getRecipeDetail = (
  id: string | number,
  page = 1,
  size = 6
): Promise<RecipeDetailResponse> =>
  recipeApi
    .get<RecipeDetailResponse>(`/api/v1/recipes/${id}`, {
      params: { page, size },
      headers: {
        'X-USER-ID' : '1234'
      }
    })
    .then(res => res.data)

/**
 * 북마크 토글
 * @param userId  – 현재 로그인한 유저 ID
 * @param recipeId – 토글할 레시피 ID
 */
export const toggleBookmark = (userId: number, recipeId: number): Promise<boolean> => {
  return recipeApi
    .post<boolean>('/api/v1/bookmarks/toggle', { userId, recipeId })
    .then(res => res.data)
}