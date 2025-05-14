// src/pages/AdminLogin/index.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState({ id: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // 임시: ID/PW 둘 다 "qwer" 일 때만 성공
    if (form.id === 'qwer' && form.password === 'qwer') {
      alert('관리자 로그인 성공!')
      navigate('/')  // 로그인 후 홈으로
    } else {
      alert('관리자 아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div className="h-screen bg-[#FEEFEF] flex flex-col justify-center items-center px-4">
      <p className="text-[#F15A24] font-bold mb-6 text-lg">Admin Service 관리 페이지</p>

      {/* ID */}
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={form.id}
        onChange={handleChange}
        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white focus:outline-none"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-72 px-4 py-3 mb-6 rounded-full bg-[#F28564] text-white placeholder-white focus:outline-none"
      />

      {/* Login */}
      <button
        onClick={handleSubmit}
        className="bg-[#F15A24] text-white w-72 py-3 rounded-full font-semibold"
      >
        Admin Login
      </button>

      {/* 하단 로고 */}
      <div className="absolute bottom-5 right-5 text-[#F15A24] text-sm text-right font-bold">
        <span className="text-2xl">●</span> reciping.<br />
        <span className="text-xs">AI 기반 통합 레시피 검색 플랫폼</span>
      </div>
    </div>
  )
}

export default AdminLogin