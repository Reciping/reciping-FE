import React from 'react'
import { Link } from 'react-router-dom'

const LogoTitle = () => {
  return (
    <Link
      to="/home"
      className="inline-block text-6xl font-bold text-[#F15A24] mb-4"
    >
      {/* 기존 span + 텍스트 */}
      <span className="bg-[#F15A24] text-white rounded-full w-4 h-4 inline-block mr-2" />
      reciping.
    </Link>
  )
}

export default LogoTitle