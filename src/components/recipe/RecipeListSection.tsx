import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeCard from './RecipeCard'
import { getDefaultRecipes, Recipe } from '../../api/recipesApi'

const ITEMS_PER_PAGE = 5

const RecipeListSection: React.FC = () => {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  /** 🔸 마운트 시 한번만 호출 */
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

  /** 정렬 */
  const sorted = [...recipes].sort((a, b) =>
    sortBy === 'likes'
      ? b.likeCount - a.likeCount
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const currentItems = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1)
  }
  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      {/* 정렬 버튼 + 페이지 정보 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSortBy('likes')
              setPage(1)
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
              setPage(1)
            }}
            className={`px-3 py-1 rounded-full ${
              sortBy === 'newest' ? 'bg-[#F15A24] text-white' : 'bg-[#FDD9B5] text-[#5C2E1E]'
            }`}
          >
            최신순
          </button>
        </div>

        {/* 페이지 표시 */}
        <div className="text-sm text-gray-600">
          {page} / {totalPages}
        </div>
      </div>

      {/* 로딩/에러 */}
      {loading && <p className="text-center text-gray-500">불러오는 중…</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 카드 목록 */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-5 gap-4">
            {currentItems.map(r => (
              <RecipeCard
                key={r.id}
                imageUrl={r.imageUrl}
                title={r.title}
                likeCount={r.likeCount}
                onClick={() => navigate(`/recipe/${r.id}`)} 
              />
            ))}
          </div>

          {/* 페이지네이션 버튼 */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default RecipeListSection
