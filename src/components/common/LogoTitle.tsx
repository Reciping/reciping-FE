import React from 'react'
import { Link } from 'react-router-dom'

const LogoTitle = () => {
  return (
    <div className = "w-full flex justify-center mb-4">
      <Link
        to="/home"
        className="text-6xl font-bold text-[#F15A24] flex items-center"
      >
        {/* 기존 span + 텍스트 */}
        <span className="bg-[#F15A24] text-white rounded-full w-4 h-4 inline-block mr-2" />
        reciping.
      </Link>
    </div>

  )
}

export default LogoTitle