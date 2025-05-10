import React from 'react'
import FilterButtons from './FilterButtons'
import SearchInput from './SearchInput'
import CategoryFilter from './CategoryFilter'
import { CategoryFilters } from './CategoryFilter.types.ts'

interface Props {
  selectedMode: 'category' | 'ingredient' | 'menu'
  onModeChange: (mode: 'category' | 'ingredient' | 'menu') => void
  searchKeyword: string
  onSearchKeywordChange: (kw: string) => void
  categoryFilters: CategoryFilters
  onCategoryFiltersChange: (f: CategoryFilters) => void
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
}) => (
  <div>
    {/* 1) 모드 버튼 */}
    <FilterButtons selected={selectedMode} onChange={onModeChange} />

    {/* 2) 검색 인풋 */}
    <SearchInput
      value={searchKeyword}
      onChange={e => onSearchKeywordChange(e.target.value)}
      onSearch={onSearch}
    />

    {/* 3) 카테고리 모드일 때만 필터 노출 */}
    {selectedMode === 'category' && (
      <CategoryFilter
        value={categoryFilters}
        onChange={onCategoryFiltersChange}
      />
    )}
  </div>
)

export default SearchPanel
