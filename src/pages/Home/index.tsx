import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import LogoTitle from '../../components/LogoTitle'
import SearchPanel from '../../components/SearchPanel'
import RecipeCard from '../../components/RecipeCard'
import Footer from '../../components/Footer'
import { CategoryFilters } from '../../components/CategoryFilter.types.ts'

const Home = () => {
  const [selectedMode, setSelectedMode] = useState<'category'|'ingredient'|'menu'>('menu')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilters>({
    type: '전체',
    situation: '전체',
    ingredient: '전체',
    method: '전체'
  })
  const [ads, setAds] = useState<string[]>([])
  const [popularRecipes, setPopularRecipes] = useState<string[]>([])

  // 🔹 더미 데이터
  useEffect(() => { setAds(['/ads/ad1.png','/ads/ad2.png','/ads/ad3.png']) }, [])
  useEffect(() => { setPopularRecipes(['김치라면','부대찌개','청국장','밤타리아누','양념갈비']) }, [])

  // 🔹 검색 호출
  const handleSearch = () => {
    const query = {
      keyword: searchKeyword,
      mode: selectedMode,
      ...categoryFilters
    }
    console.log('검색 요청:', query)
    // TODO: API 호출 or 페이지 이동
  }


  return (
    <div className="bg-[#FEEFEF] min-h-screen">
      <Navbar />
      <div className="py-8">
        <Container>
          {/* 로고 타이틀 */}
          <LogoTitle />

          {/* ② 검색·필터 패널 */}
          <SearchPanel
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
            categoryFilters={categoryFilters}
            onCategoryFiltersChange={setCategoryFilters}
            onSearch={handleSearch}
          />

          {/* 광고 + 이벤트 */}
          <div className="flex gap-4 mb-6">
            {/* 이벤트 영역 */}
            <div className="bg-white p-4 rounded-lg flex-1 text-sm font-semibold text-[#5C2E1E]">
              <p className="mb-2">매일 자정!<br />선착순 10명!<br />마켓컬리 상품권 증정</p>
              <button className="text-xs underline">확인하기 &gt;</button>
            </div>

            {/* 광고 영역 */}
            <div className="bg-white p-4 rounded-lg flex-1 flex items-center overflow-x-auto gap-4">
              {ads.length === 0 ? (
                <p>광고를 불러오는 중...</p>
              ) : (
                ads.map((src, idx) => (
                  <img key={idx} src={src} alt={`ad-${idx}`} className="h-24 rounded" />
                ))
              )}
            </div>
          </div>

          {/* 인기 레시피 */}
          <div className="bg-white p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">인기 급상승 레시피 🔥</h3>
            <ol className="list-decimal pl-4">
              {popularRecipes.map((recipe, idx) => (
                <li key={idx}>{recipe}</li>
              ))}
            </ol>
          </div>

          {/* AI 추천 섹션 */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* 왼쪽 - 재료기반 추천 */}
            <div className="bg-white p-4 rounded-lg flex-1">
              <h3 className="font-bold mb-2">
                AI 추천 <span className="text-sm font-normal">| 최근 검색한 재료 기반</span>
              </h3>
              <p className="text-sm mb-2">
                최근 <span className="text-[#F15A24] font-semibold">당근</span>을 재료로 검색하셨네요!<br />
                유사 재료를 활용한 레시피를 추천해드릴게요.
              </p>
              <div className="flex gap-4 mt-2">
                {['당근 라페 샌드위치', '당근 볶음밥', '당근 주스'].map((item, idx) => (
                  <RecipeCard key={idx} label={item} />
                ))}
              </div>
            </div>

            {/* 오른쪽 - 카테고리 기반 추천 */}
            <div className="bg-white p-4 rounded-lg flex-1">
              <h3 className="font-bold mb-2">
                AI 추천 <span className="text-sm font-normal">| 자주 열람한 카테고리 기반</span>
              </h3>
              <p className="text-sm mb-2">
                최근 <span className="text-[#F15A24] font-semibold">일식</span>을 자주 열람하셨네요!<br />
                다른 유저들도 선호한 <span className="font-semibold">일식 레시피</span>를 추천해드릴게요 :-)
              </p>
              <div className="flex gap-4 mt-2">
                {['가츠동', '연어덮밥', '규동'].map((item, idx) => (
                  <RecipeCard key={idx} label={item} />
                ))}
              </div>
            </div>

          </div>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default Home
