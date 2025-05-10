// src/components/CategoryFilter.tsx
import { useState } from 'react'

interface Props {
  value: CategoryFilters
  onChange: (newFilters: CategoryFilters) => void
}

export interface CategoryFilters {
  type: string
  situation: string
  ingredient: string
  method: string
}

const CATEGORY_OPTIONS = {
  type: ['전체', '밑반찬', '메인반찬', '국/탕', '찌개', '디저트', '면/만두', '밥/죽/떡', '퓨전', '김치/젓갈/장류', '양념/소스/잼', '양식', '샐러드', '스프', '빵', '과자', '차/음료/술', '기타'],
  situation: ['전체', '일상', '초스피드', '손님접대', '술안주', '다이어트', '도시락', '영양식', '간식', '야식', '푸드스타일링', '해장', '명절', '이유식', '기타'],
  ingredient: ['전체', '소고기', '돼지고기', '닭고기', '육류', '채소류', '해물류', '달걀/유제품', '가공식품류', '쌀', '밀가루', '건어물류', '버섯류', '과일류', '콩/견과류', '곡류', '기타'],
  method: ['전체', '볶음', '끓이기', '부침', '조림', '무침', '비빔', '찜', '절임', '튀김', '삶기', '굽기', '데치기', '회', '기타']
}

const CategoryFilter = ({ value, onChange }: Props) => {
  const handleSelect = (key: keyof CategoryFilters, option: string) => {
    onChange({ ...value, [key]: value[key] === option ? '' : option })
  }

  return (
    <div className="mb-6 space-y-4">
      {Object.entries(CATEGORY_OPTIONS).map(([key, options]) => (
        <div key={key} className="flex items-center gap-2 flex-wrap">
          <div className="text-green-600 font-bold w-20">
            {key === 'type' && '종류별'}
            {key === 'situation' && '상황별'}
            {key === 'ingredient' && '재료별'}
            {key === 'method' && '방법별'}
          </div>
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(key as keyof CategoryFilters, option)}
              className={`px-3 py-1 rounded-full text-sm ${
                value[key as keyof CategoryFilters] === option
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CategoryFilter
