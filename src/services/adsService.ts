import { Ad } from '../types/ads'
import { adsApiClient } from '../api/adsApiClient'

/* 여기에 광고 API 넣기 */

interface ServeAdsResponse {
  ads: Ad[];
}

export const getPublicAds = async (): Promise<Ad[]> => {
  try {
    const response = await adsApiClient.get<ServeAdsResponse>('/api/v1/ads/public/serve');
    return response.data.ads ?? [];
  } catch (error) {
    console.error('Error fetching public ads:', error);
    return [];
  }
};