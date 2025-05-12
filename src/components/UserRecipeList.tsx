import React, { useEffect, useState } from 'react'

interface Recipe {
  id: number
  title: string
  image_url: string
  like: number
  created_at: string
}

interface UserRecipeListProps {
  page: number
  goToPage: (page: number) => void
}

const UserRecipeList = ({ page, goToPage } : UserRecipeListProps ) => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [total, setTotal] = useState(2)
  const [limit, setLimit] = useState(1) //기본값, 실제는 API에서 받아옴

  useEffect(() => {
    // 더미 데이터
    setRecipes([
      { id: 1, title: '연어스테이크 소스 만들기', image_url: '/recipes/r1.png', like: 6, created_at: '2025-01-01' },
      { id: 2, title: '베트남식 밥 만들기', image_url: '/recipes/r2.png', like: 2, created_at: '2025-01-02' },
      { id: 3, title: '냉부해 떡볶이 레시피', image_url: '/recipes/r3.png', like: 9, created_at: '2025-01-03' },
      { id: 4, title: '두부 조림', image_url: '/recipes/r4.png', like: 3, created_at: '2025-01-04' },
      { id: 5, title: '버섯 크림파스타', image_url: '/recipes/r5.png', like: 7, created_at: '2025-01-05' },
      { id: 6, title: '김치찌개', image_url: '/recipes/r6.png', like: 4, created_at: '2025-01-06' },
    ])
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`https://api.example.com/recipes?page=${page}`)
  //       const data = await res.json()

  //       setRecipes(data.recipes)
  //       setTotal(data.total)
  //       setLimit(data.limit)
  //     } catch (error) {
  //       console.error('레시피 불러오기 실패:', error)
  //     }
  //   }

  //   fetchData()
  // }, [page])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-white p-6 rounded-lg mb-6 shadow">
      <h3 className="font-semibold mb-4">reciping 회원이 작성한 레시피</h3>
      
      <ul className="space-y-3">
        {recipes.map((r) => (
          <li key={r.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={r.image_url} alt={r.title} className="w-12 h-12 rounded mr-3" />
              <span className="text-sm">{r.title}</span>
            </div>
            <div className="text-sm text-gray-500">♥ {r.like}</div>
          </li>
        ))}
      </ul>
  
      {/* ✅ 네비게이션 버튼을 흰 박스 안에 위치 */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-[#FDD9B5] rounded-full text-[#5C2E1E] disabled:opacity-40"
        >
          이전
        </button>
        <span className="text-sm text-gray-600"> {page} / {totalPages} </span>
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
