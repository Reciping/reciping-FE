import React, { useEffect, useState } from 'react'
import {
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom'

import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/layout/Navbar'
import LogoTitle from '../../components/common/LogoTitle'
import SearchPanel from '../../components/search/SearchPanel'
import SearchFeedback from '../../components/search/SearchFeedback'
import EventBlock from '../../components/event/EventBlock'
import AdsBlock from '../../components/ads/AdsBlock'
import UserRecipeList from '../../components/user/UserRecipeList'
import ABTestBlock from '../../components/abTest/ABTestBlock'
import NaverSearchIframe from '../../components/NaverSearchIframe'

import {
  searchRecipes,
  SearchParams,
  SearchResponse,
  Recipe,
} from '../../api/recipesApi'

import RecipeListSection from '../../components/recipe/RecipeListSection'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  // Home → state 로 온 카테고리 결과
  const categoryRecipes: Recipe[] | undefined = (state as any)?.recipes
  const categoryMode = (state as any)?.mode === 'category'

  // 쿼리스트링 기반 검색 파라미터
  const keyword = searchParams.get('keyword') || ''
  const mode = (searchParams.get('mode') as SearchParams['mode']) || 'menu'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const dishType = searchParams.get('dishType') || '전체'
  const situationType = searchParams.get('situationType') || '전체'
  const ingredientType = searchParams.get('ingredientType') || '전체'
  const methodType = searchParams.get('methodType') || '전체'

  const [searchKeyword, setSearchKeyword] = useState(keyword)
  const [submittedKeyword, setSubmittedKeyword] = useState(keyword)
  const [data, setData] = useState<SearchResponse | null>(null)

  // 키워드/메뉴/재료 검색 (카테고리 결과가 없을 때만)
  useEffect(() => {
    if (categoryRecipes) return

    const params: SearchParams = { keyword, mode, page }
    if (mode === 'category') {
      Object.assign(params, {
        dishType,
        situationType,
        ingredientType,
        methodType,
      })
    }

    searchRecipes(params)
      .then(res => setData(res))
      .catch(err => console.error('검색 API 오류:', err))
  }, [categoryRecipes, keyword, mode, page, dishType, situationType, ingredientType, methodType])

  /* 검색창 엔터 → quersyString 방식 유지 */
  const handleSearch = () => {
    setSubmittedKeyword(searchKeyword)
    const qs = new URLSearchParams()
    qs.set('keyword', searchKeyword)
    qs.set('mode', mode)
    qs.set('page', '1')
    navigate(`/search?${qs.toString()}`)
  }

  /* 페이지 변경 */
  const goToPage = (newPage: number) => {
    const qs = new URLSearchParams(searchParams.toString())
    qs.set('page', newPage.toString())
    navigate(`/search?${qs.toString()}`)
  }

  return (
    <PageLayout>
      <Navbar />
      <div className="py-8">
        <div className="max-w-[1080px] mx-auto px-4">
          <LogoTitle />

          <SearchPanel
            selectedMode={mode}
            onModeChange={() => {}}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
            categoryFilters={{
              dishType,
              situationType,
              ingredientType,
              methodType,
              cookingTime: '전체',
              difficulty: '전체',
            }}
            onCategoryFiltersChange={() => {}}
            onSearch={handleSearch}
          />

          {submittedKeyword && <SearchFeedback query={submittedKeyword} />}

          <div className="flex gap-4 mb-6">
            <EventBlock />
            <AdsBlock />
          </div>

          {/* ① 카테고리 검색 결과 */}
          {categoryRecipes && (
            <RecipeListSection
              initialRecipes={categoryRecipes}
              onCardClick={id => navigate(`/recipe/${id}`)}
            />
          )}

          {/* ② 기존 키워드 검색 결과 */}
          {data && !categoryRecipes && (
            <UserRecipeList
              recipes={data.recipes}
              page={data.page}
              total={data.total}
              limit={data.limit}
              goToPage={goToPage}
            />
          )}

          <ABTestBlock />
          <NaverSearchIframe query={keyword} />
        </div>
      </div>
    </PageLayout>
  )
}

export default SearchResults
