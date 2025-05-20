// src/components/recipe/HomeRecipeList.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDefaultRecipes } from '../../services/recipeService'
import { Recipe } from '../../types/recipe'
import RecipeSwiper from './RecipeSwiper'   // 👉 공통 슬라이더 로직 분리

const FETCH_SIZE = 20

const HomeRecipeList: React.FC = () => {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await getDefaultRecipes(0, FETCH_SIZE)

        if (Array.isArray(result?.content)) {
          setRecipes(result.content)
        } else {
          console.error("API response content is not an array:", result)
          setRecipes([])
          setError("레시피 데이터를 불러오는데 실패했습니다.")
        }
      } catch (e) {
        if (!cancelled) setError('레시피를 불러오는 중 오류가 발생했습니다.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  if (loading) return <p className="text-center py-12">Loading…</p>
  if (error)   return <p className="text-center text-red-500 py-12">{error}</p>

  return (
    <RecipeSwiper
      recipes={recipes}
      onCardClick={id => navigate(`/recipe/${id}`)}   // ← 추가
    />
  )
}

export default HomeRecipeList
