import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeCard from './RecipeCard'
import { getDefaultRecipes, Recipe } from '../../api/recipesApi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const ITEMS_PER_PAGE = 5

const RecipeListSection: React.FC = () => {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const list = await getDefaultRecipes()
        setRecipes(list)
      } catch (e) {
        console.error(e)
        setError('레시피를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const sorted = [...recipes].sort((a, b) =>
    sortBy === 'likes'
      ? b.likeCount - a.likeCount
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const chunked = Array.from({ length: Math.ceil(sorted.length / ITEMS_PER_PAGE) }, (_, i) =>
    sorted.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
  )

  const totalPages = chunked.length

  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      {/* 정렬 버튼 + 페이지 표시 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSortBy('likes')
              setCurrentPage(1)
            }}
            className={`px-3 py-1 rounded-full ${
              sortBy === 'likes' ? 'bg-[#F15A24] text-white' : 'bg-[#FDD9B5] text-[#5C2E1E]'
            }`}
          >
            추천순
          </button>
          <button
            onClick={() => {
              setSortBy('newest')
              setCurrentPage(1)
            }}
            className={`px-3 py-1 rounded-full ${
              sortBy === 'newest' ? 'bg-[#F15A24] text-white' : 'bg-[#FDD9B5] text-[#5C2E1E]'
            }`}
          >
            최신순
          </button>
        </div>

        <span className="text-sm text-gray-600">
          {currentPage} / {totalPages}
        </span>
      </div>

      {/* 로딩/에러 */}
      {loading && <p className="text-center text-gray-500">불러오는 중…</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 슬라이드: 5개씩 묶인 그룹 */}
      {!loading && !error && (
        <Swiper
          navigation
          modules={[Navigation]}
          onSlideChange={(swiper) => setCurrentPage(swiper.activeIndex + 1)}
        >
          {chunked.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-5 gap-4">
                {group.map(r => (
                  <RecipeCard
                    key={r.id}
                    imageUrl={r.imageUrl}
                    title={r.title}
                    likeCount={r.likeCount}
                    onClick={() => navigate(`/recipe/${r.id}`)}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default RecipeListSection