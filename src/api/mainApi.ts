import axios from 'axios'
import { Recipe } from './recipesApi'
import { Ad } from './adsApi'

export const mainApi = axios.create({
  baseURL:
    import.meta.env.VITE_API_MAIN_BASE ||
    'http://localhost:8080',
  timeout: 10_000,
})

mainApi.interceptors.request.use(
  config => {
    const userId =
      localStorage.getItem('userId')  // 로그인 시 저장해둔 값
      ?? '1123'                       // 또는 하드코드 테스트 ID
    config.headers['X-USER-ID'] = userId
    return config
  },
  error => Promise.reject(error),
)

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
  const { data } = await mainApi.get<RawMainResponse>(
    '/api/v1/main',
    { params: { position, size } },
  )
  console.log('[main] data', data)
  return {
    ads: data.ads ?? [],
    events: data.events?.data ?? [],
    recommendedRecipes: data.recommendedRecipeList ?? [],
  }
}
