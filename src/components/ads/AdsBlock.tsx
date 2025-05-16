import React, { useEffect, useState } from 'react'
import { Ad } from '../../api/adsApi'   // ★ 변경

interface Props {
  ad: Ad | null
}

const AdsBlock: React.FC<Props> = ({ ad }) => {
  if (!ad) return null
  return (
    <a
      href={ad.targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full"
    >
      <img
        src={ad.imageUrl}
        alt={ad.title}
        className="w-full h-full object-cover rounded-2xl"
      />
    </a>
  )
}


export default AdsBlock
