// src/components/recipe/SearchRecipeList.tsx
import React from 'react'
import { Recipe } from '../../types/recipe'
import RecipeSwiper from './RecipeSwiper'

interface Props {
  recipes: Recipe[]
  onCardClick?: (id: number) => void
}

const SearchRecipeList: React.FC<Props> = ({ recipes, onCardClick }) => {
  if (recipes.length === 0)
    return (
      <p className="text-center text-gray-500 py-12">
        조건에 맞는 레시피가 없습니다.
      </p>
    )

  return <RecipeSwiper recipes={recipes} onCardClick={onCardClick} />
}

export default SearchRecipeList
