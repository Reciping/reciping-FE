import React, { useState } from 'react'
import RecipeCard, { RecipeCardProps } from './RecipeCard'

/** 더미 레시피 5개 */
const DUMMY_RECIPES: RecipeCardProps[] = [
  { imageUrl: '/recipes/1.png', title: '연어구이', likes: 12 },
  { imageUrl: '/recipes/2.png', title: '베트남식 밥', likes: 8 },
  { imageUrl: '/recipes/3.png', title: '꼬마 정식', likes: 5 },
  { imageUrl: '/recipes/4.png', title: '탕수육', likes: 15 },
  { imageUrl: '/recipes/5.png', title: '파스타', likes: 7 },
]

const RecipeListSection: React.FC = () => {
  // 'likes' 또는 'newest' 중 하나
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes')

  // 정렬 로직 (더미이므로, newest는 그냥 원본 순서를 뒤집었습니다)
  const sorted = [...DUMMY_RECIPES].sort((a, b) =>
    sortBy === 'likes'
      ? b.likes - a.likes
      : DUMMY_RECIPES.indexOf(b) - DUMMY_RECIPES.indexOf(a)
  )

  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      {/* 정렬 버튼 */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => setSortBy('likes')}
          className={`px-3 py-1 rounded-full ${
            sortBy === 'likes'
              ? 'bg-[#F15A24] text-white'
              : 'bg-[#FDD9B5] text-[#5C2E1E]'
          }`}
        >
          추천순
        </button>
        <button
          onClick={() => setSortBy('newest')}
          className={`px-3 py-1 rounded-full ${
            sortBy === 'newest'
              ? 'bg-[#F15A24] text-white'
              : 'bg-[#FDD9B5] text-[#5C2E1E]'
          }`}
        >
          최신순
        </button>
      </div>

      {/* 카드 그리드: 5개를 5열로 */}
      <div className="grid grid-cols-5 gap-4">
        {sorted.map((r, idx) => (
          <RecipeCard
            key={idx}
            imageUrl={r.imageUrl}
            title={r.title}
            likes={r.likes}
          />
        ))}
      </div>
    </div>
  )
}

export default RecipeListSection
