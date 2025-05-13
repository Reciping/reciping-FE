import React, { useEffect, useState } from 'react'

const AdsBlock = () => {
  const [ads, setAds] = useState<string[]>([])

  useEffect(() => {
    // 더미 광고
    setAds(['/ads/ad1.png', '/ads/ad2.png', '/ads/ad3.png'])
  }, [])

  return (
    <div className="bg-white p-4 rounded-lg flex-1 flex items-center overflow-x-auto gap-4 shadow">
      {ads.map((src, i) => (
        <img key={i} src={src} alt={`ad-${i}`} className="h-24 rounded" />
      ))}
    </div>
  )
}

export default AdsBlock
