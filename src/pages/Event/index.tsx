import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import recipingFront from '../../assets/recipingFront.png' // 캐릭터 이미지
import PageLayout from '../../components/PageLayout'

// 더미 이벤트 데이터
const DUMMY_EVENTS = [
  { id: 1, title: '회원가입하면 +5000P를 드려요!' },
  { id: 2, title: '매일 자정! 마켓컬리 쿠폰 무료로 뽑아가세요 :-)' },
  { id: 3, title: '회원가입하면 +5000P를 드려요!' },
  { id: 4, title: '매일 자정! 마켓컬리 쿠폰 무료로 뽑아가세요 :-)' },
  { id: 5, title: '회원가입하면 +5000P를 드려요!' }
]

const EventPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <PageLayout>
      {/* 상단 네비게이션 바 */}
      <Navbar />

      {/* 컨텐츠 영역 */}
      <div className="max-w-[700px] mx-auto mt-8 mb-8 relative">
        {/* 카드 박스 */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          {/* 상단 바: 뒤로가기 + 제목 */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-lg text-gray-600 hover:text-black"
            >
              ←
            </button>
            <h2 className="text-lg font-bold">EVENT</h2>
            {/* 빈 영역: 제목 중앙 정렬을 위해 */}
            <div className="w-6" />
          </div>

          {/* 섹션 타이틀 */}
          <h3 className="text-base font-semibold mb-4">
            진행중인 이벤트 🎉
          </h3>

          {/* 이벤트 리스트 */}
          <ul className="divide-y">
            {DUMMY_EVENTS.map((evt) => (
              <li key={evt.id} className="flex items-center py-3">
                {/* 왼쪽 컬러 박스(이미지 대신) */}
                <div
                  className={`w-12 h-6 rounded-full mr-4`}
                  style={{ backgroundColor: evt.id % 2 === 0 ? '#EB6E4B' : '#E57373' }}
                />
                <span className="text-sm flex-1">{evt.title}</span>
              </li>
            ))}
          </ul>

          {/* 페이지네이션 (여기선 1/1 고정) */}
          <div className="mt-6 text-center text-sm text-gray-600">
            &lt; 1 / 1 &gt;
          </div>
        </div>

        {/* 하단 캐릭터 이미지 */}
        <img
          src={recipingFront}
          alt="reciping 캐릭터"
          className="absolute -bottom-2 -right-4 w-40"
        />
      </div>
    </PageLayout>
  )
}

export default EventPage
