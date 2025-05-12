import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import LogoTitle from '../../components/LogoTitle'
import SearchPanel from '../../components/SearchPanel'
import SearchFeedback from '../../components/SearchFeedback'
import EventBlock from '../../components/EventBlock'
import AdsBlock from '../../components/AdsBlock'
import UserRecipeList from '../../components/UserRecipeList'
import ABTestBlock from '../../components/ABTestBlock'
import NaverSearchIframe from '../../components/NaverSearchIframe'
import { CategoryFilters } from '../../components/CategoryFilter.types.ts'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchResults = () => {
  const navigate = useNavigate()
  const [searchParams]= useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  // 1) URL에서 받은 최초 쿼리
  const initialKeyword = searchParams.get('keyword') || ''

  // 2) 피드백용 상태는 최초 쿼리로만 세팅 (이후 절대 바뀌지 않음)
  const [feedbackQuery, setFeedbackQuery] = useState(initialKeyword)

  // 3) 검색창의 현재 입력값은 별도 상태로 관리
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword)

  useEffect(() => {
    setFeedbackQuery(initialKeyword)
  }, [initialKeyword])

  const [selectedMode, setSelectedMode] = useState<'category'|'ingredient'|'menu'>('menu')
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilters>({
    type:'전체', situation:'전체', ingredient:'전체', method:'전체'
  })


  // 🔍 검색 버튼 클릭 시 /search로 이동
  const handleSearch = () => {
    // 쿼리 스트링 생성
    const params = new URLSearchParams()
    params.set('keyword', searchKeyword)
    params.set('mode', selectedMode)
    if (selectedMode === 'category') {
      params.set('type', categoryFilters.type)
      params.set('situation', categoryFilters.situation)
      params.set('ingredient', categoryFilters.ingredient)
      params.set('method', categoryFilters.method)
    }

    params.set('page', '1')

    // 검색 페이지로 이동
    navigate(`/search?${params.toString()}`)
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams()
  
    params.set('keyword', searchKeyword)
    params.set('mode', selectedMode)
  
    if (selectedMode === 'category') {
      params.set('type', categoryFilters.type)
      params.set('situation', categoryFilters.situation)
      params.set('ingredient', categoryFilters.ingredient)
      params.set('method', categoryFilters.method)
    }
  
    params.set('page', page.toString()) // ✅ 현재 페이지 번호 설정
  
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="bg-[#FEEFEF] min-h-screen">
      <Navbar />
      <div className="py-8">
        <div className="max-w-[1080px] mx-auto px-4">
          <LogoTitle />

          {/* 검색 + 필터 */}
          <SearchPanel
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
            categoryFilters={categoryFilters}
            onCategoryFiltersChange={setCategoryFilters}
            onSearch={handleSearch}
          />

          {/* 검색한 쿼리 피드백 */}
          {feedbackQuery && <SearchFeedback query={feedbackQuery} />}

          {/* 광고 & 이벤트 */}
          <div className="flex gap-4 mb-6">
            <EventBlock />
            <AdsBlock />
          </div>

          {/* 회원 레시피 리스트 */}
          <UserRecipeList 
            page={currentPage} 
            goToPage={(newPage) => {
              const params = new URLSearchParams(searchParams.toString())
              params.set('page', newPage.toString())
              navigate(`/search?${params.toString()}`)
            }}
          />

          {/* A/B 테스트용 이벤트+광고 */}
          <ABTestBlock />

          {/* 네이버 검색 결과 iframe */}
          <NaverSearchIframe query={searchKeyword} />
        </div>
      </div>
    </div>
  )
}

export default SearchResults
