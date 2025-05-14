// src/types/mypage.ts

export type SexType = 'FEMALE' | 'MALE';
export type AgeType = 'TEENS' | 'TWENTIES' | 'THIRTIES' | 'FORTIES' | 'FIFTIES' | 'SIXTIES' | 'SEVENTIES_PLUS';
export type InterestKeywordType = 'VEGAN' | 'HIGH_PROTEIN' | 'LOW_CARB' | string;

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  sex: SexType;
  age: AgeType;
  interestKeyword: InterestKeywordType;
  point: number;
}

export interface RecipeItem {
  recipeId: number;
  title: string;
  likes: number;
}

export interface PagedRecipes {
  recipes: RecipeItem[];
  page: number;
  totalPages: number;
}

export interface PointHistory {
  id: number;
  userId: number;
  pointChange: number;
  changeReason: string;
  createdAt: string; // ISO-8601
}

export interface MyPageData {
  userInfo: UserInfo;
  recipeCount: number;
  myRecipes: PagedRecipes;
  pointHistories: PointHistory[];
  myBookmarks: PagedRecipes;
}
