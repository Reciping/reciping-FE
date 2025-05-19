import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageLayout from '../../components/layout/PageLayout'
import ContentWrapper from '../../components/common/ContentWrapper'
import Footer from '../../components/common/Footer'
import AdminSidebar from '../../components/admin/AdminSidebar'

const MAX_CONTENT_LENGTH = 10000

const AdminEventWrite: React.FC = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
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
      const formData = new FormData()
      formData.append('title', title.trim())
      formData.append('content', content.trim())
      if (file) formData.append('file', file)

      // 👉 여기에 실제 이벤트 생성 API 호출 로직 삽입
      // await createEvent(formData);

      alert('이벤트가 성공적으로 등록되었습니다.')
      navigate('/admin/event') // 이벤트 목록으로 이동
    } catch (err) {
      console.error(err)
      alert('이벤트 등록에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageLayout>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          <ContentWrapper>
            <button
              onClick={() => navigate(-1)}
              className="mb-4 text-lg text-gray-600 hover:text-black"
              aria-label="뒤로가기"
            >
              ←
            </button>

            <input
              type="text"
              placeholder="이벤트 제목을 입력하세요."
              className="w-full p-3 mb-4 rounded-full bg-[#F9F9F9] focus:outline-none"
              value={title}
              onChange={handleTitleChange}
            />

            <textarea
              placeholder="이벤트 본문을 입력하세요."
              rows={10}
              maxLength={MAX_CONTENT_LENGTH}
              className="w-full p-4 rounded-xl bg-[#F9F9F9] focus:outline-none resize-none mb-1"
              value={content}
              onChange={handleContentChange}
            />
            <div className="text-right text-xs text-gray-500 mb-4">
              {content.length.toLocaleString()} / {MAX_CONTENT_LENGTH.toLocaleString()}
            </div>

            <input
              type="file"
              className="w-full mb-6 text-sm"
              onChange={handleFileChange}
            />

            <div className="flex justify-center">
              <button
                onClick={handlePublish}
                disabled={submitting}
                className={`
                  ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F15A24] hover:opacity-90'}
                  text-white font-bold py-2 px-6 rounded-full transition
                `}
              >
                {submitting ? '전송 중…' : '이벤트 발행하기'}
              </button>
            </div>
          </ContentWrapper>
          <Footer />
        </main>
      </div>
    </PageLayout>
  )
}

export default AdminEventWrite
