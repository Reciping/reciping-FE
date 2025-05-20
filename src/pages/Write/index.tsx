// src/pages/Write/index.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import PageLayout from '../../components/layout/PageLayout'
import Navbar         from '../../components/layout/Navbar'
import ContentWrapper from '../../components/common/ContentWrapper'
import Footer         from '../../components/common/Footer'
import { CategoryOptionsResponse, RecipeCreateRequest } from '../../types/recipe'
import { getCategoryOptions, createRecipe } from '../../services/recipeService'


const MAX_CONTENT_LENGTH = 10000

// 카테고리 키 타입
type CategoryKey = keyof CategoryOptionsResponse

const Write: React.FC = () => {
  const navigate = useNavigate()

  // 입력 상태
  const [title, setTitle]       = useState('')
  const [content, setContent]   = useState('')
  const [file, setFile]         = useState<File | null>(null)
  const [tagInput, setTagInput] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // --- 카테고리 옵션 & 선택 ---
  const [categoryOptions, setCategoryOptions] = useState<CategoryOptionsResponse>({
    dishType:       [],
    situationType:  [],
    ingredientType: [],
    methodType:     [],
    cookingTime:    [],
    difficulty:    []
  })
  const [category, setCategory] = useState<Record<CategoryKey, string>>({
    dishType:       'ALL',
    situationType:  'ALL',
    ingredientType: 'ALL',
    methodType:     'ALL',
    cookingTime:    'ALL',
    difficulty:    'ALL'
  })

  // 1) 마운트 시 카테고리 옵션 fetch
  useEffect(() => {
    getCategoryOptions()
      .then(opts => {
        setCategoryOptions(opts)
        // 기본값으로 ALL(전체)이 있으면 그대로, 없으면 첫 번째 value 사용
        setCategory(prev => {
          const next: typeof prev = {} as any
          (Object.keys(opts) as CategoryKey[]).forEach(key => {
            next[key] =
              prev[key] === 'ALL' && opts[key].some(o => o.value === 'ALL')
                ? 'ALL'
                : opts[key][0]?.value ?? ''
          })
          return next
        })
      })
      .catch(err => {
        console.error('카테고리 옵션 불러오기 실패', err)
      })
  }, [])

  // 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }
  const handleCategoryChange = (key: CategoryKey) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(prev => ({ ...prev, [key]: e.target.value }))
  }

  // 발행하기
  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 본문을 입력해주세요.')
      return
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      alert(`본문은 최대 ${MAX_CONTENT_LENGTH.toLocaleString()}자까지 가능합니다.`)
      return
    }
    if (submitting) return

    setSubmitting(true)
    try {
      const tags = tagInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t)

      const dto: RecipeCreateRequest = {
        title:   title.trim(),
        content: content.trim(),
        tags,
        dishType:       category.dishType,
        situationType:  category.situationType,
        ingredientType: category.ingredientType,
        methodType:     category.methodType, 
        cookingTime: categoryOptions.cookingTime.find(opt => opt.value === category.cookingTime)?.label || '',
        difficulty: categoryOptions.difficulty.find(opt => opt.value === category.difficulty)?.label || '',
      }
      console.log("[dto] ", dto)

      const success = await createRecipe(dto, file, 1123)
      if (success) {
        alert('레시피가 성공적으로 등록되었습니다.')
        navigate(`/`)
      } else {
        alert('레시피 등록에 실패했습니다.')
      }
    } catch (err) {
      console.error(err)
      alert('레시피 등록에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageLayout>
      <Navbar />
      <ContentWrapper>
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-lg text-gray-600 hover:text-black"
          aria-label="뒤로가기"
        >
          ←
        </button>

        {/* 제목 */}
        <input
          type="text"
          placeholder="제목을 입력하세요."
          className="w-full p-3 mb-4 rounded-full bg-[#F9F9F9] focus:outline-none"
          value={title}
          onChange={handleTitleChange}
        />

        {/* 카테고리 드롭다운 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {(Object.keys(categoryOptions) as CategoryKey[]).map(key => (
            <select
              key={key}
              name={key}
              value={category[key]}
              onChange={handleCategoryChange(key)}
              className="w-full p-3 rounded-full bg-[#F9F9F9] focus:outline-none"
            >
              {categoryOptions[key].map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* 본문 */}
        <textarea
          placeholder="본문을 입력하세요."
          rows={10}
          maxLength={MAX_CONTENT_LENGTH}
          className="w-full p-4 rounded-xl bg-[#F9F9F9] focus:outline-none resize-none mb-1"
          value={content}
          onChange={handleContentChange}
        />
        <div className="text-right text-xs text-gray-500 mb-4">
          {content.length.toLocaleString()} / {MAX_CONTENT_LENGTH.toLocaleString()}
        </div>

        {/* 해시태그 */}
        <input
          type="text"
          placeholder="# 해시태그를 쉼표로 구분하여 입력하세요"
          className="w-full p-3 rounded-full bg-[#F9F9F9] focus:outline-none mb-6"
          value={tagInput}
          onChange={handleTagInputChange}
        />

        {/* 파일 업로드 */}
        <input
          type="file"
          className="w-full mb-4 text-sm"
          onChange={handleFileChange}
        />

        {/* 발행하기 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handlePublish}
            disabled={submitting}
            className={`
              ${submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#F15A24] hover:opacity-90'
              }
              text-white font-bold py-2 px-6 rounded-full transition
            `}
          >
            {submitting ? '전송 중…' : '발행하기'}
          </button>
        </div>
      </ContentWrapper>
      <Footer />
    </PageLayout>
  )
}

export default Write