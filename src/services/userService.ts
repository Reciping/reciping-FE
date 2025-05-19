import { authApiClient } from '../api/authApiClient'
import type { MyPageData } from '../types/mypage'

export interface ProfileEditRequest {
  nickname?: string
  password?: string
  interestKeyword?: string
  sex?: string
  age?: string
}

export const getMyPage = (page: number, size: number): Promise<MyPageData> => {
  return authApiClient
    .get<{ data: MyPageData }>(`/api/v1/mypage?page=${page}&size=${size}`)
    .then(res => res.data.data);
};

export const updateProfile = async (data: {
  nickname?: string
  password?: string
  interestKeyword?: string
  sex?: string
  age?: string
}) => {
  return authApiClient.put('/api/v1/users/me', data)
} 