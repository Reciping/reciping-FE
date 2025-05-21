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
  searchNaturalService,
  searchMenuService,
  searchIngredientsService,
} from '../../services/searchService'

import {
  getMainData,
  MainResponse,
} from '../../services/mainService'

import {
    searchRecipesByCategory
} from '../../services/recipeService'

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
} from '../../types/recipe'

import { SearchResponse } from '../../types/searchTypes'

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
        let result: SearchResponse | null = null;
        const keyword = searchParams.get('keyword') || '';

        switch (selectedMode) {
          case 'category':
            const payload: CategorySearchRequest = { ...categoryFilters }
            const categoryResult = await searchRecipesByCategory(payload, 0, 20)
            if (categoryResult && categoryResult.content) {
                setRecipes(categoryResult.content);
            } else {
                setRecipes([]);
            }
            break
            case null:
              if (keyword) {
                 result = await searchNaturalService({ query: keyword, size: 20 });
              }
              break;
            case 'menu':
              if (keyword) {
                 result = await searchMenuService({ keyword: keyword, size: 20 });
              }
              break;
            case 'ingredient':
              if (keyword) {
                const ingredients = keyword
                  .split(',')
                  .map(item => item.trim())
                  .filter(item => item.length > 0);

                if (ingredients.length > 0) {
                  result = await searchIngredientsService({
                    ingredients,
                    size: 20
                  });
                }
              }
              break;
            default:
               setError('잘못된 검색 유형입니다.');
               setRecipes([]);
               break;
          }

           if (selectedMode !== 'category' && result && result.recipes) {
              setRecipes(result.recipes);
          } else if (selectedMode !== 'category' && (!result || !result.recipes)) {
              setRecipes([]);
          }

        } catch (e) {
          console.error(e);
          setError('검색 중 오류가 발생했습니다.');
          setRecipes([]);
        } finally {
          setLoading(false);
        }
      };
    
    fetchResults()
  }, [location.pathname, location.search])

// 검색 버튼 클릭 핸들러
  // 선택된 모드에 따라 적절한 URL로 navigate
  const handleSearchButtonClick = () => {
    const qs = new URLSearchParams();
    if (searchKeyword) {
         qs.set('keyword', searchKeyword);
    }
     qs.set('page', '1'); // 페이지는 일단 1로 고정

    switch (selectedMode) {
        case null:
            navigate(`/search/natural?${qs.toString()}`, { state: { main } });
            break;
        case 'menu':
             navigate(`/search/menu?${qs.toString()}`, { state: { main } });
            break;
        case 'ingredient':
             navigate(`/search/ingredient?${qs.toString()}`, { state: { main } });
            break;
        case 'category':
             // 카테고리 모드에서 검색 버튼을 누르면 현재 필터 상태로 카테고리 검색 URL로 이동
            Object.entries(categoryFilters).forEach(([key, value]) => {
                if (value !== '전체') {
                    qs.set(key, value);
                }
            });
             navigate(`/search/category?${qs.toString()}`, { state: { main } });
             break;
         default:
             // 알 수 없는 모드 처리 (에러 또는 기본 동작)
             console.error('Unknown selectedMode:', selectedMode);
             // 기본적으로 자연어 검색으로 리다이렉트 할 수도 있습니다.
             navigate(`/search/natural?${qs.toString()}`, { state: { main } });
             break;
    }
};

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
            onSearch={handleSearchButtonClick}
          />

          {loading ? (
            <div className="text-center py-8">검색 결과를 불러오는 중...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (Array.isArray(recipes) && recipes.length === 0 || recipes === undefined) ? (
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
