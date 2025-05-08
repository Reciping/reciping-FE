import React from 'react'

interface RecipeCardProps {
  label: string
}

const RecipeCard = ({ label }: RecipeCardProps) => {
  return (
    <div className="bg-[#FFF5EC] p-3 rounded-xl w-28 text-center shrink-0">
      {label}
    </div>
  )
}

export default RecipeCard
