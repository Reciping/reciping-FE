// src/pages/Login/index.tsx
import React from 'react'

const Login = () => {
  return (
    <div className="h-screen bg-[#F15A24] text-white flex flex-col justify-center items-center space-y-4">
      <div className="text-4xl font-bold mb-6">
        <span className="bg-white text-[#F15A24] rounded-full w-4 h-4 inline-block mr-2" />
        reciping.
      </div>
      <button className="bg-white text-[#F15A24] font-semibold px-6 py-2 rounded-full">로그인하기</button>
      <div className="text-sm mt-2">또는</div>
      <p className="text-sm">아직 reciping 회원이 아니신가요?</p>
      <p className="text-sm mb-2">회원가입하면 + 5000P !</p>
      <button className="bg-white text-[#F15A24] px-6 py-2 rounded-full">회원가입</button>
      <button className="underline text-sm mt-2">나중에 할게요</button>
    </div>
  )
}

export default Login
