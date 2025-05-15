import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import recipingFront from '../../assets/recipingFront.png' // 캐릭터 이미지 경로
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/common/Footer'
import PageLayout from '../../components/layout/PageLayout'
import ContentWrapper from '../../components/common/ContentWrapper'
import {updateProfile} from '../../api/mypage'

const ProfileEdit = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        nickname: '',
        password: '',
        interestKeyword: '',
        sex: '',
        age: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

   const handleSubmit = async () => {
  if (!form.nickname || !form.password || !form.interestKeyword || !form.sex || !form.age) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  try {
    await updateProfile(form)
    alert('수정이 완료되었습니다.')
    navigate('/profile')
  } catch (err: any) {
    if (err.response?.status === 400) {
      alert(`입력 오류: ${err.response.data.message}`)
    } else {
      alert('수정 중 오류가 발생했습니다.')
    }
  }
}
    return (
        <PageLayout>
            <Navbar />

            <ContentWrapper>
                {/* ✅ 상단 바 (뒤로가기, 타이틀, 로그아웃) */}
                <div className="flex justify-between items-center mb-6">
                    {/* 뒤로가기 */}
                    <button
                    onClick={() => navigate(-1)}
                    className="mb-4 text-gray-600 hover:text-black text-lg p-2 rounded"
                    aria-label="뒤로가기"
                    >
                    ←
                    </button>

                    {/* 제목 */}
                    <h2 className="text-center text-xl font-bold mb-6">My profile</h2>

                    {/* 오른쪽 비움 (공간 유지용) */}
                    <div className="w-6" />
                </div>

                {/* 수정 입력 폼 */}
                <div className="bg-[#FBF9F9] rounded-3xl px-6 py-8 shadow-inner flex flex-col items-center relative">
                    <input
                        type="text"
                        name="nickname"
                        placeholder="별명(4글자 이내)"
                        value={form.nickname}
                        onChange={handleChange}
                        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white"
                    />

                    {/* select 입력 영역 */}
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
                        className="bg-[#F15A24] text-white font-bold py-2 px-6 rounded-full"
                    >
                        수정 완료하기
                    </button>

                    {/* 캐릭터 이미지 */}
                    <img src={recipingFront} alt="recipingFront" className="absolute -bottom-10 right-0 w-40" />
                </div>
            </ContentWrapper>

            <Footer />
        </PageLayout>
    )
}

export default ProfileEdit
