import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import slide1 from '@assets/splash1.png'
import slide2 from '@assets/splash2.png'
import slide3 from '@assets/splash3.png'

const slides = [
  {
    image: slide1,
    left: '보다 쉽게 레시피를 검색하는',
    right: '통합 레시피 검색 플랫폼',
  },
  {
    image: slide2,
    left: '냉장고에 있는 재료만 입력해도',
    right: '만들 수 있는 레시피를 추천해줘요',
  },
  {
    image: slide3,
    left: '회원들과 내 레시피를 공유하고',
    right: 'AI 기반 개인 맞춤 레시피를 받아봐요',
  },
] as const

export default function Splash() {
  const [i, set] = useState(0)
  const nav = useNavigate()
  const next = () => (i < slides.length - 1 ? set(i + 1) : nav('/login'))
  const back = () => set(k => Math.max(k - 1, 0))

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-brand-50 text-white overflow-hidden">
      {/* 로고 + skip */}
      <header className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-white" />
        <h1 className="text-2xl font-bold text-brand-500">reciping.</h1>
      </header>
      <button onClick={() => nav('/login')} className="absolute top-6 right-6 text-sm text-brand-500">
        skip
      </button>

      {/* 슬라이드 본문 */}
      <div className="flex w-full max-w-5xl items-center justify-between px-12 select-none">
        <p className="hidden md:block w-1/4 text-center text-lg text-brand-700 leading-snug">
          {slides[i].left}
        </p>

        <img
          src={slides[i].image}
          alt=""
          className="w-64 md:w-72 lg:w-80 object-contain rotate-3 shadow-xl"
        />

        <p className="hidden md:block w-1/4 text-center text-lg text-brand-700 leading-snug">
          {slides[i].right}
        </p>
      </div>

      {/* 모바일 문구 */}
      <div className="mt-6 flex flex-col gap-1 text-center text-base md:hidden text-brand-700">
        <span>{slides[i].left}</span>
        <span>{slides[i].right}</span>
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-20 flex gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={clsx(
              'h-2 rounded-full transition-all duration-300',
              idx === i ? 'w-8 bg-brand-700' : 'w-2 bg-white'
            )}
          />
        ))}
      </div>

      {/* 화살표 */}
      {i > 0 && (
        <button
          onClick={back}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-4xl font-bold text-brand-700"
        >
          &lt;
        </button>
      )}
      <button
        onClick={next}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-4xl font-bold text-brand-700"
      >
        &gt;
      </button>
    </div>
  )
}
