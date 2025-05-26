import { authApiClient } from '../api/authApiClient'
import { eventApiClient } from '../api/eventApiClient'
import { EventBanner } from '../types/event'

// 📑 응답 데이터 타입
export interface PreviewImage {
  objectName: string
  keyName: string
  filePath: string
}

export interface EventItem {
  id: string
  title: string
  previewImage: PreviewImage
}

// 📑 전체 응답 타입
export interface GetEventsResponse {
  data: EventItem[]
}

// 📑 요청 파라미터 타입
export interface GetEventsParams {
  page: number
  size: number
  event_type: string
  is_deleted: boolean
}

/**
 * 이벤트 목록을 가져옵니다.
 * @param params GET /api/v1/events?page=&size=&event_type=&is_deleted=
 * @throws 400 혹은 500 에러 메시지를 throw 합니다.
 */
export const getEvents = async (
  params: GetEventsParams
): Promise<EventItem[]> => {
  try {
    const res = await authApiClient.get<GetEventsResponse>('/api/v1/events', {
      params,
    })
    return res.data.data
  } catch (err: any) {
    if (err.response) {
      const status = err.response.status
      const message = err.response.data || err.response.statusText
      throw new Error(
        status === 400
          ? `잘못된 요청입니다: ${message}`
          : `서버 오류가 발생했습니다 (${status}): ${message}`
      )
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}

export const getEventBanners = async (
  position = 'MAIN_TOP',
  size = 20,
): Promise<EventBanner[]> => {
  try {
    const response = await eventApiClient.get<GetEventsResponse>(
      '/api/v1/main',
      { params: { position, size } }
    )
    return response.data.data ?? []
  } catch (error) {
    console.error('Error fetching event banners:', error)
    return []
  }
} 