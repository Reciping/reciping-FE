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
import RecommendedRecipeList from '../../components/recipe/RecommendedRecipeList'

import HomeRecipeList from '../../components/recipe/HomeRecipeList'

/* === 추가: 카테고리 검색 API === */
import {
  CategorySearchRequest,
  searchRecipesByCategory,
} from '../../api/recipesApi'

import {
  getMainData,
  MainResponse,
} from '../../api/mainApi'
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
  
  const [main, setMain] = useState<MainResponse | null>(null)

  useEffect(() => {
    getMainData('MAIN_TOP', 20)
      .then(res => {
        console.log('▶ getMainData 응답', res)   // ① 파사드 응답 확인
        setMain(res)
      })
      .catch(err => console.error('메인 데이터 오류:', err))
  }, [])
  useEffect(() => {
    console.log('▶ main 상태 변화', main)        // ② state가 바뀌는지
  }, [main])

  /* 데모 인기 급상승 텍스트 ------------------------------ */
  const [popularRecipes, setPopularRecipes] = useState<string[]>([])
  useEffect(() => {
    setPopularRecipes(['김치라면', '부대찌개', '청국장', '밤타리아누', '양념갈비'])
  }, [])

  /* === 변경: 검색 버튼 === */
  const handleSearch = async () => {
    if (selectedMode === 'category') {
      try {
        const payload: CategorySearchRequest = { ...categoryFilters }
        const { content } = await searchRecipesByCategory(payload, 0, 20)
  
        // 🔁 /search/category 로 이동하면서 state에 데이터 전달
        navigate('/search/category', {
          state: { recipes: content, mode: 'category' },
        })
      } catch (e) {
        console.error(e)
        alert('카테고리 검색 중 오류가 발생했습니다.')
      }
    } else {
      const qs = new URLSearchParams()
      qs.set('keyword', searchKeyword)
      qs.set('page', '1')
      // 🔁 mode에 따라 search/menu 또는 search/ingredient 로 이동
      navigate(`/search/${selectedMode}?${qs.toString()}`, { state: { main }})
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
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            {/* 이벤트 배너 – 파사드에서 받은 첫 이미지를 사용 */}
            {main?.events[0] ? (
              <EventBlock event={main.events[0]} />
            ) : (
              <div className="h-40 rounded-2xl bg-white shadow flex items-center justify-center">
                이벤트 준비 중…
              </div>
            )}


             {/* 광고 이미지 */}
            <div className="bg-white rounded-lg flex-1 flex items-center overflow-x-auto gap-4 shadow">
              <AdsBlock ad={main?.ads?.[0] ?? null} />
            </div>
          </div>

          <HomeRecipeList />

          {/* AI 추천 블록 ───── */}
          {main && (
            <RecommendedRecipeList
              recipes={main.recommendedRecipes ?? []}
              onCardClick={id => navigate(`/recipe/${id}`)}
            />

          )}

          {/* ▼ ② 2×2 그리드 : 왼쪽=인기 급상승, 오른쪽=근래 당근 피드백 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 인기 급상승 */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold mb-2">인기 급상승 레시피 🔥</h3>
              <ol className="list-decimal pl-4 space-y-1">
                {popularRecipes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>

            {/* 근래 당근 검색 피드백 */}
            <div className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold mb-2">
                  근래 <span className="text-[#F15A24] font-semibold">당근</span>을 가장 많이 검색하셨네요!
                </h3>
                <p className="text-sm mb-4">
                  '당근'을 재료로 하는 인기 레시피를 추천해드릴게요.
                </p>
              </div>
              <button className="self-start px-4 py-2 bg-[#5C2E1E] text-white rounded-full text-xs">
                [ 당근 라떼 샌드위치 ] 확인하기 &gt;
              </button>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </PageLayout>
  )
}

export default Home
