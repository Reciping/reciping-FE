// src/components/category/CategoryFilter.tsx
import React, { useState, useEffect } from 'react'
import { CategoryFilters } from './CategoryFilter.types'
import { getCategoryOptions } from '../../services/recipeService'
import { CategoryOptionsResponse, CategoryOption } from '../../types/recipe'

interface Props {
  value: CategoryFilters
  onChange: (newFilters: CategoryFilters) => void
}

// API 응답 키를 CategoryFilters 키에 맞게 변환
const normalizeOptions = (raw: CategoryOptionsResponse) => ({
  dishType:       raw.dishType,
  situationType:  raw.situationType,
  ingredientType: raw.ingredientType,
  methodType:     raw.methodType,
  cookingTime:    raw.cookingTime,
  difficulty:     raw.difficulty,
})

const CategoryFilter: React.FC<Props> = ({ value, onChange }) => {
  const [options, setOptions] = useState<Partial<
    Record<keyof CategoryFilters, { label: string; value: string }[]>
  > | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ✅ 마운트 시 카테고리 옵션 요청
  useEffect(() => {
    setLoading(true)
    getCategoryOptions()
      .then(res => {
        setOptions(normalizeOptions(res))
      })
      .catch(err => {
        setError('카테고리 옵션을 불러오는 중 오류가 발생했습니다.')
      })
      .finally(() => setLoading(false))
  }, [])

  // ✅ 버튼 클릭 시 필터 상태 업데이트
  const handleSelect = (key: keyof CategoryFilters, label: string) => {
    onChange({
      ...value,
      [key]: value[key] === label ? '' : label,
    })
  }

  if (loading) return <p className="p-4 text-center">옵션을 불러오는 중…</p>
  if (error)   return <p className="p-4 text-center text-red-500">{error}</p>
  if (!options) return null

  return (
    <div className="bg-[#FCF7F4] p-5 rounded-2xl mb-6 shadow-sm">
      {(Object.entries(options) as [keyof CategoryFilters, any][])
        .map(([key, opts]) => (
        <div key={key} className="mb-6">
          {/* 레이블 */}
          <span className="block w-full text-[#5C2E1E] font-semibold mb-s2">
            {key === 'dishType'       && '종류별'}
            {key === 'situationType'  && '상황별'}
            {key === 'ingredientType' && '재료별'}
            {key === 'methodType'     && '방법별'}
            {key === 'cookingTime'    && '조리시간'}
            {key === 'difficulty'     && '난이도'}
          </span>

          {/* 옵션 버튼 */}
          <div className="flex flex-wrap gap-2">
            {Array.isArray(opts) && opts.map((opt: any) => {
              const isActive = value[key] === opt.label
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(key, opt.label)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${isActive
                      ? 'bg-[#F15A24] text-white shadow-md'
                      : 'bg-[#FFF2E5] text-[#5C2E1E] hover:bg-[#FFE2CA] hover:shadow-sm'}
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