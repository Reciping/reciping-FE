// src/pages/Write/index.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from '../../api/recipesApi'  // FormData + X-USER-ID 헤더 처리
import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/layout/Navbar'
import ContentWrapper from '../../components/common/ContentWrapper'
import Footer from '../../components/common/Footer'

const MAX_CONTENT_LENGTH = 10000

const Write: React.FC = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [tagInput, setTagInput] = useState('')     // 해시태그 입력
  const [submitting, setSubmitting] = useState(false)

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

  const handlePublish = async () => {
    // 1) 기본 검증
    if (!title.trim() || !content.trim()) {
      alert('제목과 본문을 입력해주세요.')
      return
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      alert(`본문은 최대 ${MAX_CONTENT_LENGTH.toLocaleString()}자까지 입력 가능합니다.`)
      return
    }
    if (submitting) return

    setSubmitting(true)
    try {
      // 2) 해시태그 배열로 변환
      const tags = tagInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0)

      // 3) FormData 구성
      const formData = new FormData()

      // 🔹 JSON 필드를 Blob 으로 감싸서 requestDto에 추가
      const dto = { title: title.trim(), content: content.trim(), tags }
      formData.append(
        'requestDto',
        new Blob([JSON.stringify(dto)], { type: 'application/json' })
      )

      // 🔹 파일이 있으면 'file' 필드로 추가
      if (file) {
        formData.append('file', file)
      }

      // 4) API 호출
      //    createRecipe(formData, userId) 내부에서 X-USER-ID 헤더를 붙입니다.
      const { id: newRecipeId } = await createRecipe(formData, 1123)

      alert('레시피가 성공적으로 등록되었습니다.')
      navigate(`/recipe/${newRecipeId}`)
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

        {/* 파일 업로드 */}
        <input
          type="file"
          className="w-full mb-4 text-sm"
          onChange={handleFileChange}
        />

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

        {/* 해시태그 입력(콤마 허용) */}
        <input
          type="text"
          placeholder="# 해시태그를 쉼표로 구분하여 입력하세요"
          className="w-full p-3 rounded-full bg-[#F9F9F9] focus:outline-none mb-6"
          value={tagInput}
          onChange={handleTagInputChange}
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