import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Write = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#FEEFEF] min-h-screen">
      {/* 상단 메뉴바 */}
      <Navbar />

      {/* 작성 폼 영역 */}
      <div className="max-w-[700px] mx-auto p-6 mt-6 bg-white rounded-xl shadow-md">
        {/* 뒤로가기 아이콘 또는 버튼 */}
        <button className="mb-4 text-lg text-gray-600" onClick={() => navigate(-1)}>{'←'}</button>

        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목을 입력하세요."
          className="w-full p-3 mb-4 rounded-full bg-[#F9F9F9] focus:outline-none"
        />

        {/* 파일 업로드 */}
        <input
          type="file"
          className="w-full mb-4 text-sm"
        />

        {/* 본문 작성 */}
        <textarea
          placeholder="본문을 입력하세요."
          rows={10}
          className="w-full p-4 rounded-xl bg-[#F9F9F9] focus:outline-none resize-none mb-4"
        />

        {/* 해시태그 */}
        <input
          type="text"
          placeholder="# 해시태그를 입력하세요."
          className="w-full p-3 rounded-full bg-[#F9F9F9] focus:outline-none mb-6"
        />

        {/* 작성 버튼 */}
        <div className="flex justify-center">
          <button className="bg-[#F15A24] text-white font-bold py-2 px-6 rounded-full">
            발행하기
          </button>
        </div>
      </div>

      {/* 푸터 로고 (선택 사항) */}
      <div className="mt-12 text-center text-[#F15A24] font-bold">
        <span className="bg-[#F15A24] text-white rounded-full w-3 h-3 inline-block mr-2" />
        reciping.
        <p className="text-xs font-normal text-[#F15A24] mt-1">AI 기반 통합 레시피 검색 플랫폼</p>
      </div>
    </div>
  )
}

export default Write
