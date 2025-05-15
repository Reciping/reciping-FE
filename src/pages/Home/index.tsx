import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/layout/Navbar'
import Container from '../../components/common/Container'
import EventBlock from '../../components/event/EventBlock'
import LogoTitle from '../../components/common/LogoTitle'
import SearchPanel from '../../components/search/SearchPanel'
import AdsBlock from '../../components/ads/AdsBlock'
import Footer from '../../components/common/Footer'

import HomeRecipeList from '../../components/recipe/HomeRecipeList'

/* === 추가: 카테고리 검색 API === */
import {
  CategorySearchRequest,
  searchRecipesByCategory,
} from '../../api/recipesApi'
/* ================================= */

const Home = () => {
  const navigate = useNavigate()

  const [selectedMode, setSelectedMode] =
    useState<'category' | 'ingredient' | 'menu'>('menu')
  const [searchKeyword, setSearchKeyword] = useState('')

  // 카테고리 필터 (초기값 '전체')
  const [categoryFilters, setCategoryFilters] = useState({
    dishType: '전체',
    situationType: '전체',
    ingredientType: '전체',
    methodType: '전체',
    cookingTime: '전체',
    difficulty: '전체',
  })

  /* dummy */
  const [popularRecipes, setPopularRecipes] = useState<string[]>([])
  useEffect(() => {
    setPopularRecipes(['김치라면', '부대찌개', '청국장', '밤타리아누', '양념갈비'])
  }, [])

  /* === 변경: 검색 버튼 === */
  const handleSearch = async () => {
    // 메뉴/재료 모드 → 기존 쿼리스트링 검색
    if (selectedMode !== 'category') {
      const qs = new URLSearchParams()
      qs.set('keyword', searchKeyword)
      qs.set('mode', selectedMode)
      qs.set('page', '1')
      navigate(`/search?${qs.toString()}`)
      return
    }

    // 카테고리 모드 → POST /search/category
    try {
      const payload: CategorySearchRequest = { ...categoryFilters }
      const { content } = await searchRecipesByCategory(payload, 0, 20)

      // /search 로 결과 배열을 state 로 넘김
      navigate('/search', 
        { state: { recipes: content, mode: 'category' }
      })
    } catch (e) {
      console.error(e)
      alert('카테고리 검색 중 오류가 발생했습니다.')
    }
  }
  /* ================================= */

  return (
    <PageLayout>
      <Navbar />

      <div className="py-8">
        <Container>
          <LogoTitle />

          <SearchPanel
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
            categoryFilters={categoryFilters}
            onCategoryFiltersChange={setCategoryFilters}
            onSearch={handleSearch}
          />

          {/* 광고 & 기본 레시피 리스트 */}
          <div className="flex gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg flex-1 text-sm font-semibold text-[#5C2E1E] shadow">
              <p className="mb-2">
                매일 자정!<br />
                선착순 10명!<br />
                마켓컬리 상품권 증정
              </p>
              <button className="text-xs underline">확인하기 &gt;</button>
            </div>
            <div className="bg-white p-4 rounded-lg flex-1 flex items-center overflow-x-auto gap-4 shadow">
              <AdsBlock />
            </div>
          </div>

          <HomeRecipeList />
          {/* ───── 인기 급상승 & AI 추천 블록 ───── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 인기 급상승 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">인기 급상승 레시피 🔥</h3>
              <ol className="list-decimal pl-4">
                {popularRecipes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>

            {/* AI 추천 (재료 기반) */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">
                AI 추천 <span className="text-sm font-normal">| 최근 검색한 재료 기반</span>
              </h3>
              <p className="text-sm">
                최근 <span className="text-[#F15A24] font-semibold">당근</span>을 재료로
                검색하셨어요!<br />
                유사 재료를 활용한 레시피를 추천해드릴게요.
              </p>
            </div>
          </div>

          {/* ───── 최근 검색 · AI(카테고리 기반) ───── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 최근 검색 피드백 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">
                근래 <span className="text-[#F15A24] font-semibold">당근</span>을 가장 많이
                검색하셨네요!
              </h3>
              <p className="text-sm mb-2">
                '당근'을 재료로 하는 인기 레시피를 추천해드릴게요.
              </p>
              <button className="mt-2 text-xs px-3 py-1 bg-[#5C2E1E] text-white rounded">
                [ 당근 라떼 샌드위치 ] 확인하기 &gt;
              </button>
            </div>

            {/* AI 추천 (카테고리 기반) */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">
                AI 추천 <span className="text-sm font-normal">| 자주 열람한 카테고리 기반</span>
              </h3>
              <p className="text-sm">
                최근 <span className="text-[#F15A24] font-semibold">일식</span>을 자주
                열람하셨네요!<br />
                다른 유저들도 선호한 <span className="font-semibold">일식 레시피</span>를
                추천해드릴게요 :-)
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </PageLayout>
  )
}

export default Home
