import { mainApiClient } from '../api/mainApiClient'
import { Recipe } from '../types/recipe'

// Keeping the type definitions relevant to the service
export interface EventBanner {
  id: string
  title: string
  previewImage: { filePath: string }
}
  
interface RawMainResponse {
  events: { data: EventBanner[] }
}
  
export interface MainResponse {
  events: EventBanner[]
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
    events: data.events?.data ?? [],
  }
}
