import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handleWrite = () => {
    navigate('/write')
  }

  return (
    <div className="w-full bg-[#F15A24] text-white py-3 px-6 flex justify-end gap-6 text-sm font-semibold">
      <button onClick={handleWrite}>레시피 남기기</button>
      <button>이벤트 확인하기</button>
      <button>QnA</button>
      <button className="flex items-center gap-1">
        <span className="text-lg">👤</span> Profile
      </button>
    </div>
  )
}

export default Navbar
