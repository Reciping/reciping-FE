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
// import ABTestBlock from '../../components/abTest/ABTestBlock' // 사용되지 않는 컴포넌트 주석 처리 또는 삭제
import NaverSearchIframe from '../../components/NaverSearchIframe'
import eventPlaceholder from '../../assets/event.jpg'   // 실제 경로에 맞게 수정

import {
  searchRecipes,
  SearchParams,
  SearchResponse,
  Recipe, // Recipe 타입은 필요 없을 수 있습니다.
} from '../../services/recipeService'

import {
  getMainData,
  MainResponse,
} from '../../services/mainService'

// SearchRecipeList 컴포넌트는 더 이상 직접 사용하지 않습니다.
// import SearchRecipeList from '../../components/recipe/SearchRecipeList'
import { CategoryFilters } from '../../components/category/CategoryFilter.types'
import {
  DishTypeLabelToValue,
  SituationTypeLabelToValue,
  IngredientTypeLabelToValue,
  MethodTypeLabelToValue,
} from '../../constants/CategoryValueMap'

export type SearchPageState = {
  recipes?: Recipe[]
  mode?: 'menu' | 'ingredient' | 'category'
  main?: MainResponse
}

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  // state로 categoryRecipes를 받아오는 로직 제거
  const { state } = useLocation() as { state?: { main?: MainResponse } }
  // const { state } = useLocation() as { state?: SearchPageState }
  const [main, setMain] = useState<MainResponse | null>(state?.main ?? null)
  const navigate = useNavigate()
  
  // Home → state 로 온 카테고리 결과 로직 제거
  // const categoryRecipes: Recipe[] | undefined = (state as any)?.recipes
  // const categoryRecipes = state?.recipes ?? null
  const { mode: rawMode } = useParams<{ mode?: string }>()
  const mode: 'menu' | 'ingredient' | 'category' =
  rawMode === 'menu' || rawMode === 'ingredient' || rawMode === 'category'
    ? rawMode
    : 'menu'  // fallback

  // 쿼리스트링 기반 검색 파라미터
  const keyword = searchParams.get('keyword') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)

  // 쿼리 스트링에서 카테고리 필터 값 읽어오기
  const dishType = searchParams.get('dishType') || '전체'
  const situationType = searchParams.get('situationType') || '전체'
  const ingredientType = searchParams.get('ingredientType') || '전체'
  const methodType = searchParams.get('methodType') || '전체'
  const cookingTime = searchParams.get('cookingTime') || '전체'
  const difficulty = searchParams.get('difficulty') || '전체'

  const [searchKeyword, setSearchKeyword] = useState(keyword)
  const [submittedKeyword, setSubmittedKeyword] = useState(keyword)
  // 검색 결과 데이터를 data state 하나로 관리
  const [data, setData] = useState<SearchResponse | null>(null)
  // categoryFilters state는 SearchPanel에 전달하기 위해 유지
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilters>({
    dishType,
    situationType,
    ingredientType,
    methodType,
    cookingTime,
    difficulty,
  })

  // 쿼리 스트링 변경될 때마다 검색 API 호출
  useEffect(() => {
    // if (categoryRecipes) return // categoryRecipes에 따른 조건부 호출 로직 제거

    // 쿼리 스트링에서 모든 필요한 파라미터 추출
    const currentKeyword = searchParams.get('keyword') || ''
    const currentPage = parseInt(searchParams.get('page') || '1', 10)
    const currentDishType = searchParams.get('dishType') || '전체'
    const currentSituationType = searchParams.get('situationType') || '전체'
    const currentIngredientType = searchParams.get('ingredientType') || '전체'
    const currentMethodType = searchParams.get('methodType') || '전체'
    const currentCookingTime = searchParams.get('cookingTime') || '전체'
    const currentDifficulty = searchParams.get('difficulty') || '전체'

    const params: SearchParams = {
      keyword: currentKeyword,
      page: currentPage,
      dishType: currentDishType,
      situationType: currentSituationType,
      ingredientType: currentIngredientType,
      methodType: currentMethodType,
      cookingTime: currentCookingTime,
      difficulty: currentDifficulty,
    }

    // searchRecipes API 호출 (mode, params 사용)
    searchRecipes(mode, params)
      .then(res => {
        setData(res)
      })
      .catch(err => console.error('검색 API 오류:', err))

    // 쿼리 스트링 변경 시 SearchPanel의 categoryFilters state도 업데이트
    setCategoryFilters({
      dishType: currentDishType,
      situationType: currentSituationType,
      ingredientType: currentIngredientType,
      methodType: currentMethodType,
      cookingTime: currentCookingTime,
      difficulty: currentDifficulty,
    });

  }, [searchParams, mode]) // searchParams 또는 mode 변경 시 useEffect 실행

  useEffect(() => {
    if (main) return         // 이미 있으면 요청 생략
    getMainData('MAIN_TOP', 20).then(setMain).catch(console.error)
  }, [])
  

  /* 검색창 엔터 → quersyString 방식 유지 */
  const handleSearch = () => {
    setSubmittedKeyword(searchKeyword) // SearchPanel에서 사용되는 state 업데이트
    const qs = new URLSearchParams()
    // mode가 category일 때는 keyword를 포함하지 않음
    if (mode !== 'category') {
       qs.set('keyword', searchKeyword);
    }
    qs.set('page', '1')

    // 현재 SearchPanel의 categoryFilters state 값을 쿼리 스트링에 반영
    if (mode === 'category') {
      qs.set('dishType', categoryFilters.dishType === '전체' ? 'ALL' : DishTypeLabelToValue[categoryFilters.dishType])
      qs.set('situationType', categoryFilters.situationType === '전체' ? 'ALL' : SituationTypeLabelToValue[categoryFilters.situationType])
      qs.set('ingredientType', categoryFilters.ingredientType === '전체' ? 'ALL' : IngredientTypeLabelToValue[categoryFilters.ingredientType])
      qs.set('methodType', categoryFilters.methodType === '전체' ? 'ALL' : MethodTypeLabelToValue[categoryFilters.methodType])
      // 숫자/범위 값은 매핑 없이 바로 사용
      qs.set('cookingTime', categoryFilters.cookingTime)
      qs.set('difficulty', categoryFilters.difficulty)
    }
    // 모드 변경 시에는 기존 쿼리 스트링 유지 (SearchPanel onModeChange에서 처리)
    // 검색 버튼 클릭 시에는 현재 SearchPanel 상태로 쿼리 스트링 새로 생성
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
            onModeChange={(nextMode) => {
              // 모드 변경 시 기존 검색 조건 초기화 또는 유지 방식 결정 필요
              // 일단 키워드는 비우고, 카테고리 필터는 전체로 초기화하는 방식 (혹은 유지)
              // 여기서는 단순하게 mode만 변경하고 쿼리 스트링은 초기화하지 않습니다.
              // 필요한 경우 쿼리 스트링 초기화 로직 추가
              const currentQs = new URLSearchParams(searchParams.toString());
              // 모드 변경 시 키워드와 카테고리 필터 쿼리 파라미터 초기화
              currentQs.delete('keyword');
              currentQs.delete('dishType');
              currentQs.delete('situationType');
              currentQs.delete('ingredientType');
              currentQs.delete('methodType');
              currentQs.delete('cookingTime');
              currentQs.delete('difficulty');
              // 페이지 번호도 1로 초기화
              currentQs.set('page', '1');
              
              navigate(`/search/${nextMode}?${currentQs.toString()}`);
            }}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
            categoryFilters={categoryFilters}
            onCategoryFiltersChange={setCategoryFilters}
            onSearch={handleSearch}
          />

          {submittedKeyword && mode !== 'category' && <SearchFeedback query={submittedKeyword} />}
          {/* 카테고리 검색일 때는 SearchFeedback을 표시하지 않거나, 다른 형태의 피드백 고려 */}

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* 이벤트 (첫 배너) */}
            {main?.events[0] ? (
              <EventBlock event={main.events[0]} />
            ) : (
              <div className="h-40 w-full lg:w-1/2 rounded-2xl bg-white shadow flex items-center justify-center">
                    <img
                      src={eventPlaceholder}
                      alt="이벤트 준비 중"
                      className="w-full h-full object-cover"
                    />
              </div>
            )}

            {/* 광고 (첫 배너) */}
            <div className="h-40 w-full lg:w-1/2 rounded-2xl overflow-hidden shadow">
              <AdsBlock ad={main?.ads?.[0] ?? null} />
            </div>
          </div>

          {/* ① 카테고리 검색 결과 - 이 섹션을 제거하고 아래 UserRecipeList로 통합 */}

          {/* ② 기존 키워드 검색 결과 - 모든 검색 결과를 UserRecipeList로 표시 */}
          {data && Array.isArray(data.recipes) && (
            <UserRecipeList
              recipes={data.recipes}
              page={data.page}
              total={data.total}
              limit={data.limit}
              goToPage={goToPage}
            />
          )}

          {/* <ABTestBlock /> */}
          {/* 키워드 검색일 때만 NaverSearchIframe 표시 */}
          {mode !== 'category' && <NaverSearchIframe query={keyword} />}
        </div>
      </div>
    </PageLayout>
  )
}

export default SearchResults
