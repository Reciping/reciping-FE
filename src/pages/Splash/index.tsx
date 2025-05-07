import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import slide1 from '@assets/splash1.png'
import slide2 from '@assets/splash2.png'
import slide3 from '@assets/splash3.png'

const slides = [
  {
    img: slide1,
    textLeft: '보다 쉽게 레시피를 검색하는',
    textRight: '통합 레시피 검색 플랫폼'
  },
  {
    img: slide2,
    textLeft: '냉장고에 있는 재료만 입력해도',
    textRight: '만들 수 있는 레시피를 추천해줘요'
  },
  {
    img: slide3,
    textLeft: '회원들과 내 레시피를 공유하고',
    textRight: 'AI기반 개인 맞춤 추천 레시피를 받아봐요'
  }
] as const

const Intro = () => {
  const [idx, setIdx] = useState(0)
  const nav = useNavigate()

  const next = () => setIdx(i => (i === slides.length - 1 ? i : i + 1))
  const prev = () => setIdx(i => (i === 0 ? i : i - 1))
  const skip = () => nav('/login') // 로그인/회원가입 선택 페이지로 변경 가능

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-brand-500 text-white overflow-hidden">
      {/* 헤더 */}
      <header className="absolute left-6 top-6 flex items-center gap-2 text-white">
        <span className="h-6 w-6 rounded-full bg-white/90" />
        <h1 className="text-2xl font-bold">reciping.</h1>
      </header>
      <button onClick={skip} className="absolute right-6 top-6 text-sm opacity-80 hover:underline">
        skip
      </button>

      {/* 슬라이드 영역 */}
      <div className="relative w-full max-w-2xl overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {slides.map(({ img, textLeft, textRight }) => (
            <div key={img} className="flex w-full flex-col items-center gap-6 px-4">
              <img src={img} alt="" className="h-60 w-auto object-contain" />
              <p className="w-full text-center text-lg font-medium">
                {textLeft}
                <br />
                {textRight}
              </p>
            </div>
          ))}
        </div>

        {/* 좌우 화살표 */}
        {idx > 0 && (
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-brand-700"
          >
            &lt;
          </button>
        )}
        {idx < slides.length - 1 && (
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-brand-700"
          >
            &gt;
          </button>
        )}
      </div>

      {/* 페이지 인디케이터 */}
      <div className="mt-8 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={clsx(
              'h-3 w-3 rounded-full transition-colors',
              i === idx ? 'bg-brand-700' : 'bg-white'
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default Intro