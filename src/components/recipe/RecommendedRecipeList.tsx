// src/components/recipe/RecommendedRecipeList.tsx
import React from 'react'
import { Recipe } from '../../types/recipe'
import RecipeSwiper from './RecipeSwiper'

interface Props {
  recipes?: Recipe[]
  onCardClick: (id: number) => void
}

const RecommendedRecipeList: React.FC<Props> = ({ 
  recipes=[], 
  onCardClick 
}) => {
  if (recipes.length === 0)
    return (
      <p className="text-center text-gray-500 py-12">
        추천 레시피가 없습니다.
      </p>
    )
  return <RecipeSwiper recipes={recipes} onCardClick={onCardClick} />
}

export default RecommendedRecipeList
