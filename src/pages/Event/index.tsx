import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../components/layout/Navbar'
import PageLayout from '../../components/layout/PageLayout'
import ContentWrapper from '../../components/common/ContentWrapper'
import recipingFront from '../../assets/recipingFront.png'
import Footer from '../../components/common/Footer'


const EventPage: React.FC = () => {
  const navigate = useNavigate()

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
        {<p className="text-center text-gray-500">이벤트 불러오는 중...</p>}

        {/* 에러 상태 */}
        {<p className="text-center text-red-500">{}</p>}

        {/* 이벤트 리스트 */}
        { (
          <ul className="divide-y">
            
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