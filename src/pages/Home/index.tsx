import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/layout/Navbar'
import Container from '../../components/common/Container'
import EventBlock from '../../components/event/EventBlock'
import LogoTitle from '../../components/common/LogoTitle'
import SearchPanel from '../../components/search/SearchPanel'
import Footer from '../../components/common/Footer'
import RecipeListSection from '../../components/recipe/HomeRecipeList'
import AdsBlock from '../../components/ads/AdsBlock'

/* === 추가: 카테고리 검색 API === */
import {
  CategorySearchRequest,
  searchRecipesByCategory,
} from '../../api/recipesApi'
import HomeRecipeList from '../../components/recipe/HomeRecipeList'
/* ================================= */

const Home = () => {
  const navigate = useNavigate()

  const [selectedMode, setSelectedMode] =
    useState<'category' | 'ingredient' | 'menu'>('menu')
  const [searchKeyword, setSearchKeyword] = useState('')

  // 카테고리 필터 (초기값 '전체')
  const [categoryFilters, setCategoryFilters] = useState({
    dishType: '전체',
    situationType: '전체',
    ingredientType: '전체',
    methodType: '전체',
    cookingTime: '전체',
    difficulty: '전체',
  })

  /* dummy */
  const [popularRecipes, setPopularRecipes] = useState<string[]>([])
  useEffect(() => {
    setPopularRecipes(['김치라면', '부대찌개', '청국장', '밤타리아누', '양념갈비'])
  }, [])

  /* === 변경: 검색 버튼 === */
  const handleSearch = async () => {
    // 메뉴/재료 모드 → 기존 쿼리스트링 검색
    if (selectedMode !== 'category') {
      const qs = new URLSearchParams()
      qs.set('keyword', searchKeyword)
      qs.set('mode', selectedMode)
      qs.set('page', '1')
      navigate(`/search?${qs.toString()}`)
      return
    }

    // 카테고리 모드 → POST /search/category
    try {
      const payload: CategorySearchRequest = {
        dishType:       categoryFilters.dishType,
        situationType:  categoryFilters.situationType,
        ingredientType: categoryFilters.ingredientType,
        methodType:     categoryFilters.methodType,
        cookingTime:    categoryFilters.cookingTime,
        difficulty:     categoryFilters.difficulty,
      }

      const { content } = await searchRecipesByCategory(payload, 0, 20)

      // /search 로 결과 배열을 state 로 넘김
      navigate('/search', { state: { recipes: content, mode: 'category' } })
    } catch (e) {
      console.error(e)
      alert('카테고리 검색 중 오류가 발생했습니다.')
    }
  }
  /* ================================= */

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
            onSearchKeywordChange={setSearchKeyword}
            categoryFilters={categoryFilters}
            onCategoryFiltersChange={setCategoryFilters}
            onSearch={handleSearch}
          />

          {/* 광고 & 기본 레시피 리스트 */}
          <div className="flex gap-4 mb-6">
            <EventBlock />
            <AdsBlock />
          </div>  

          <HomeRecipeList />

          {/* (AI 추천·인기 리스트 영역 생략) */}
        </Container>
      </div>

      <Footer />
    </PageLayout>
  )
}

export default Home
