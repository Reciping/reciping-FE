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
  description: string
  servings: number
  ingredients: Ingredient[]
  steps: Step[]
  userName: string
  userImageUrl: string
  likes: number
  bookmarks: number
  isLiked: boolean
  isBookmarked: boolean
}

export interface SearchResponse {
  total: number
  page: number
  limit: number
  recipes: Recipe[]
}

export interface SearchParams {
  keyword: string
  mode?: 'category' | 'ingredient' | 'menu'
  type?: string
  dishType?: string
  situationType?: string
  ingredientType?: string
  methodType?: string
  cookingTime?: string
  difficulty?: string
  page?: number
}

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

export interface CommentItem {
  id: string
  recipeId: number
  userId: number
  content: string
  createdAt: string
  modifiedAt: string
}

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

export interface RecipeDetailResponse {
  recipe: Recipe
  comments: CommentPage
}

export interface CategoryOption {
  label: string
  value: string
}

export interface CategoryOptionsResponse {
  dishTypes: CategoryOption[]
  situationTypes: CategoryOption[]
  ingredientTypes: CategoryOption[]
  methodTypes: CategoryOption[]
  cookingTimes: CategoryOption[]
  difficulties: CategoryOption[]
}

export interface CategorySearchRequest {
  dishType?: string
  situationType?: string
  ingredientType?: string
  methodType?: string
  cookingTime?: string
  difficulty?: string
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

export interface Ingredient {
  id: number
  name: string
  amount: string
  unit: string
}

export interface Step {
  id: number
  order: number
  description: string
  imageUrl: string
} 