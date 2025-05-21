import { recipeApiClient } from '../api/recipeApiClient'
import {
  DishTypeLabelToValue,
  SituationTypeLabelToValue,
  IngredientTypeLabelToValue,
  MethodTypeLabelToValue,
} from '../constants/CategoryValueMap'
import {
  Recipe,
  SearchResponse,
  SearchParams,
  Pageable,
  DefaultRecipesResponse,
  CommentItem,
  CommentPage,
  RecipeDetailResponse,
  CategoryOption,
  CategoryOptionsResponse,
  CategorySearchRequest,
  CategorySearchResponse,
  RecipeCreateRequest
} from '../types/recipe'

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

export const getCategoryOptions = async (): Promise<CategoryOptionsResponse> => {
  const { data } = await recipeApiClient.get<CategoryOptionsResponse>('/api/v1/recipes/category-options')
  return data
}

export const searchRecipesByCategory = async (
  body: CategorySearchRequest,
  page = 0,             // 필요 없으면 삭제해도 무방
  size = 20,
) => {
  const { data } = await recipeApiClient.post<CategorySearchResponse>('/api/v1/recipes/search/category', body, {
    params: { page, size },
  })
  return data
}

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
 * 레시피 생성
 * POST /api/v1/recipes
 * @param dto - RecipeCreateRequest
 * @param file - 이미지 파일
 * @param userId - X-USER-ID header
 * @returns 성공 여부(boolean)
 */
export const createRecipe = async (
  dto: RecipeCreateRequest,
  file: File | null,
  userId: number
): Promise<boolean> => {
  const formData = new FormData()
  formData.append('requestDto', new Blob([JSON.stringify(dto)], { type: 'application/json' }))
  if (file) formData.append('file', file)

  const res = await recipeApiClient.post('/api/v1/recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-USER-ID': String(userId),
    },
  })
  return res.status === 200 || res.status === 201
} 
