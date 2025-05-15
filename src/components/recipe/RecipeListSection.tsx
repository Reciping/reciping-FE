// src/components/recipe/RecipeListSection.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeCard from './RecipeCard'
import { DefaultRecipesResponse, getDefaultRecipes, Recipe } from '../../api/recipesApi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import nonImage from '../../assets/nonImage.jpeg'

const ITEMS_PER_PAGE = 5
const FETCH_SIZE = 20  // 최대 20개만 가져옴

const RecipeListSection: React.FC = () => {
  const navigate = useNavigate()
  const swiperRef = useRef<any>(null)                // Swiper 인스턴스 저장용

  // * 전체 레시피(최대 20개)
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // * 정렬 기준
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes')

  // Swiper 현재 페이지(0-based)
  const [currentPage, setCurrentPage] = useState(0)

  // 1) 마운트 시 최초 20개 불러오기
  useEffect(() => {
    (async () => {
      setLoading(true)
      setError(null)
      try {
        const pageData: DefaultRecipesResponse = 
          await getDefaultRecipes(0, FETCH_SIZE)
        setAllRecipes(pageData.content)
      } catch (e) {
        console.error(e)
        setError('레시피를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // 2) 정렬된 레시피 목록
  const sorted = useMemo(() => {
    return [...allRecipes].sort((a, b) =>
      sortBy === 'likes'
        ? b.likeCount - a.likeCount
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [allRecipes, sortBy])

  // 3) 5개씩 묶은 페이지 배열
  const pages = useMemo(() => {
    const pageCount = Math.ceil(sorted.length / ITEMS_PER_PAGE)
    return Array.from({ length: pageCount }, (_, i) =>
      sorted.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
    )
  }, [sorted])

  const totalPages = pages.length

  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      {/* ───────── 정렬 + 페이지 인디케이터 ───────── */}
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

      {/* ───────── Swiper ───────── */}
      {!loading && !error && pages.length > 0 && (
          <Swiper
            modules={[Navigation]}
            navigation={false}               // 기본 화살표 끄기
            loop                              // 무한 루프
            onSwiper={swiper => { swiperRef.current = swiper }}
            onSlideChange={swiper => {
              setCurrentPage(swiper.realIndex)
            }}
          >
            {pages.map((group, idx) => (
              <SwiperSlide key={idx}>
                <div className="grid grid-cols-5 gap-4">
                  {group.map(r => {
                    const img = r.imageUrl?.trim() ? r.imageUrl : nonImage
                    return (
                      <RecipeCard
                        key={r.id}
                        imageUrl={img}
                        title={r.title}
                        likeCount={r.likeCount}
                        onClick={() => navigate(`/recipe/${r.id}`)}
                      />
                    )
                  })}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
      )}
    </div>
  )
}

export default RecipeListSection