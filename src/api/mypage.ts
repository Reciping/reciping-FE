import { api } from './axiosInstance';
import type { MyPageData } from '../types/mypage';

/**
 * 마이페이지 조회 API 호출
 * @param page 현재 페이지 (0부터 시작)
 * @param size 한 페이지 당 아이템 수
 * @returns Promise<MyPageData>
 */


export const getMyPage = (page: number, size: number): Promise<MyPageData> => {
  return api
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
  return api.put('/api/v1/users/me', data)
}