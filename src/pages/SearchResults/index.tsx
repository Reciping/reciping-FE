import React, { useEffect, useState } from 'react'
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useParams,
} from 'react-router-dom'

import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/layout/Navbar'
import Container from '../../components/common/Container'
import LogoTitle from '../../components/common/LogoTitle'
import SearchPanel from '../../components/search/SearchPanel'
import Footer from '../../components/common/Footer'
import RecipeSwiper from '../../components/recipe/RecipeSwiper'
import SearchFeedback from '../../components/search/SearchFeedback'
import EventBlock from '../../components/event/EventBlock'
import AdsBlock from '../../components/ads/AdsBlock'
import UserRecipeList from '../../components/user/UserRecipeList'
import { CategorySearchRequest } from '../../types/recipe'
import NaverSearchIframe from '../../components/NaverSearchIframe'
import eventPlaceholder from '../../assets/event.jpg'   // 실제 경로에 맞게 수정

import {
  searchRecipes,
  searchRecipesByCategory
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
import { SearchMode } from '../../types/SearchPanel.types'

import {
  Recipe,
  SearchParams,
  SearchResponse,
} from '../../types/recipe'

export type SearchPageState = {
  recipes?: Recipe[]
  mode?: 'menu' | 'ingredient' | 'category'
  main?: MainResponse
}

const SearchResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const searchType = location.pathname.split('/')[2] // 'category', 'natural', 'menu', 'ingredient'
  const main = location.state?.main as MainResponse | undefined

  const [selectedMode, setSelectedMode] = useState<SearchMode>(searchType as SearchMode)
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('keyword') || '')
  const [categoryFilters, setCategoryFilters] = useState({
    dishType: searchParams.get('dishType') || '전체',
    situationType: searchParams.get('situationType') || '전체',
    ingredientType: searchParams.get('ingredientType') || '전체',
    methodType: searchParams.get('methodType') || '전체',
    cookingTime: searchParams.get('cookingTime') || '전체',
    difficulty: searchParams.get('difficulty') || '전체',
  })
  
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        switch (searchType) {
          case 'category':
            const payload: CategorySearchRequest = { ...categoryFilters }
            const { content } = await searchRecipesByCategory(payload, 0, 20)
            setRecipes(content)
            break
          case 'natural':
            // TODO: 자연어 검색 API 연동
            break
          case 'menu':
            // TODO: 메뉴 기반 검색 API 연동
            break
          case 'ingredient':
            // TODO: 재료 기반 검색 API 연동
            break
          default:
            setError('잘못된 검색 유형입니다.')
        }
      } catch (e) {
        console.error(e)
        setError('검색 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [searchType, searchParams])

  const handleSearch = () => {
    if (selectedMode === null || (selectedMode === 'category' && searchKeyword)) {
      // 자연어 검색
      const qs = new URLSearchParams()
      qs.set('keyword', searchKeyword)
      qs.set('page', '1')
      navigate(`/search/natural?${qs.toString()}`, { state: { main }})
    } else if (selectedMode === 'menu') {
      // 메뉴 기반 검색
      const qs = new URLSearchParams()
      qs.set('keyword', searchKeyword)
      qs.set('page', '1')
      navigate(`/search/menu?${qs.toString()}`, { state: { main }})
    } else if (selectedMode === 'ingredient') {
      // 재료 기반 검색
      const qs = new URLSearchParams()
      qs.set('keyword', searchKeyword)
      qs.set('page', '1')
      navigate(`/search/ingredient?${qs.toString()}`, { state: { main }})
    }
  }

  const handleCategoryFiltersChange = (newFilters: typeof categoryFilters) => {
    setCategoryFilters(newFilters)
    const qs = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== '전체') {
        qs.set(key, value)
      }
    })
    navigate(`/search/category?${qs.toString()}`, { state: { main }})
  }

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
            onSearchKeywordChange={e => setSearchKeyword(e.target.value)}
            categoryFilters={categoryFilters}
            onCategoryFiltersChange={handleCategoryFiltersChange}
            onSearch={handleSearch}
          />

          {loading ? (
            <div className="text-center py-8">검색 결과를 불러오는 중...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-8">검색 결과가 없습니다.</div>
          ) : (
            <div className="mb-6">
              <h3 className="font-bold mb-4">검색 결과</h3>
              <RecipeSwiper
                recipes={recipes}
                onCardClick={id => navigate(`/recipe/${id}`)}
              />
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </PageLayout>
  )
}

export default SearchResults
