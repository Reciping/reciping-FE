// src/components/recipe/RecipeSwiper.tsx
import React, { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Recipe } from '../../services/recipeService'
import RecipeCard from './RecipeCard'
import nonImage from '../../assets/nonImage.jpeg'
import 'swiper/css'
import 'swiper/css/navigation'

interface Props {
  recipes: Recipe[]
  onCardClick?: (id: number) => void
}

const ITEMS_PER_PAGE = 5

const RecipeSwiper: React.FC<Props> = ({ recipes, onCardClick }) => {
  /* ───────── 정렬 상태 ───────── */
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes')

  /* 정렬된 배열  */
  const sorted = useMemo(() => {
    return [...recipes].sort((a, b) =>
      sortBy === 'likes'
        ? b.likeCount - a.likeCount
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }, [recipes, sortBy])

  /* 5개씩 페이지 분할 */
  const pages = useMemo(() => {
    const pageCount = Math.ceil(sorted.length / ITEMS_PER_PAGE)
    return Array.from({ length: pageCount }, (_, i) =>
      sorted.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE),
    )
  }, [sorted])

  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = pages.length || 1

  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      {/* ───── 상단: 정렬 버튼 + 페이지 인디케이터 ───── */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSortBy('likes')
              setCurrentPage(0)
            }}
            className={`px-3 py-1 rounded-full ${
              sortBy === 'likes'
                ? 'bg-[#F15A24] text-white'
                : 'bg-[#FDD9B5] text-[#5C2E1E]'
            }`}
          >
            추천순
          </button>
          <button
            onClick={() => {
              setSortBy('newest')
              setCurrentPage(0)
            }}
            className={`px-3 py-1 rounded-full ${
              sortBy === 'newest'
                ? 'bg-[#F15A24] text-white'
                : 'bg-[#FDD9B5] text-[#5C2E1E]'
            }`}
          >
            최신순
          </button>
        </div>
        <span className="text-sm text-gray-600">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* ───── Swiper 슬라이더 ───── */}
      <Swiper
        modules={[Navigation]}
        loop
        navigation={false}
        onSlideChange={swiper => setCurrentPage(swiper.realIndex)}
      >
        {pages.map((group, idx) => (
          <SwiperSlide key={idx}>
            {/* 5칸 그리드 + 얇은 세로 구분선 스타일 */}
            <div className="grid grid-cols-5 divide-x divide-[#F2E6DE]">
              {group.map(r => (
                <div className="px-4" key={r.id}>
                  <RecipeCard
                    imageUrl={r.imageUrl?.trim() ? r.imageUrl : nonImage}
                    title={r.title}
                    likeCount={r.likeCount}
                    onClick={() => onCardClick?.(r.id)}
                  />
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RecipeSwiper
