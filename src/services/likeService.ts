
import { likeApiClient } from '../api/likeApiClient'

import type {
  LikeRequestDto,
  LikeResponseDto,
  RecipeLikeStatusResponseDto,
  RecipeLikeStatusListResponseDto,
} from '../types/like' 

/** DELETE 메서드에서 body 전송이 필요할 때의 헬퍼 */
const deleteWithBody = <TReq, TRes>(
    url: string,
    body: TReq,
  ) => likeApiClient.delete<unknown, TRes>(url, { data: body })

/**
 * 좋아요 생성
 * @returns 방금 생성된 Like row 정보
 * POST /api/v1/likes
 */
export const createLike = async (
    userId: number,
    recipeId: number,
  ): Promise<LikeResponseDto> => {
    const payload: LikeRequestDto = { userId, recipeId }
    const { data } = await likeApiClient.post<LikeResponseDto>(
      '/api/v1/likes',
      payload,
    )
    return data
  }
  
  /**
   * 좋아요 취소
   * DELETE /api/v1/likes
   */
  export const removeLike = async (
    userId: number,
    recipeId: number,
  ): Promise<void> => {
    const payload: LikeRequestDto = { userId, recipeId }
    await deleteWithBody<LikeRequestDto, void>('/api/v1/likes', payload)
  }
  
  /**
   * 단일 레시피 좋아요 현황 조회
   * GET /api/v1/likes/recipe/{recipeId}/status?userId=xxx
   *
   * @returns { likeCount, isLiked, recipeId }
   */
  export const getRecipeLikeStatus = async (
    userId: number,
    recipeId: number,
  ): Promise<RecipeLikeStatusResponseDto> => {
    const { data } = await likeApiClient.get<RecipeLikeStatusResponseDto>(
      `/api/v1/likes/recipe/${recipeId}/status`,
      { params: { userId } },
    )
    return data
  }
  
  /**
   * 여러 레시피 좋아요 현황 일괄 조회
   * POST /api/v1/likes/recipe/status-list
   *
   * @returns [{ recipeId, likeCount, isLiked }, ...]
   */
  export const getRecipeLikeStatusList = async (
    userId: number,
    recipeIds: number[],
  ): Promise<RecipeLikeStatusResponseDto[]> => {
    const payload = {
      userId,
      recipeIdList: recipeIds,
    }
    const { data } = await likeApiClient.post<RecipeLikeStatusListResponseDto>(
      '/api/v1/likes/recipe/status-list',
      payload,
    )
    return data.data
  }
  
  /**
   * (옵션) 로그인한 사용자가 눌러둔 모든 좋아요 목록 조회
   * GET /api/v1/likes?userId=xxx
   */
  export const getUserLikes = async (
    userId: number,
  ): Promise<LikeResponseDto[]> => {
    const { data } = await likeApiClient.get<LikeResponseDto[]>('/api/v1/likes', {
      params: { userId },
    })
    return data
  }
  
  /**
   * (옵션) 관리자용: likeId 기준 삭제
   * DELETE /api/v1/likes/{likeId}
   */
  export const adminDeleteLikeById = async (likeId: string): Promise<void> => {
    await likeApiClient.delete(`/api/v1/likes/${likeId}`)
  }