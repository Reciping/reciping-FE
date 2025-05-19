import React, { useEffect, useState } from 'react';
import logoutIcon from '../../assets/logout.png';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import ContentWrapper from '../../components/common/ContentWrapper';

import { getMyPage } from '../../services/userService';
import type { MyPageData } from '../../types/mypage';

type Tab = 'myRecipes' | 'myBookmarks';

const sexMap: Record<string, string> = {
  FEMALE: '여성',
  MALE: '남성',
};
const ageMap: Record<string, string> = {
  TEENS: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES_PLUS: '50대 이상',
};
const interestMap: Record<string, string> = {
  VEGAN: '비건',
  HIGH_PROTEIN: '고단백',
  LOW_CARB: '저탄수',
};

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<MyPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tab, setTab] = useState<Tab>('myRecipes');
  const [page, setPage] = useState(0);
  const size = 5;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getMyPage(page, size);
        setData(result);
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError('로그인이 필요합니다. 잡시 후 로그인 화면으로 이동합니다.');
          setTimeout(() => navigate('/login'), 2000);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  const userInfo = data?.userInfo;
  const myRecipes = data?.myRecipes;
  const myBookmarks = data?.myBookmarks;

  return (
    <PageLayout>
      <Navbar />
      <ContentWrapper>
        {/* 상단 바: 항상 보임 */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-black text-lg p-2 rounded"
            aria-label="뒤로가기"
          >
            ←
          </button>
          <h2 className="text-center text-xl font-bold">My Profile</h2>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-black p-2 rounded"
            aria-label="로그아웃"
          >
            <img src={logoutIcon} alt="logout" className="w-5 h-5" />
          </button>
        </div>

        {/* 로딩 / 에러 / 실제 콘텐츠 */}
        {loading ? (
          <p className="text-center py-8">로딩 중...</p>
        ) : error ? (
          <p className="text-center py-8 text-red-500">
            에러 발생: {error}
          </p>
        ) : (
          <>
            {/* 프로필 카드 */}
            <div className="flex justify-between items-center mb-4 p-4 rounded-lg bg-gray-100">
              <div>
                <p className="font-bold text-sm">{userInfo!.nickname}</p>
                <p className="text-xs">{userInfo!.email}</p>
                <p className="text-xs">
                  {ageMap[userInfo!.age]} / {sexMap[userInfo!.sex]} / 관심키워드:{' '}
                  {interestMap[userInfo!.interestKeyword] || userInfo!.interestKeyword}
                </p>
              </div>
              <button
                onClick={() => navigate('/profile-edit')}
                className="text-xs border px-2 py-1 rounded-full"
              >
                프로필 수정
              </button>
            </div>

            {/* 포인트 카드 */}
            <div className="bg-[#FDF3E5] text-[#F15A24] font-bold p-4 rounded-lg text-center mb-6">
              나의 포인트 <br /> <span className="text-2xl">{userInfo!.point}P</span>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex gap-4 mb-4 text-sm font-semibold border-b">
              <button
                onClick={() => { setTab('myRecipes'); setPage(0); }}
                className={`pb-2 ${
                  tab === 'myRecipes'
                    ? 'text-[#F15A24] border-b-2 border-[#F15A24]'
                    : 'text-gray-400'
                }`}
              >
                내가 쓴 글
              </button>
              <button
                onClick={() => { setTab('myBookmarks'); setPage(0); }}
                className={`pb-2 ${
                  tab === 'myBookmarks'
                    ? 'text-[#F15A24] border-b-2 border-[#F15A24]'
                    : 'text-gray-400'
                }`}
              >
                스크랩한 글
              </button>
            </div>

            {/* 콘텐츠 리스트 & 페이징 */}
            {tab === 'myRecipes' ? (
              <>
                {myRecipes!.recipes.length === 0 ? (
                  <p className="text-center text-gray-500">작성한 레시피가 없습니다.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {myRecipes!.recipes.map(r => (
                      <div
                        key={r.recipeId}
                        className="flex items-center justify-between bg-[#FAE7E7] px-4 py-3 rounded-md"
                      >
                        <p className="text-sm font-semibold truncate">{r.title}</p>
                        <div className="text-xs text-gray-600">♥ {r.likes}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 text-center text-xs text-gray-500">
                  <button
                    disabled={myRecipes!.page === 0}
                    onClick={() => setPage(myRecipes!.page - 1)}
                  >
                    〈
                  </button>
                  {` ${myRecipes!.page + 1} / ${myRecipes!.totalPages} `}
                  <button
                    disabled={myRecipes!.page + 1 >= myRecipes!.totalPages}
                    onClick={() => setPage(myRecipes!.page + 1)}
                  >
                    〉
                  </button>
                </div>
              </>
            ) : (
              <>
                {myBookmarks!.recipes.length === 0 ? (
                  <p className="text-center text-gray-500">스크랩한 레시피가 없습니다.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {myBookmarks!.recipes.map(r => (
                      <div
                        key={r.recipeId}
                        className="flex items-center justify-between bg-[#FAE7E7] px-4 py-3 rounded-md"
                      >
                        <p className="text-sm font-semibold truncate">{r.title}</p>
                        <div className="text-xs text-gray-600">♥ {r.likes}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 text-center text-xs text-gray-500">
                  <button
                    disabled={myBookmarks!.page === 0}
                    onClick={() => setPage(myBookmarks!.page - 1)}
                  >
                    〈
                  </button>
                  {` ${myBookmarks!.page + 1} / ${myBookmarks!.totalPages} `}
                  <button
                    disabled={myBookmarks!.page + 1 >= myBookmarks!.totalPages}
                    onClick={() => setPage(myBookmarks!.page + 1)}
                  >
                    〉
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </ContentWrapper>
      <Footer />
    </PageLayout>
  );
};

export default Profile;
