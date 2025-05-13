// src/pages/RecipeDetail/index.tsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import PageLayout from '../../components/layout/PageLayout'
import ContentWrapper from '../../components/common/ContentWrapper'

// 댓글 타입
interface Comment {
  id: number
  user: string
  avatarUrl: string
  text: string
  date: string
}

// 상세 레시피 타입
interface RecipeDetailData {
  id: string
  images: string
  title: string
  author: string
  difficulty: string
  time: string
  ingredients: string[]
  steps: string[]
  hashtags: string[]
  likes: number
  comments: Comment[]
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // 현재 보고 있는 이미지 인덱스
  const [currentImage, setCurrentImage] = useState(0)
  // 레시피 상세 데이터
  const [data, setData] = useState<RecipeDetailData | null>(null)

  // 더미 데이터를 세팅 → 나중에 API 호출로 교체
  useEffect(() => {
    const dummy: RecipeDetailData = {
      id: id || '0',
      images: 'reciping.png',
      title: '냉부해 “연어필렛 필레?” 황금 레시피 연어필렛 만들기',
      author: '시은핑',
      difficulty: '하',
      time: '30~40분',
      ingredients: [
        '당근 반 개',
        '양파 1개',
        '생연어 400g',
        '샐러드 채소 많이'
      ],
      steps: [
        '당근 썰러썰러 많이 썰러버려요~!',
        '양파도 썰어썰어~! 많이 넣을수록 매워요(?)',
        '생연어를 먹기 좋은 크기로 잘라요.',
        '한 곳에 섞고 예쁜 그릇에 담아요.'
      ],
      hashtags: ['#연어', '#샐러드 소스 추천', '#황금 레시피', '#집들이 요리'],
      likes: 375,
      comments: [
        {
          id: 1,
          user: '기현링',
          avatarUrl: '/avatars/1.png',
          text: '너무 맛있어보여요! 꼭 만들어볼게요 히히',
          date: '25/02/13 오전 11:17'
        },
        {
          id: 2,
          user: '홍길동',
          avatarUrl: '/avatars/2.png',
          text: '최고👍 감사합니다~',
          date: '25/02/14 오후 2:05'
        }
      ]
    }
    setData(dummy)
  }, [id])

  if (!data) return <p className="p-4 text-center">로딩 중...</p>

  const {
    images, title, author, difficulty,
    time, ingredients, steps,
    hashtags, likes, comments
  } = data

  const totalImages = images.length
  const prevImage = () => setCurrentImage(idx => (idx - 1 + totalImages) % totalImages)
  const nextImage = () => setCurrentImage(idx => (idx + 1) % totalImages)

  return (
    <PageLayout>
      <Navbar />

      <ContentWrapper className="mb-12">
        {/* 뒤로가기 (홈으로) */}
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-gray-600 hover:text-black mb-4"
        >
          ←
        </button>

        {/* 이미지 캐러셀 / 좋아요 */}
        <div className="relative flex justify-center items-center">
          <button
            onClick={prevImage}
            className="absolute left-0 text-2xl text-gray-600 hover:text-black"
          >‹</button>
          <img
            src={images[currentImage]}
            alt={`slide-${currentImage}`}
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-0 text-2xl text-gray-600 hover:text-black"
          >›</button>
          <div className="absolute top-0 right-0 flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 5v14l7-7 7 7V5H5z" />
            </svg>
            <span>{likes}</span>
          </div>
        </div>

        {/* 제목 / 작성자 / 난이도·소요시간 */}
        <h1 className="text-center text-lg font-bold mt-4">{title}</h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          작성자: {author}
        </p>
        <div className="flex justify-center text-sm text-gray-600 mb-6">
          <span className="mr-4">난이도 ({difficulty})</span>
          <span>소요 시간 {time}</span>
        </div>

        {/* 재료 */}
        <section className="mb-6">
          <h2 className="font-semibold mb-2">요리 재료 :</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </section>

        {/* 조리 방법 */}
        <section className="mb-6">
          <h2 className="font-semibold mb-2">조리 방법 :</h2>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            {steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </section>

        {/* 해시태그 */}
        <p className="mb-6 text-sm text-gray-600">
          해시태그 : {hashtags.join(' ')}
        </p>

        {/* 즐겨찾기 버튼 */}
        <div className="flex justify-center mb-8">
          <button className="flex items-center px-6 py-2 bg-[#F15A24] text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 5v14l7-7 7 7V5H5z" />
            </svg>
            즐겨찾기하기
          </button>
        </div>

        {/* Comments */}
        <section>
          <h2 className="font-semibold mb-4">Comments :</h2>
          <ul className="space-y-4 mb-6">
            {comments.map(c => (
              <li key={c.id} className="flex items-start space-x-3">
                <img src={c.avatarUrl} alt={c.user} className="w-8 h-8 rounded-full"/>
                <div className="bg-[#FFF5F0] p-3 rounded-xl">
                  <p className="text-sm">{c.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.date}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <button className="px-6 py-2 bg-[#F15A24] text-white rounded-full">
              댓글 남기기
            </button>
          </div>
        </section>
      </ContentWrapper>
    </PageLayout>
  )
}

export default RecipeDetail
