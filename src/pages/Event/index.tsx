import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import PageLayout from '../../components/PageLayout'
import ContentWrapper from '../../components/ContentWrapper'
import recipingFront from '../../assets/recipingFront.png'
import Footer from '../../components/Footer'

// ✨ API 함수 import
import { getEvents, EventItem } from '../../api/eventApi'

const EventPage: React.FC = () => {
  const navigate = useNavigate()

  // ✨ API로 불러온 이벤트 상태
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getEvents({
          page: 0,
          size: 10,
          event_type: 'FLASH_SALE',
          is_deleted: false,
        })
        setEvents(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <PageLayout>
      <Navbar />

      <ContentWrapper className="mt-8 mb-8">
        {/* 상단 뒤로가기 + 제목 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/")}
            className="text-lg text-gray-600 hover:text-black"
          >
            ←
          </button>
          <h2 className="text-lg font-bold">EVENT</h2>
          <div className="w-6" />
        </div>

        <h3 className="text-base font-semibold mb-4">진행중인 이벤트 🎉</h3>

        {/* 로딩 상태 */}
        {loading && <p className="text-center text-gray-500">이벤트 불러오는 중...</p>}

        {/* 에러 상태 */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* 이벤트 리스트 */}
        {!loading && !error && (
          <ul className="divide-y">
            {events.map((evt) => (
              <li key={evt.id} className="flex items-center py-3">
                {/* 미리보기 이미지 */}
                <img
                  src={`${import.meta.env.VITE_API_BASE}/${evt.previewImage.filePath}/${evt.previewImage.keyName}`}
                  alt={evt.title}
                  className="w-12 h-6 object-cover rounded-full mr-4"
                />
                <span className="text-sm flex-1">{evt.title}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 페이지네이션 (예시 고정) */}
        <div className="mt-6 text-center text-sm text-gray-600">
          &lt; 1 / 1 &gt;
        </div>
      </ContentWrapper>

      {/* 캐릭터 이미지 */}
      <img
        src={recipingFront}
        alt="reciping 캐릭터"
        className="absolute bottom-4 right-8 w-40"
      />
      <Footer />
    </PageLayout>
  )
}

export default EventPage