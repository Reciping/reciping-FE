import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import LogoTitle from '../../components/LogoTitle'
import SearchPanel from '../../components/SearchPanel'
import SearchFeedback from '../../components/SearchFeedback'
import EventBlock from '../../components/EventBlock'
import AdsBlock from '../../components/AdsBlock'
import UserRecipeList from '../../components/UserRecipeList'
import ABTestBlock from '../../components/ABTestBlock'
import NaverSearchIframe from '../../components/NaverSearchIframe'

import { searchRecipes, SearchParams, SearchResponse } from '../../api/recipesApi'

const SearchResults = () => {
  const [searchParams]= useSearchParams()
  const navigate = useNavigate()

  const initialKeyword = searchParams.get('keyword') || ''
  const [submittedKeyword, setSubmittedKeyword] = useState(initialKeyword)
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword)

  const keyword = searchParams.get('keyword') || ''
  const mode = searchParams.get('mode') as SearchParams['mode'] || 'menu'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const dish = searchParams.get('dish') || '전체'
  const situation = searchParams.get('situation') || '전체'
  const ingredient = searchParams.get('ingredient') || '전체'
  const method = searchParams.get('method') || '전체'

  const [data, setData] = useState<SearchResponse | null>(null)


  useEffect(() => {
    const params: SearchParams = { keyword, mode, page }
    if (mode === 'category') {
      Object.assign(params, { dish, situation, ingredient, method })
    }
    searchRecipes(params)
      .then(res => setData(res))
      .catch(err => console.error('검색 API 오류:', err))
  }, [submittedKeyword, mode, page, dish, situation, ingredient, method])

  const goToPage = (newPage: number) => {
    const qs = new URLSearchParams(searchParams.toString())
    qs.set('page', newPage.toString())
    navigate(`/search?${qs.toString()}`)
  }

  const handleSearch = () => {
    setSubmittedKeyword(searchKeyword)

    const params = new URLSearchParams()
    params.set('keyword', searchKeyword)
    params.set('mode', mode)
    if (mode === 'category') {
      params.set('dish', dish)
      params.set('situation', situation)
      params.set('ingredient', ingredient)
      params.set('method', method)
    }

    params.set('page', '1')

    // 검색 페이지로 이동
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
            selectedMode={mode}
            onModeChange={() => {}}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
            categoryFilters={{ dish, situation, ingredient, method }}
            onCategoryFiltersChange={() => {}}
            onSearch={handleSearch}
          />

          {/* 검색한 쿼리 피드백 */}
          {submittedKeyword && <SearchFeedback query={submittedKeyword} />}

          {/* 광고 & 이벤트 */}
          <div className="flex gap-4 mb-6">
            <EventBlock />
            <AdsBlock />
          </div>

          
          {data && (
            <UserRecipeList
              recipes = {data.recipes}
              page = {data.page}
              total = {data.total}
              limit = {data.limit}
              goToPage = {goToPage}
            />
          )}

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