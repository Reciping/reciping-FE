import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import slide1 from '@assets/splash1.png';
import slide2 from '@assets/splash2.png';
import slide3 from '@assets/splash3.png';

const slides = [
  {
    image: slide1,
    leftText: '보다 쉽게 레시피를 검색하는',
    rightText: '통합 레시피 검색 플랫폼',
  },
  {
    image: slide2,
    leftText: '내가 가진 재료로',
    rightText: '어떤 요리를 할 수 있을까?',
  },
  {
    image: slide3,
    leftText: '이제 요리도',
    rightText: '레시핑으로 시작하세요!',
  },
];

export default function Splash() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/'); // 메인 페이지 경로로 이동
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      // 첫 번째 슬라이드에서 뒤로 가기 버튼을 눌렀을 때의 동작
      // 예: 앱 종료 또는 이전 페이지로 이동
      navigate(-1); // 이전 페이지로 이동
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#e65328] flex flex-col items-center justify-center text-white overflow-hidden">
      <button
        className="absolute top-4 right-4 text-sm font-semibold"
        onClick={() => navigate('/')}
      >
        skip
      </button>

      <h1 className="text-white text-3xl font-bold mb-4">
        <span className="inline-block w-4 h-4 rounded-full bg-white mr-2 align-middle" />
        reciping<span className="text-white">.</span>
      </h1>

      <div className="flex items-center justify-center mb-4 px-6">
        <p className="text-center text-base">{slides[current].leftText}</p>
      </div>

      <img
        src={slides[current].image}
        alt={`slide-${current}`}
        className="w-52 h-52 object-contain my-4 transform rotate-2"
      />

      <div className="flex items-center justify-center px-6">
        <p className="text-center text-base">{slides[current].rightText}</p>
      </div>

      <div className="flex mt-8 gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={clsx(
              'w-4 h-2 rounded-full',
              current === index ? 'bg-black' : 'bg-white/60'
            )}
          />
        ))}
      </div>

      {/* 뒤로 가기 버튼 */}
      {current > 0 && (
        <button
          onClick={handleBack}
          className="absolute left-6 bottom-1/3 text-3xl font-bold"
        >
          &lt;
        </button>
      )}

      {/* 앞으로 가기 버튼 */}
      <button
        onClick={handleNext}
        className="absolute right-6 bottom-1/3 text-3xl font-bold"
      >
        &gt;
      </button>
    </div>
  );
}
