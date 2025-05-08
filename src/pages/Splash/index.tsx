// src/pages/Splash/index.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import splash1 from '../../assets/splash1.png'
import splash2 from '../../assets/splash2.png'
import splash3 from '../../assets/splash3.png'

const Splash = () => {
  const navigate = useNavigate()

  // 슬라이드 종료 후 자동 이동
  const handleSlideEnd = () => {
    setTimeout(() => {
      navigate('/login')
    }, 500)
  }

  return (
    <div className="w-full h-screen bg-[#F15A24] flex flex-col justify-between items-center px-4 py-6 relative text-white">
      {/* 로고 + skip */}
      <div className="flex justify-between items-center w-full">
        <div className="text-3xl font-bold">
          <span className="bg-white text-[#F15A24] rounded-full w-4 h-4 inline-block mr-2" />
          reciping.
        </div>
        <button onClick={() => navigate('/login')} className="text-sm underline">skip</button>
      </div>

      {/* 슬라이드 */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={false}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === 2) handleSlideEnd()
        }}
        className="flex-1 w-full mt-10"
      >
        <SwiperSlide>
          <div className="flex flex-col items-center text-center">
            <img src={splash1} alt="splash1" className="w-40 h-40 mb-6 mx-auto" />
            <p>보다 쉽게 레시피를 검색하는</p>
            <p className="font-semibold mt-1">통합 레시피 검색 플랫폼</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center text-center">
            <img src={splash2} alt="splash2" className="w-40 h-40 mb-6 mx-auto" />
            <p>냉장고에 있는 재료만 입력해도</p>
            <p className="font-semibold mt-1">만들 수 있는 레시피를 추천해줘요</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center text-center">
            <img src={splash3} alt="splash3" className="w-40 h-40 mb-6 mx-auto" />
            <p>회원들과 내 레시피를 공유하고</p>
            <p className="font-semibold mt-1">AI기반 개인 맞춤 추천 레시피를 받아봐요</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Splash
