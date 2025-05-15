
//AdsBlock.ts
import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Ad {
  id: number
  title: string
  imageUrl: string
  targetUrl: string
}

const AdsBlock = () => {
  const [ad, setAd] = useState<Ad | null>(null)

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/ads/public/serve?position=MAIN_TOP')
      .then(res => {
        if (res.data.length > 0) {
          setAd(res.data[0]) // 첫 번째 광고만 선택
        }
      })
      .catch(err => console.error(err))
  }, [])

  if (!ad) return null // 광고 없으면 아무것도 렌더링 안함

  return (
    <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer">
      <img src={ad.imageUrl} alt={ad.title} className="h-24 rounded shadow" />
    </a>
  )
}

export default AdsBlock
