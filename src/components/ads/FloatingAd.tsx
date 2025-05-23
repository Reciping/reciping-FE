// src/components/ads/FloatingAd.tsx
import React, { useEffect, useState } from 'react'

interface FloatingAdProps {
  position: 'left' | 'right'
  imageUrl: string
  linkUrl?: string
}

const FloatingAd: React.FC<FloatingAdProps> = ({ position, imageUrl, linkUrl }) => {
  const [top, setTop] = useState<number>(window.innerHeight / 2 - 100) // 광고 높이 반영

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const targetTop = scrollY + window.innerHeight / 2 - 100 // 광고 높이 고려
      setTop(prevTop => prevTop + (targetTop - prevTop) * 0.1) // 부드럽게 이동
    }

    const interval = setInterval(handleScroll, 16) // 약 60fps

    return () => clearInterval(interval)
  }, [])

  const baseClasses = 'fixed z-40 w-32 hidden xl:block transition-all duration-200 ease-out'
  const sideClass = position === 'left' ? 'left-16' : 'right-16'

  return (
    <div className={`${baseClasses} ${sideClass}`} style={{ top }}>
      <a href={linkUrl ?? '#'} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt="광고" className="w-full h-auto rounded-lg shadow" />
      </a>
    </div>
  )
}

export default FloatingAd
