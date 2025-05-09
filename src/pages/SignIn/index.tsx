// src/pages/SignIn/index.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signIn } from "../../api/authApi"

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const res = await signIn(form)
      const token = res.headers['authorization']
      if (token) {
        localStorage.setItem('token', token) // 세션 유지용
        alert('로그인 성공!')
        navigate('/') // 원하는 경로로 이동
      } else {
        alert('토큰이 없습니다')
      }
    } catch (err) {
      console.error(err)
      alert('로그인 실패')
    }
  }

  return (
    <div className="h-screen bg-[#FEEFEF] flex flex-col justify-center items-center px-4">
      <p className="text-[#F15A24] font-bold mb-6">회원 정보를 입력하세요 :)</p>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-72 px-4 py-3 mb-6 rounded-full bg-[#F28564] text-white placeholder-white"
      />

      <button
        onClick={handleSubmit}
        className="bg-[#F15A24] text-white w-72 py-3 rounded-full font-semibold"
      >
        Sign in !
      </button>

      <div className="absolute bottom-5 right-5 text-[#F15A24] text-sm text-right font-bold">
        <span className="text-2xl">●</span> reciping.<br />
        <span className="text-xs">AI 기반 통합 레시피 검색 플랫폼</span>
      </div>
    </div>
  )
}

export default SignIn

  