import React, { useState } from 'react'
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

const SearchResults = () => {
  const [mode, setMode] = useState<'category'|'ingredient'|'menu'>('menu')
  const [keyword, setKeyword] = useState('')
  const [catFilters, setCatFilters] = useState<CategoryFilters>({
    type:'전체', situation:'전체', ingredient:'전체', method:'전체'
  })

  const handleSearch = () => {
    // 1) API 호출, 2) 상태 변경 등
    console.log({ keyword, mode, ...catFilters })
  }

  return (
    <div className="bg-[#FEEFEF] min-h-screen">
      <Navbar />
      <div className="py-8">
        <div className="max-w-[1080px] mx-auto px-4">
          <LogoTitle />

          {/* 검색 + 필터 */}
          <SearchPanel
            selectedMode={mode}
            onModeChange={setMode}
            searchKeyword={keyword}
            onSearchKeywordChange={setKeyword}
            categoryFilters={catFilters}
            onCategoryFiltersChange={setCatFilters}
            onSearch={handleSearch}
          />

          {/* 검색한 쿼리 피드백 */}
          {keyword && <SearchFeedback query={keyword} />}

          {/* 광고 & 이벤트 */}
          <div className="flex gap-4 mb-6">
            <EventBlock />
            <AdsBlock />
          </div>

          {/* 회원 레시피 리스트 */}
          <UserRecipeList />

          {/* A/B 테스트용 이벤트+광고 */}
          <ABTestBlock />

          {/* 네이버 검색 결과 iframe */}
          <NaverSearchIframe query={keyword} />
        </div>
      </div>
    </div>
  )
}

export default SearchResults
