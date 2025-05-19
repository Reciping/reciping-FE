// src/pages/SignUp/index.tsx
import { useState } from "react"
import { signUp } from "../../services/authService"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nickname: '',
    email: '',
    password: '',
    interestKeyword: '',
    sex: '',
    age: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      await signUp(form)
      alert('회원가입 성공!')
      navigate('/signin')
    } catch (err) {
      console.error(err)
      alert('회원가입 실패')
    }
  }

  return (
    <div className="h-screen bg-[#FEEFEF] flex flex-col justify-center items-center px-4">
      <p className="text-[#F15A24] font-bold mb-6">가입자의 회원 정보를 입력해주세요 :)</p>

      <input
        type="text"
        name="nickname"
        value={form.nickname}
        onChange={handleChange}
        placeholder="별명(4글자 이내)"
        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white"
      />

      <select
        name="interestKeyword"
        value={form.interestKeyword}
        onChange={handleChange}
        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white"
      >
        <option value="">키워드를 선택하세요</option>
        <option value="SOLO_COOKING">자취요리</option>
        <option value="FINE_DINING">파인다이닝</option>
        <option value="DIET">다이어트</option>
        <option value="HEALTHY">건강식</option>
        <option value="VEGAN">채식</option>
        <option value="KIDS">아이요리</option>
      </select>

      <select
        name="sex"
        value={form.sex}
        onChange={handleChange}
        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white"
      >
        <option value="">성별을 선택하세요</option>
        <option value="MALE">남성</option>
        <option value="FEMALE">여성</option>
      </select>

      <select
        name="age"
        value={form.age}
        onChange={handleChange}
        className="w-72 px-4 py-3 mb-6 rounded-full bg-[#F28564] text-white"
      >
        <option value="">나이를 선택하세요</option>
        <option value="TEENS">10대</option>
        <option value="TWENTIES">20대</option>
        <option value="THIRTIES">30대</option>
        <option value="FORTIES">40대</option>
        <option value="FIFTIES">50대</option>
        <option value="SIXTIES">60대</option>
        <option value="SEVENTIES_PLUS">70대 이상</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-[#F15A24] text-white w-72 py-3 rounded-full font-semibold"
      >
        Sign up !
      </button>

      <div className="absolute bottom-5 right-5 text-[#F15A24] text-sm text-right font-bold">
        <span className="text-2xl">●</span> reciping.<br />
        <span className="text-xs">AI 기반 통합 레시피 검색 플랫폼</span>
      </div>
    </div>
  )
}

export default SignUp
