import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import PageLayout from '../../components/PageLayout'
import ContentWrapper from '../../components/ContentWrapper'
import Footer from '../../components/Footer'

const Write = () => {
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [hashtags, setHashtags] = useState<string[]>([])
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }

  const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtags(e.target.value.split(',').map(tag => tag.trim())) // 해시태그 입력 시 쉼표로 구분
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 본문을 입력해주세요.')
      return
    }
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (file) formData.append('file', file)
      hashtags.forEach(tag => formData.append('hashtags', tag))
  
      const token = localStorage.getItem('token')
  
      await axios.post('http://몰?루/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
  
      alert('레시피가 성공적으로 등록되었습니다.')
      navigate('/home')
  
    } catch (err) {
      console.error(err)
      alert('레시피 등록에 실패했습니다.')
    }
  }

  return (
    <PageLayout>
      {/* 상단 메뉴바 */}
      <Navbar />

      {/* 작성 폼 영역 */}
      <ContentWrapper>

        {/* 뒤로가기 아이콘 또는 버튼 */}
        <button 
          onClick={() => navigate("/")}
          className="mb-4 text-lg text-gray-600 hover:text-black cursor-pointer" 
          aria-label="뒤로가기"
        >
          ←
        </button>

        {/* 제목 입력 */}
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

        {/* 본문 작성 */}
        <textarea
          placeholder="본문을 입력하세요."
          rows={10}
          className="w-full p-4 rounded-xl bg-[#F9F9F9] focus:outline-none resize-none mb-4"
          value={content}
          onChange={handleContentChange}
        />

        {/* 해시태그 */}
        <input
          type="text"
          placeholder="# 해시태그를 입력하세요."
          className="w-full p-3 rounded-full bg-[#F9F9F9] focus:outline-none mb-6"
          value={hashtags.join(', ')}
          onChange={handleHashtagsChange}
        />

        {/* 작성 버튼 */}
        <div className="flex justify-center">
          <button className="bg-[#F15A24] text-white font-bold py-2 px-6 rounded-full" onClick={handlePublish}>
            발행하기
          </button>
        </div>
      </ContentWrapper>
      <Footer />
    </PageLayout>
  )
}

export default Write
