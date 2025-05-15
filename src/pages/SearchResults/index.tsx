import React, { useEffect, useState } from 'react'
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useParams,
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

import SearchRecipeList from '../../components/recipe/SearchRecipeList'
import { CategoryFilters } from '../../components/category/CategoryFilter.types'
import {
  DishTypeLabelToValue,
  SituationTypeLabelToValue,
  IngredientTypeLabelToValue,
  MethodTypeLabelToValue,
} from '../../constants/CategoryValueMap'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  
  // Home → state 로 온 카테고리 결과
  const categoryRecipes: Recipe[] | undefined = (state as any)?.recipes
  const { mode: rawMode } = useParams<{ mode?: string }>()
  const mode: 'menu' | 'ingredient' | 'category' =
  rawMode === 'menu' || rawMode === 'ingredient' || rawMode === 'category'
    ? rawMode
    : 'menu'  // fallback

  // 쿼리스트링 기반 검색 파라미터
  const keyword = searchParams.get('keyword') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)

  const dishType = searchParams.get('dishType') || '전체'
  const situationType = searchParams.get('situationType') || '전체'
  const ingredientType = searchParams.get('ingredientType') || '전체'
  const methodType = searchParams.get('methodType') || '전체'
  const cookingTime = searchParams.get('cookingTime') || '전체'
  const difficulty = searchParams.get('difficulty') || '전체'

  const [searchKeyword, setSearchKeyword] = useState(keyword)
  const [submittedKeyword, setSubmittedKeyword] = useState(keyword)
  const [data, setData] = useState<SearchResponse | null>(null)
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilters>({
    dishType,
    situationType,
    ingredientType,
    methodType,
    cookingTime,
    difficulty,
  })

  // 키워드/메뉴/재료 검색 (카테고리 결과가 없을 때만)
  useEffect(() => {
    if (categoryRecipes) return

    const params: SearchParams = {
      keyword,
      page,
      // categoryFilters는 category 모드일 때만 사용되지만, 넘겨줘도 상관 없음
      dishType: categoryFilters.dishType,
      situationType: categoryFilters.situationType,
      ingredientType: categoryFilters.ingredientType,
      methodType: categoryFilters.methodType,
      cookingTime: categoryFilters.cookingTime,
      difficulty: categoryFilters.difficulty,
    }

    searchRecipes(mode, params)
      .then(res => {
        setData(res)
      })
      .catch(err => console.error('검색 API 오류:', err))
  }, [categoryRecipes, keyword, mode, page])

  /* 검색창 엔터 → quersyString 방식 유지 */
  const handleSearch = () => {
    setSubmittedKeyword(searchKeyword)
    const qs = new URLSearchParams()
    qs.set('keyword', searchKeyword)
    qs.set('page', '1')

    if (mode === 'category') {
      qs.set('dishType', DishTypeLabelToValue[categoryFilters.dishType] || 'ALL')
      qs.set('situationType', SituationTypeLabelToValue[categoryFilters.situationType] || 'ALL')
      qs.set('ingredientType', IngredientTypeLabelToValue[categoryFilters.ingredientType] || 'ALL')
      qs.set('methodType', MethodTypeLabelToValue[categoryFilters.methodType] || 'ALL')
      qs.set('cookingTime', categoryFilters.cookingTime)
      qs.set('difficulty', categoryFilters.difficulty)
    }
    navigate(`/search/${mode}?${qs.toString()}`)
  }

  /* 페이지 변경 */
  const goToPage = (newPage: number) => {
    const qs = new URLSearchParams(searchParams.toString())
    qs.set('page', newPage.toString())
    navigate(`/search/${mode}?${qs.toString()}`)
  }

  return (
    <PageLayout>
      <Navbar />
      <div className="py-8">
        <div className="max-w-[1080px] mx-auto px-4">
          <LogoTitle />

          <SearchPanel
            selectedMode={mode}
            onModeChange={(nextMode) => navigate(`/search/${nextMode}?${searchParams.toString()}`)}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
            categoryFilters={categoryFilters}
            onCategoryFiltersChange={setCategoryFilters}
            onSearch={handleSearch}
          />

          {submittedKeyword && <SearchFeedback query={submittedKeyword} />}

          <div className="flex gap-4 mb-6">
            <EventBlock />
            <AdsBlock />
          </div>

          {/* ① 카테고리 검색 결과 */}

          {categoryRecipes && (
            <SearchRecipeList
              recipes={categoryRecipes}
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
