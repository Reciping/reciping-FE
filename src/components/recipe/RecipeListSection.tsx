import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDefaultRecipes, Recipe } from '../../api/recipesApi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import RecipeCard from './RecipeCard'
import nonImage from '../../assets/nonImage.jpeg'

const ITEMS_PER_PAGE = 5
const FETCH_SIZE = 20

/* === 변경: 외부 결과·클릭 핸들러 주입 ================= */
interface Props {
  initialRecipes?: Recipe[]
  onCardClick?: (id: number) => void
}
/* ==================================================== */

const RecipeListSection: React.FC<Props> = ({
  initialRecipes = [],
  onCardClick,
}) => {
  const navigate = useNavigate()
  const swiperRef = useRef<any>(null)

  const [allRecipes, setAllRecipes] = useState<Recipe[]>(initialRecipes)
  const [loading, setLoading] = useState(initialRecipes.length === 0)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes')
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    if (initialRecipes.length) return           // Search 페이지에서는 fetch 생략
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getDefaultRecipes(0, FETCH_SIZE)
        setAllRecipes(res.content)
      } catch (e) {
        console.error(e)
        setError('레시피를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    })()
  }, [initialRecipes])

  const sorted = useMemo(
    () =>
      [...allRecipes].sort((a, b) =>
        sortBy === 'likes'
          ? b.likeCount - a.likeCount
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [allRecipes, sortBy],
  )

  const pages = useMemo(() => {
    const pageCount = Math.ceil(sorted.length / ITEMS_PER_PAGE)
    return Array.from({ length: pageCount }, (_, i) =>
      sorted.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE),
    )
  }, [sorted])

  const totalPages = pages.length

  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      {/* 상단: 정렬 버튼 & 페이지 인디케이터 */}
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
          {currentPage + 1} / {totalPages || 1}
        </span>
      </div>

      {!loading && !error && pages.length > 0 && (
        <Swiper
          modules={[Navigation]}
          loop
          onSwiper={swiper => {
            swiperRef.current = swiper
          }}
          onSlideChange={swiper => {
            setCurrentPage(swiper.realIndex)
          }}
        >
          {pages.map((group, idx) => (
            <SwiperSlide key={idx}>
              <div className="grid grid-cols-5 gap-4">
                {group.map(r => (
                  <RecipeCard
                    key={r.id}
                    imageUrl={r.imageUrl?.trim() ? r.imageUrl : nonImage}
                    title={r.title}
                    likeCount={r.likeCount}
                    onClick={() =>
                      onCardClick
                        ? onCardClick(r.id)
                        : navigate(`/recipe/${r.id}`)
                    }
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {loading && <p className="text-center py-8">Loading…</p>}
      {error && <p className="text-center text-red-500 py-8">{error}</p>}
    </div>
  )
}

export default RecipeListSection
