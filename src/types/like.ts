/** /api/v1/likes POST 응답 */
export interface LikeResponseDto {
    id: string           // PK (uuid 등)
    userId: number
    recipeId: number
    createdAt: string    // ISO-8601
  }
  
  /** 레시피 1개 좋아요 현황 */
  export interface RecipeLikeStatusResponseDto {
    recipeId: number
    likeCount: number
    isLiked: boolean
  }
  
  /** 레시피 N개 좋아요 현황 목록 */
  export interface RecipeLikeStatusListResponseDto {
    data: RecipeLikeStatusResponseDto[]
  }
  
  /* 선택: 요청 DTO도 필요하면 같이 정의 */
  export interface LikeRequestDto {
    userId: number
    recipeId: number
  }
  