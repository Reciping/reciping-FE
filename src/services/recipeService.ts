import { recipeApiClient } from '../api/recipeApiClient'
import {
  DishTypeLabelToValue,
  SituationTypeLabelToValue,
  IngredientTypeLabelToValue,
  MethodTypeLabelToValue,
} from '../constants/CategoryValueMap'

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
  dishType:    string | null
  situationType:   string | null
  methodType:      string | null
  ingredientType:  string | null

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
  dishType?: string
  situationType?: string
  ingredientType?: string
  methodType?: string
  cookingTime?: string
  difficulty?: string
  page?: number
}

/**
 * 레시피 검색 (mode에 따라 분기)
 * - menu        → GET /api/v1/recipes/search/menu
 * - ingredient  → GET /api/v1/recipes/search/ingredients
 * - category    → POST /api/v1/recipes/search/category
 */
export const searchRecipes = async (
  mode: 'category' | 'ingredient' | 'menu',
  params: SearchParams
): Promise<SearchResponse> => {
  const { page = 1, keyword } = params
  if (mode === 'category') {
    const body = {
      dishType: DishTypeLabelToValue[params.dishType ?? '전체'] ?? 'ALL',
      situationType: SituationTypeLabelToValue[params.situationType ?? '전체'] ?? 'ALL',
      ingredientType: IngredientTypeLabelToValue[params.ingredientType ?? '전체'] ?? 'ALL',
      methodType: MethodTypeLabelToValue[params.methodType ?? '전체'] ?? 'ALL',
      cookingTime:    params.cookingTime ?? '전체',  // 이미 Enum value인 경우
      difficulty:     params.difficulty ?? '전체',   // 이미 Enum value인 경우
    }
    // Assuming searchRecipesByCategory is also moved to this service file
    const data = await searchRecipesByCategory(body, page - 1, 20)

    return {
      recipes: data.content,
      total: data.totalElements,
      page: data.number + 1,
      limit: data.size,
    }
  }

  const endpoint =
    mode === 'ingredient'
      ? '/api/v1/recipes/search/ingredients'
      : '/api/v1/recipes/search/menu'

  const { data } = await recipeApiClient.get<SearchResponse>(endpoint, {
    params: { keyword, page },
  })

  return data
}

// --- 추가: 페이지네이션 응답 타입 ---
export interface Pageable {
  pageNumber:      number
  pageSize:        number
  sort:            unknown[]
  offset:          number
  paged:           boolean
  unpaged:         boolean
}

export interface DefaultRecipesResponse {
  content:         Recipe[]        // 실제 레시피 배열
  pageable:        Pageable
  last:            boolean
  totalElements:   number
  totalPages:      number
  first:           boolean
  size:            number
  number:          number          // 현재 페이지 (0-based)
  sort:            unknown[]
  numberOfElements:number
  empty:           boolean
}

/**
 * 레시피 상세 조회 (이미지 없이 본문만)
 * GET /api/v1/recipes/:id
 */
export const getRecipeById = (id: string | number) =>
  recipeApiClient.get<Recipe>(`/api/v1/recipes/${id}`)

/**
 * 홈 기본 레시피 목록 조회
 * GET /api/v1/recipes/default
 */
// 기존 getDefaultRecipes 를 아래처럼 수정
export const getDefaultRecipes = async (
  page = 0,          // 0-based page 인 경우
  size = 20           // 한 페이지당 아이템 개수
): Promise<DefaultRecipesResponse> => {
  const res = await recipeApiClient.get<DefaultRecipesResponse>('/api/v1/recipes/default', {
    params: { page, size },
  })
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
  page = 0,
  size = 5
): Promise<RecipeDetailResponse> =>
  recipeApiClient
    .get<RecipeDetailResponse>(`/api/v1/recipes/${id}`, {
      params: { page, size },
      headers: {
        'X-USER-ID' : '1123'
      }
    })
    .then(res => res.data)

/**
 * 북마크 토글
 * @param userId  – 현재 로그인한 유저 ID
 * @param recipeId – 토글할 레시피 ID
 */
export const toggleBookmark = (userId: number, recipeId: number): Promise<boolean> => {
  return recipeApiClient
    .post<boolean>('/api/v1/bookmarks/toggle', { userId, recipeId })
    .then(res => res.data)
}

/**
 * 새로운 레시피 등록
 * POST /api/v1/recipes
 * - multipart/form-data
 * - 반드시 X-USER-ID 헤더를 함께 전송해야 함
 * @param formData FormData (title, content, tags, file 등)
 * @param userId   요청 헤더에 넣을 유저 ID
 * @returns 새로 생성된 레시피 ID
 */
export const createRecipe = async (
  formData: FormData,
  userId: number
): Promise<number> => {
  const res = await recipeApiClient.post<{
    data: { id: number }
  }>(
    '/api/v1/recipes', 
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-USER-ID': String(userId),
      },
    }
  )
  // 실제 ID는 res.data.data.id 에 들어 있습니다
  return res.data.data.id
}

/** 카테고리 옵션 하나 */
export interface CategoryOption {
  label: string
  value: string
}

// --- Remaining content from src/api/recipesApi.ts ---

export interface CategoryOptionsResponse {
  dish:       CategoryOption[]
  situation:  CategoryOption[]
  ingredient: CategoryOption[]
  method:     CategoryOption[]
  cookingTime: CategoryOption[]
  difficulty: CategoryOption[]
}

export const getCategoryOptions = async (): Promise<CategoryOptionsResponse> => {
  const res = await recipeApiClient.get<CategoryOptionsResponse>('/api/v1/recipes/categories')
  return res.data
}

export interface CategorySearchRequest {
  dishType?:       string | null
  situationType?:  string | null
  methodType?:     string | null
  ingredientType?: string | null
  cookingTime?:    string | null
  difficulty?:     string | null
}

export interface CategorySearchResponse {
  content: Recipe[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: unknown[]
  numberOfElements: number
  empty: boolean
}

export const searchRecipesByCategory = async (
  body: CategorySearchRequest,
  page = 0,             // 필요 없으면 삭제해도 무방
  size = 20,
) => {
  const res = await recipeApiClient.post<CategorySearchResponse>(
    '/api/v1/recipes/search/category',
    body,
    { params: { page, size } }
  )
  return res.data
} 