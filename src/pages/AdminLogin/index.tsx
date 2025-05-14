// src/pages/AdminLogin/index.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import ContentWrapper from '../../components/common/ContentWrapper'

const AdminLogin: React.FC = () => {
  const navigate = useNavigate()
  const [adminId, setAdminId] = useState('')
  const [adminPw, setAdminPw] = useState('')

  const handleSubmit = () => {
    // 임시 인증 로직: ID/PW 모두 'qwer'일 때만 통과
    if (adminId === 'qwer' && adminPw === 'qwer') {
      // 로그인 성공 시 홈으로(또는 관리 대시보드로) 이동
      navigate('/')
    } else {
      alert('관리자 아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <PageLayout>
      {/* 흰 배경 중앙 카드 */}
      <ContentWrapper className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#F15A24] mb-2">reciping.</h1>
        <p className="text-sm text-gray-600 mb-8">Admin Service 관리 페이지</p>

        {/* ID 입력 */}
        <input
          type="text"
          placeholder="ID"
          value={adminId}
          onChange={e => setAdminId(e.target.value)}
          className="w-72 px-4 py-3 mb-4 rounded-full bg-[#F28564] text-white placeholder-white focus:outline-none"
        />

        {/* PW 입력 */}
        <input
          type="password"
          placeholder="password"
          value={adminPw}
          onChange={e => setAdminPw(e.target.value)}
          className="w-72 px-4 py-3 mb-6 rounded-full bg-[#F28564] text-white placeholder-white focus:outline-none"
        />

        {/* 로그인 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-36 py-2 bg-[#F15A24] text-white font-bold rounded-full"
        >
          Admin Login
        </button>
      </ContentWrapper>
    </PageLayout>
  )
}

export default AdminLogin
