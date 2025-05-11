import React, { useEffect, useState } from 'react'

interface Recipe {
  id: number
  title: string
  img: string
  likes: number
}

const UserRecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    // 더미 데이터
    setRecipes([
      { id:1, title:'연어스테이크 소스 만들기', img:'/recipes/r1.png', likes:6 },
      { id:2, title:'베트남식 밥 만들기',    img:'/recipes/r2.png', likes:2 },
      { id:3, title:'냉부해 떡볶이 레시피', img:'/recipes/r3.png', likes:9 },
    ])
  }, [])

  return (
    <div className="bg-white p-4 rounded-lg mb-6 shadow">
      <h3 className="font-semibold mb-4">reciping 회원이 작성한 레시피</h3>
      <ul className="space-y-3">
        {recipes.map(r => (
          <li key={r.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={r.img} alt={r.title} className="w-12 h-12 rounded mr-3" />
              <span className="text-sm">{r.title}</span>
            </div>
            <div className="text-sm text-gray-500">♥ {r.likes}</div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center text-xs text-gray-400">{'< 1 / 3 >'}</div>
    </div>
  )
}

export default UserRecipeList
