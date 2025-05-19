import React from 'react'

interface Props {
  selected: 'category' | 'ingredient' | 'menu' | null
  onChange: (mode: 'category' | 'ingredient' | 'menu' | null) => void
}

const OPTIONS = [
  { key: null, label: '# 자연어 검색' },
  { key: 'category', label: '# 카테고리 필터' },
  { key: 'ingredient', label: '# 재료기반 검색' },
  { key: 'menu', label: '# 메뉴기반 검색' }
]

const FilterButtons: React.FC<Props> = ({ selected, onChange }) => (
  <div className="flex gap-2 text-sm mb-6">
    {OPTIONS.map(opt => (
      <button
        key={opt.key ?? 'natural'}
        onClick={() => onChange(opt.key as 'category' | 'ingredient' | 'menu' | null)}
        className={`rounded-full px-4 py-1 ${
          selected === opt.key
            ? 'bg-[#F15A24] text-white'
            : 'bg-[#FDD9B5] text-[#F15A24]'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
)

export default FilterButtons
