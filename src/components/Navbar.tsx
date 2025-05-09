import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const isLoggedIn = !!token

  const handleWrite = () => {
    if (isLoggedIn) {
      navigate('/write')
    } else {
      alert('로그인 후 이용해주세요.')
    }
  }

  const handleProfile = () => {
    if (isLoggedIn) {
      navigate('/profile')
    } else {
      alert('로그인 후 이용해주세요.')
    }
  }

  return (
    <div className="w-full bg-[#F15A24] text-white py-3 px-6 flex justify-end gap-6 text-sm font-semibold">
      <button onClick={handleWrite}>레시피 남기기</button>
      <button>이벤트 확인하기</button>
      <button>QnA</button>
      <button onClick={handleProfile} className="flex items-center gap-1">
        <span className="text-lg">👤</span> Profile
      </button>
    </div>
  )
}

export default Navbar
