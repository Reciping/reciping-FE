import React from 'react'
import { Ad } from '../../types/ads'

interface Props {
  ad: Ad | null
  className?: string
  aspectRatio?: 'square' | 'wide' | 'tall' | 'auto'
}

const AdsBlock: React.FC<Props> = ({ 
  ad, 
  className = '', 
  aspectRatio = 'wide' 
}) => {
  if (!ad) {
    return (
      <div className={`bg-gray-100 rounded-2xl flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">광고 준비 중</span>
      </div>
    )
  }

  // 종횡비별 스타일 클래스 - 더 명확한 비율 설정
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square'
      case 'wide':
        return 'aspect-[16/9]'
      case 'tall':
        return 'aspect-[9/16]'
      case 'auto':
        return 'h-full'  // 부모 컨테이너의 높이를 따름
      default:
        return 'aspect-[16/9]'
    }
  }

  return (
    <div className={`w-full ${getAspectRatioClass()} ${className}`}>
      <a
        href={ad.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full rounded-2xl overflow-hidden shadow bg-white hover:shadow-lg transition-shadow duration-200"
      >
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            // 부모 요소에 fallback 텍스트 표시
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
                  <span class="text-gray-400 text-sm">광고 이미지 로드 실패</span>
                </div>
              `
            }
          }}
        />
      </a>
    </div>
  )
}

export default AdsBlock