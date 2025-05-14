import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeCard from './RecipeCard'
import { getDefaultRecipes, Recipe } from '../../api/recipesApi'

const RecipeListSection: React.FC = () => {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      {/* 🔸 정렬 버튼 : className 템플릿 문자열 수정 */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => setSortBy('likes')}
          className={`px-3 py-1 rounded-full ${
            sortBy === 'likes' ? 'bg-[#F15A24] text-white' : 'bg-[#FDD9B5] text-[#5C2E1E]'
          }`}
        >
          추천순
        </button>
        <button
          onClick={() => setSortBy('newest')}
          className={`px-3 py-1 rounded-full ${
            sortBy === 'newest' ? 'bg-[#F15A24] text-white' : 'bg-[#FDD9B5] text-[#5C2E1E]'
          }`}
        >
          최신순
        </button>
      </div>

      {/* 로딩/에러 */}
      {loading && <p className="text-center text-gray-500">불러오는 중…</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 카드 그리드 */}
      {!loading && !error && (
        <div className="grid grid-cols-5 gap-4">
          {sorted.map(r => (
            <RecipeCard
              key={r.id}
              imageUrl={r.imageUrl}
              title={r.title}
              likeCount={r.likeCount}
              onClick={() => navigate(`/recipe/${r.id}`)} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeListSection
