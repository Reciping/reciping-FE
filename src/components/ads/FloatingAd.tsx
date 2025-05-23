
// src/components/ads/FloatingAd.tsx
import React from 'react'

interface FloatingAdProps {
  position: 'left' | 'right'
  imageUrl: string
  linkUrl?: string
}

const FloatingAd: React.FC<FloatingAdProps> = ({ position, imageUrl, linkUrl }) => {
  const baseClasses = 'fixed top-24 z-40 w-32 hidden xl:block'
  const sideClass = position === 'left' ? 'left-4' : 'right-4'

  return (
    <div className={`${baseClasses} ${sideClass}`}>
      <a href={linkUrl ?? '#'} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt="광고" className="w-full h-auto rounded-lg shadow" />
      </a>
    </div>
  )
}

export default FloatingAd
