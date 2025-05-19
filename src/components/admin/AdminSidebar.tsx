import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    alert('관리자 로그아웃')
    navigate('/adminlogin')
  }

  return (
    <aside className="w-64 h-screen bg-[#FAFAFA] border-r shadow flex flex-col justify-between">
      <div>
        {/* 로고 */}
        <h1 className="text-2xl font-bold text-orange-500 px-6 py-4">🍳 reciping</h1>

        {/* 메뉴 목록 */}
        <nav className="flex flex-col px-4 gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-left hover:bg-orange-100 bg-white shadow text-gray-700 font-semibold"
            onClick={() => navigate('/admin/event')}
          >
            📅 이벤트 목록 보기
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-left hover:bg-orange-100 bg-white shadow text-gray-700 font-semibold"
            onClick={() => navigate('/admin/ad')}
          >
            📢 광고 목록 보기
          </button>

          {/* 구분선 */}
          <div className="border-t border-gray-300 my-2"></div>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-left hover:bg-orange-100 bg-white shadow text-gray-700 font-semibold"
            onClick={() => navigate('/admin/event/write')}
          >
            ✍️ 이벤트 글 작성
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-left hover:bg-orange-100 bg-white shadow text-gray-700 font-semibold"
            onClick={() => navigate('/admin/ad/write')}
          >
            ✍️ 광고 글 작성
          </button>
        </nav>
      </div>

      {/* 로그아웃 버튼 */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-[#F15A24] text-white font-bold py-2 rounded-full hover:bg-[#e04e1d] transition"
        >
          로그아웃
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
