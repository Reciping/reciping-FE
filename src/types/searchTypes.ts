import { Recipe } from '../types/recipe';

export interface SearchResponse {
  recipes: Recipe[];
  nextCursor: string | null;
  currentCount: number;
  hasNext: boolean;
  pageCount: number;
  totalHits: number;
  totalPages: number;
}

export interface NaturalSearchRequest {
  query: string;
  size?: number;
  cursor?: string;
  pageCount?: number;
}

export interface MenuSearchRequest {
  keyword: string;
  size?: number;
  cursor?: string;
  pageCount?: number;
}

export interface IngredientsSearchRequest {
  ingredients: string[];
  size?: number;
  cursor?: string;
  pageCount?: number;
} 