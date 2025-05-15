import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/layout/Navbar'
import Container from '../../components/common/Container'
import LogoTitle from '../../components/common/LogoTitle'
import SearchPanel from '../../components/search/SearchPanel'
import RecipeCard from '../../components/recipe/RecipeCard'
import Footer from '../../components/common/Footer'
import RecipeListSection from '../../components/recipe/RecipeListSection'
import { CategoryFilters } from '../../components/category/CategoryFilter.types'
import AdsBlock from '../../components/ads/AdsBlock'


const Home = () => {
  const navigate = useNavigate()

  const [selectedMode, setSelectedMode] = useState<'category'|'ingredient'|'menu'>('menu')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilters>({
    dish: '전체',
    situation: '전체',
    ingredient: '전체',
    method: '전체',
    cookingTime: '전체',
    difficulty: '전체'
  })

  const [ads, setAds] = useState<string[]>([])
  const [popularRecipes, setPopularRecipes] = useState<string[]>([])

  // 🔹 더미 데이터
  // useEffect(() => { setAds(['/ads/ad1.png','/ads/ad2.png','/ads/ad3.png']) }, [])
  useEffect(() => { setPopularRecipes(['김치라면','부대찌개','청국장','밤타리아누','양념갈비']) }, [])

  // 🔍 검색 버튼 클릭 시 /search로 이동
  const handleSearch = () => {
    // 쿼리 스트링 생성
    const params = new URLSearchParams()
    params.set('keyword', searchKeyword)
    params.set('mode', selectedMode)
    if (selectedMode === 'category') {
      params.set('type', categoryFilters.dish)
      params.set('situation', categoryFilters.situation)
      params.set('ingredient', categoryFilters.ingredient)
      params.set('method', categoryFilters.method)
    }

    params.set('page', '1')

    // 검색 페이지로 이동
    navigate(`/search?${params.toString()}`)
  }

  return (
    <PageLayout>
      <Navbar />

      <div className="py-8">
        <Container>
          {/* 1) 로고 + 검색패널 */}
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

          {/* 2) 이벤트 & 광고 */}
          <div className="flex gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg flex-1 text-sm font-semibold text-[#5C2E1E] shadow">
              <p className="mb-2">
                매일 자정!<br/>
                선착순 10명!<br/>
                마켓컬리 상품권 증정
              </p>
              <button className="text-xs underline">확인하기 &gt;</button>
            </div>
            <div className="bg-white p-4 rounded-lg flex-1 flex items-center overflow-x-auto gap-4 shadow">
              <AdsBlock />
            </div>
          </div>

          <RecipeListSection></RecipeListSection>

          {/* 4) 2×2 블록: 인기급상승 / AI(재료기반) */}
          <div className = "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 인기 급상승 레시피 */}
            <div className = "bg-white p-4 rounded-lg shadow">
              <h3 className = "font-bold mb-2"> 인기 급상승 레시피 🔥</h3>
              <ol className = "list-decimal pl-4">
                {popularRecipes.map((recipe, idx) => (
                  <li key={idx}>{recipe}</li>
                ))}
              </ol>
            </div>

            {/* AI 추천 | 최근 재료기반 */}
            <div className = "bg-white p-4 rounded-lg shadow">
              <h3 className = "font-bold mb-2">
                AI 추천 <span className = "text-sm font-normal">| 최근 검색한 재료 기반</span>
              </h3>
              <p className="text-sm mb-2">
                최근 <span className="text-[#F15A24] font-semibold">당근</span>을 재료로 검색하셨어요!<br/>
                유사 재료를 활용한 레시피를 추천해드릴게요.
              </p>
              
            </div>
          </div>
          
          {/* 5) 2x2 블록: 최근 검색 피드백 / AI (카테고리기반) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/*최근 검색 피드백 */}
            <div className = "bg-white p-4 rounded-lg shadow">
              <h3 className = "font-bold mb-2">
                근래 <span className = "text-[#F15A24] font-semibold">당근</span>을 가장 많이 검색하셨네요!
              </h3>
              <p className="text-sm mb-2">
                '당근'을 재료로 하는 인기 레시피를 추천해드릴게요.
              </p>
              <button className="mt-2 text-xs px-3 py-1 bg-[#5C2E1E] text-white rounded">[ 당근 라떼 샌드위치 ] 확인하기 &gt;</button>
            </div>
            
            { /* AI 추천 | 자주 열람한 카테고리기반 */}
            <div className="bg-white p-4 rounded-lg flex-1 shadow">
              <h3 className="font-bold mb-2">
                AI 추천 <span className="text-sm font-normal">| 자주 열람한 카테고리 기반</span>
              </h3>
              <p className="text-sm mb-2">
                최근 <span className="text-[#F15A24] font-semibold">일식</span>을 자주 열람하셨네요!<br/>
                다른 유저들도 선호한 <span className="font-semibold">일식 레시피</span>를 추천해드릴게요 :-)
              </p>
              <div className="flex gap-4 mt-2">
              </div>
            </div>
          </div>

        </Container>
      </div>
      <Footer />
    </PageLayout>
  )
}


export default Home
