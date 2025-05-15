// src/components/category/CategoryFilter.tsx
import React, { useState, useEffect } from 'react'
import { CategoryFilters } from './CategoryFilter.types'
import {
  getCategoryOptions,
  CategoryOptionsResponse
} from '../../api/recipesApi'

interface Props {
  value: CategoryFilters
  onChange: (newFilters: CategoryFilters) => void
}

const CategoryFilter: React.FC<Props> = ({ value, onChange }) => {
  // 1) 백엔드에서 카테고리 옵션을 받아올 상태
  const [options, setOptions] = useState<CategoryOptionsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 2) 마운트 시 API 호출
  useEffect(() => {
    setLoading(true)
    getCategoryOptions()
      .then(opts => {
        setOptions(opts)
      })
      .catch(err => {
        console.error(err)
        setError('카테고리 옵션을 불러오는 중 오류가 발생했습니다.')
      })
      .finally(() => setLoading(false))
  }, [])

  // 3) 선택 핸들러 (토글 방식)
  const handleSelect = (key: keyof CategoryFilters, label: string) => {
    onChange({
      ...value,
      [key]: value[key] === label ? '' : label
    })
  }

  // 4) 로딩 / 에러 표시
  if (loading) return <p className="p-4 text-center">옵션을 불러오는 중…</p>
  if (error)   return <p className="p-4 text-center text-red-500">{error}</p>
  if (!options) return null

  return (
    <div className="bg-[#FCF7F4] p-5 rounded-2xl mb-6 shadow-sm">
      {(Object.entries(options) as [keyof CategoryFilters, { label: string; value: string }[]][])
        .map(([key, opts]) => (
        <div key={key} className="mb-6">
          {/* 레이블 */}
          <span className="block w-full text-[#5C2E1E] font-semibold mb-2">
            {key === 'dish'       && '종류별'}
            {key === 'situation'  && '상황별'}
            {key === 'ingredient' && '재료별'}
            {key === 'method'     && '방법별'}
            {key === 'cookingTime' && '조리시간'}
            {key === 'difficulty'  && '난이도'}
          </span>

          {/* 옵션 버튼들 */}
          <div className="flex flex-wrap gap-2">
            {opts.map(opt => {
              const isActive = value[key] === opt.label
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(key, opt.label)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${isActive
                      ? 'bg-[#F15A24] text-white shadow-md'
                      : 'bg-[#FFF2E5] text-[#5C2E1E] hover:bg-[#FFE2CA] hover:shadow-sm'
                    }
                  `}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryFilter
