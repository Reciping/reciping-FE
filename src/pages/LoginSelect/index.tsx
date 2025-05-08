// src/pages/LoginSelect/index.tsx
import { useNavigate } from 'react-router-dom'

const LoginSelect = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen bg-[#F15A24] text-white flex flex-col justify-center items-center px-4">
      {/* 로고 */}
      <div className="text-4xl font-bold mb-10">
        <span className="bg-white text-[#F15A24] rounded-full w-4 h-4 inline-block mr-2" />
        reciping.
      </div>

      {/* 로그인 버튼 */}
      <button onClick={() => navigate('/signin')} className="bg-white text-[#F15A24] font-semibold w-72 py-3 rounded-full mb-6">
        로그인하기
      </button>

      {/* 텍스트 안내 */}
      <div className="text-sm mb-2">또는</div>
      <p className="text-sm mb-1">아직 reciping 회원이 아니신가요?</p>
      <p className="text-sm text-white font-bold mb-4">회원가입하면 + 5000P !</p>

      {/* 회원가입 버튼 */}
      <button onClick={() => navigate('/signup')} className="bg-white text-[#F15A24] font-semibold w-72 py-3 rounded-full mb-3">
        회원가입
      </button>

      {/* 나중에 할게요 버튼 */}
      <button onClick={() => navigate('/home')} className="underline text-sm">나중에 할게요</button>
    </div>
  )
}

export default LoginSelect
