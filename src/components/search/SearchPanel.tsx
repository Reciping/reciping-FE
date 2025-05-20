import React from 'react'
import { SearchMode } from '../../types/SearchPanel.types'
import SearchInput from './SearchInput'
import FilterButtons from '../category/FilterButtons'
import CategoryFilter from '../category/CategoryFilter'

interface Props {
  selectedMode: SearchMode
  onModeChange: (mode: SearchMode) => void
  searchKeyword: string
  onSearchKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  categoryFilters: {
    dishType: string
    situationType: string
    ingredientType: string
    methodType: string
    cookingTime: string
    difficulty: string
  }
  onCategoryFiltersChange: (filters: Props['categoryFilters']) => void
  onSearch: () => void
}

const SearchPanel: React.FC<Props> = ({
  selectedMode,
  onModeChange,
  searchKeyword,
  onSearchKeywordChange,
  categoryFilters,
  onCategoryFiltersChange,
  onSearch
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-6">
      {/* 검색 모드 버튼 */}
      <FilterButtons
        selectedMode={selectedMode}
        onModeChange={onModeChange}
      />

      {/* 검색창 */}
      <div className="mt-4">
        <SearchInput
          value={searchKeyword}
          onChange={onSearchKeywordChange}
          onSearch={onSearch}
          placeholder={
            selectedMode === 'ingredient'
              ? '재료를 입력해주세요'
              : selectedMode === 'menu'
              ? '메뉴를 입력해주세요'
              : '검색어를 입력해주세요'
          }
        />
      </div>

      {/* 카테고리 필터 */}
      {selectedMode === 'category' && (
        <div className="mt-4">
          <CategoryFilter
            value={categoryFilters}
            onChange={onCategoryFiltersChange}
          />
        </div>
      )}
    </div>
  )
}

export default SearchPanel
