import { Ad } from '../types/ads'
import { adsApiClient } from '../api/adsApiClient'

/* 여기에 광고 API 넣기 */

interface ServeAdsResponse {
  ads: Ad[];
}

export const getPublicAds = async (): Promise<Record<string, Ad[]>> => {
  try {
    const response = await adsApiClient.get<Record<string, Ad[]>>('/api/v1/ads/public/serve')
    return response.data
  } catch (error) {
    console.error('광고 불러오기 실패:', error)
    return {}
  }
}