import { mainApiClient } from '../api/mainApiClient'
import { Recipe } from '../types/recipe'
import { Ad } from '../types/ads' // Assuming Ad type is in src/types

// Keeping the type definitions relevant to the service
export interface EventBanner {
  id: string
  title: string
  previewImage: { filePath: string }
}
  
interface RawMainResponse {
  ads: Ad[]
  events: { data: EventBanner[] }
  recommendedRecipeList: Recipe[]
}
  
export interface MainResponse {
  ads: Ad[]
  events: EventBanner[]
  recommendedRecipes: Recipe[]
}

export const getMainData = async (
  position = 'MAIN_TOP',
  size = 20,                // ★ 여기서 개수 조정
): Promise<MainResponse> => {
  const { data } = await mainApiClient.get<RawMainResponse>(
    '/api/v1/main',
    { params: { position, size } },
  )
  return {
    ads: data.ads ?? [],
    events: data.events?.data ?? [],
    recommendedRecipes: data.recommendedRecipeList ?? [],
  }
}
