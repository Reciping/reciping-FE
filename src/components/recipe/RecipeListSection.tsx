import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeCard, { RecipeCardProps } from './RecipeCard'
import { getDefaultRecipes, Recipe } from '../../api/recipesApi'

const RecipeListSection: React.FC = () => {
  const navigate = useNavigate()
  // 'likes' 또는 'newest' 중 하나
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)


  // --- 2) 마운트 시 API 호출 ---
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      setError(null)
      try {
        const list = await getDefaultRecipes()   // Promise<Recipe[]>
        setRecipes(list)                         // Recipe[] 를 상태에 저장
      } catch (e: any) {
        console.error(e)
        setError('레시피 목록을 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  // --- 3) 정렬 로직 ---
  const sorted = [...recipes].sort((a, b) =>
    sortBy === 'likes'
      ? b.likeCount - a.likeCount
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

      {/* 로딩 / 에러 */}
      {loading && <p className="text-center text-gray-500">불러오는 중…</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 카드 그리드 */}
      {!loading && !error && (
        <div className="grid grid-cols-5 gap-4">
          {sorted.map((r) => (
            <RecipeCard
              key={r.id}
              imageUrl={r.imageUrl}      // JSON의 imageUrl 사용
              title={r.title}            // JSON의 title 사용
              likes={r.likeCount}        // JSON의 likeCount 사용
              onClick={() => navigate(`/recipe/${r.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeListSection
