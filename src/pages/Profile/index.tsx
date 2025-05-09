import logoutIcon from '../../assets/logout.png'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('로그아웃 되었습니다.')
    navigate('/login')
  }

  return (
    <div className="bg-[#FEEFEF] min-h-screen">
      <Navbar />

      <div className="max-w-[700px] mx-auto mt-8 bg-white rounded-xl p-6 shadow-lg">
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

          {/* 로그아웃  버튼 */}
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-black p-2 rounded"
            aria-label="로그아웃"
          >
            <img src={logoutIcon} alt="logout" className="w-5 h-5" />
          </button>
        </div>

        {/* 프로필 카드 */}
        <div className="flex justify-between items-center mb-4 p-4 rounded-lg bg-gray-100">
          <div>
            <p className="font-bold text-sm">구름핑</p>
            <p className="text-xs">dosmarvis@gmail.com</p>
            <p className="text-xs">20대 / 남성 / 관심키워드: 자유로운</p>
          </div>
          <button onClick={() => navigate('/profile-edit')} className="text-xs border px-2 py-1 rounded-full">프로필 수정</button>
        </div>

        {/* 포인트 카드 */}
        <div className="bg-[#FDF3E5] text-[#F15A24] font-bold p-4 rounded-lg text-center mb-6">
          구름핑의 포인트는? <br /> <span className="text-2xl">30000P</span>
        </div>

        {/* 탭 */}
        <div className="flex gap-4 mb-4 text-sm font-semibold border-b">
          <div className="text-[#F15A24] border-b-2 border-[#F15A24] pb-2">내가 쓴 글</div>
          <div className="text-gray-400">스크랩한 글</div>
        </div>

        {/* 게시물 리스트 (더미) */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center justify-between bg-[#FAE7E7] px-4 py-3 rounded-md">
              <p className="text-sm font-semibold truncate">
                {i % 2 === 0 ? '취준생을 요리하는 방법' : '구름핑 황금 레시피 만드는 법'}
              </p>
              <div className="text-xs text-gray-600">♥ {i * 2}</div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 (예시) */}
        <div className="mt-6 text-center text-xs text-gray-500">〈 1 / 3 〉</div>
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  )
}

export default Profile
