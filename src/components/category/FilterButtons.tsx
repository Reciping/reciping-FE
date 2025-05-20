import React from 'react'
import { SearchMode } from '../../types/SearchPanel.types'

interface Props {
  selectedMode: SearchMode
  onModeChange: (mode: SearchMode) => void
}

const FilterButtons: React.FC<Props> = ({ selectedMode, onModeChange }) => {
  const handleModeClick = (mode: SearchMode) => {
    if (selectedMode === mode) {
      // 현재 모드와 같은 버튼을 누르면 모드 해제
      onModeChange(null);
    } else {
      // 다른 모드 버튼을 누르면 해당 모드로 변경
      onModeChange(mode);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleModeClick('category')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedMode === 'category'
            ? 'bg-[#F15A24] text-white'
            : 'bg-[#FDD9B5] text-[#5C2E1E] hover:bg-[#FFE2CA]'
        }`}
      >
        카테고리
      </button>
      <button
        onClick={() => handleModeClick('ingredient')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedMode === 'ingredient'
            ? 'bg-[#F15A24] text-white'
            : 'bg-[#FDD9B5] text-[#5C2E1E] hover:bg-[#FFE2CA]'
        }`}
      >
        재료
      </button>
      <button
        onClick={() => handleModeClick('menu')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedMode === 'menu'
            ? 'bg-[#F15A24] text-white'
            : 'bg-[#FDD9B5] text-[#5C2E1E] hover:bg-[#FFE2CA]'
        }`}
      >
        메뉴
      </button>
    </div>
  )
}

export default FilterButtons
