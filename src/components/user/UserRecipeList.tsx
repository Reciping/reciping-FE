import React, { useEffect, useState } from 'react'
import { Recipe } from '../../services/recipeService' // ✨ 변경: Recipe 타입 import

interface UserRecipeListProps {
  recipes: Recipe[]          // ✨ 변경: props로 넘어오는 recipes
  page: number
  total: number
  limit: number
  goToPage: (page: number) => void
}

const UserRecipeList: React.FC<UserRecipeListProps> = ({
  recipes,
  page,
  total,
  limit,
  goToPage
}) => {
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-white p-6 rounded-lg mb-6 shadow">
      <h3 className="font-semibold mb-4">reciping 회원이 작성한 레시피</h3>

      <ul className="space-y-3">
        {recipes.map(r => (
          <li key={r.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={r.imageUrl}
                alt={r.title}
                className="w-12 h-12 rounded mr-3"
              />
              <span className="text-sm">{r.title}</span>
            </div>
            <div className="text-sm text-gray-500">♥ {r.liked}</div>
          </li>
        ))}
      </ul>

      {/* ✨ 변경: 카드 내부에 네비게이션 버튼 */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-[#FDD9B5] rounded-full text-[#5C2E1E] disabled:opacity-40"
        >
          이전
        </button>
        <span className="text-sm text-gray-600">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-[#FDD9B5] rounded-full text-[#5C2E1E] disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  )
}

export default UserRecipeList
