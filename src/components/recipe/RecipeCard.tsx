import React from 'react'

export interface RecipeCardProps {
  /** 카드에 표시할 이미지 URL */
  imageUrl: string
  /** 레시피 제목 */
  title: string
  /** 좋아요(추천) 수 */
  likeCount: number

  onClick?: () => void
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  imageUrl, 
  title, 
  likeCount,
  onClick
}) => {
  return (
    <div 
      onClick = {onClick}
      className="
        cursor-pointer flex flex-col items-center 
        bg-white rounded-2xl p-4 shadow hover:shadow-lg transition
        w-full
      ">
      {/* 타원형 이미지 */}
      <img
        src={imageUrl}
        alt={title}
        className="w-24 h-24 object-cover rounded-full mb-2"
      />
      {/* 제목 */}
      <span className="text-sm font-medium mb-1 truncate w-full text-center">{title}</span>
      {/* 좋아요 아이콘 + 수 */}
      <div className="flex items-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
          />
        </svg>
        <span className="text-xs">{likeCount}</span>
      </div>
    </div>
  )
}

export default RecipeCard
