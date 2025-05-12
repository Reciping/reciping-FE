import React, { useEffect, useState } from 'react'

interface Recipe {
  id: number
  title: string
  img: string
  likes: number
}

interface UserRecipeListProps {
  page: number
}

const UserRecipeList: React.FC<UserRecipeListProps> = ({ page }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    // 더미 데이터
    setRecipes([
      { id: 1, title: '연어스테이크 소스 만들기', img: '/recipes/r1.png', likes: 6 },
      { id: 2, title: '베트남식 밥 만들기', img: '/recipes/r2.png', likes: 2 },
      { id: 3, title: '냉부해 떡볶이 레시피', img: '/recipes/r3.png', likes: 9 },
      { id: 4, title: '두부 조림', img: '/recipes/r4.png', likes: 3 },
      { id: 5, title: '버섯 크림파스타', img: '/recipes/r5.png', likes: 7 },
      { id: 6, title: '김치찌개', img: '/recipes/r6.png', likes: 4 },
    ])
  }, [])

  const perPage = 3
  const offset = (page - 1) * perPage
  const currentRecipes = recipes.slice(offset, offset + perPage)

  const totalPages = Math.ceil(recipes.length / perPage)

  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      <h3 className="font-semibold mb-4">reciping 회원이 작성한 레시피</h3>
      <ul className="space-y-3">
        {currentRecipes.map(r => (
          <li key={r.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={r.img} alt={r.title} className="w-12 h-12 rounded mr-3" />
              <span className="text-sm">{r.title}</span>
            </div>
            <div className="text-sm text-gray-500">♥ {r.likes}</div>
          </li>
        ))}
      </ul>

      {/* 페이지 네비게이션 */}
      <div className="mt-4 flex justify-center items-center gap-4 text-sm text-gray-600">
        <span>
          {page} / {totalPages}
        </span>
      </div>
    </div>
  )
}

export default UserRecipeList
