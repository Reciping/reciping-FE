import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  // 🔽 검색 필터 상태 추가
  const [selectedFilter, setSelectedFilter] = useState<string>('')
  const handleFilterClick = (filter: string) => setSelectedFilter(filter)

  // 🔽 광고 더미 데이터 상태
  const [ads, setAds] = useState<{ imageUrl: string; link: string }[]>([])
  useEffect(() => {
    setAds([
      { imageUrl: '/ad1.png', link: 'https://example.com/1' },
      { imageUrl: '/ad2.png', link: 'https://example.com/2' },
    ])
  }, [])

  // 🔽 인기 레시피 더미
  const [popularRecipes, setPopularRecipes] = useState<string[]>([])
  useEffect(() => {
    setPopularRecipes(['김치라면', '부대찌개', '청국장', '밤타리아누', '양념갈비'])
  }, [])

  return (
    <div className="bg-[#FEEFEF] min-h-screen">
      {/* 🔶 최상단 메뉴바 */}
      <div className="bg-[#F15A24] text-white flex justify-end px-6 py-2 text-sm gap-6">
        <button>레시피 남기기</button>
        <button>이벤트 확인하기</button>
        <button>QnA</button>
        <button>Profile</button>
      </div>

      {/* 🔶 제목 및 검색 필터 */}
      <div className="flex flex-col items-center py-6">
        <h1 className="text-4xl font-bold text-[#F15A24]">
          <span className="inline-block w-4 h-4 rounded-full bg-[#F15A24] mr-2 align-middle"></span>
          reciping.
        </h1>
        <div className="text-sm mt-4">: 어떤 메뉴의 레시피가 궁금하니?</div>

        {/* 🔶 필터 버튼 */}
        <div className="flex gap-2 mt-4">
          {['category', 'ingredient', 'menu'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`rounded-full px-4 py-1 text-sm ${
                selectedFilter === filter ? 'bg-[#F15A24] text-white' : 'bg-[#FDD9B5]'
              }`}
            >
              # {filter === 'category' ? '카테고리 필터' : filter === 'ingredient' ? '재료기반 검색' : '메뉴기반 검색'}
            </button>
          ))}
        </div>

        {/* 🔶 검색창 */}
        <input
          type="text"
          placeholder="Search"
          className="mt-4 w-[300px] px-4 py-2 rounded-full bg-[#EABF9F] placeholder-white text-white"
        />
      </div>

      {/* 🔶 이벤트 및 광고 섹션 */}
      <div className="flex justify-center gap-6 px-6">
        <div className="bg-white rounded-xl p-4 w-[300px] h-[180px] flex items-center justify-center font-bold text-center text-[#7B3F00]">
          매일 자정!<br />선착순 10명 마켓컬리 상품권 증정<br />[이벤트 블럭]
        </div>

        <div className="bg-white rounded-xl p-4 w-[600px] h-[180px] flex items-center justify-center overflow-x-auto gap-4">
          {ads.map((ad, idx) => (
            <a key={idx} href={ad.link} target="_blank" rel="noopener noreferrer">
              <img src={ad.imageUrl} alt={`광고 ${idx}`} className="w-40 h-28 rounded-lg" />
            </a>
          ))}
        </div>
      </div>

      {/* 🔶 인기 레시피 및 AI 추천 */}
      <div className="flex gap-6 mt-8 px-6">
        <div className="bg-white rounded-xl p-4 w-[300px]">
          <h2 className="font-bold mb-2">인기 급상승 레시피 🔥</h2>
          <ol className="list-decimal pl-4">
            {popularRecipes.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-xl p-4 flex-1">
          <h2 className="font-bold mb-2">AI 추천 | 40대 여성이 좋아하는 reciping</h2>
          <div className="flex gap-4 overflow-x-auto">
            {['연어구이', '베트남식 밥', '고단백 정식', '탕수육'].map((label, idx) => (
              <div key={idx} className="bg-[#FFF5EC] p-3 rounded-xl w-28 text-center">{label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔶 최근 검색 및 사용자 기반 추천 */}
      <div className="flex gap-6 mt-8 px-6 pb-10">
        <div className="bg-white rounded-xl p-4 w-[300px]">
          <h2 className="font-bold mb-2">📌 근래 당근을 가장 많이 검색하셨네요!</h2>
          <p className="text-sm">*당근을 재료로 하는 인기 많은 레시피를 추천해드릴게요.</p>
          <p className="text-sm mt-2">[ 당근 라페 샌드위치 ]</p>
        </div>

        <div className="bg-white rounded-xl p-4 flex-1">
          <h2 className="font-bold mb-2">AI 추천 | 최근 일식을 자주 열람하셨네요!</h2>
          <div className="flex gap-4 overflow-x-auto">
            {['연어구이', '베트남식 밥', '고단백 정식', '탕수육'].map((label, idx) => (
              <div key={idx} className="bg-[#FFF5EC] p-3 rounded-xl w-28 text-center">{label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
