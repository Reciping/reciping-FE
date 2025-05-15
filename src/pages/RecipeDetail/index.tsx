// src/pages/RecipeDetail/index.tsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRecipeDetail, RecipeDetailResponse, toggleBookmark, getCategoryOptions, CategoryOptionsResponse } from '../../api/recipesApi'

import PageLayout from '../../components/layout/PageLayout'
import Navbar    from '../../components/layout/Navbar'
import ContentWrapper from '../../components/common/ContentWrapper'
import Footer    from '../../components/common/Footer'

import nonImage from '../../assets/nonImage.jpeg'

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [data, setData] = useState<RecipeDetailResponse | null>(null)
  const [categoryOpts, setCategoryOpts] = useState<CategoryOptionsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState(false)




  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)

    Promise.all([
      getRecipeDetail(id, 1, 6),   // → Promise<RecipeDetailResponse>
      getCategoryOptions()         // → Promise<CategoryOptionsResponse>
    ])
      .then(([detail, opts]) => {
        setData(detail)            // ★ detailRes.data 가 아니라 detail 그대로
        setCategoryOpts(opts)      // ★ optsRes.data 가 아니라 opts 그대로
      })
      .catch(() => {
        setError('레시피 상세를 불러오는 중 오류가 발생했습니다.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  // 로딩 / error / 데이터 가드
  if (loading) return <p className="p-4 text-center">불러오는 중…</p>
  if (error)   return <p className="p-4 text-center text-red-500">{error}</p>
  if (!data || !categoryOpts) return null
  

  const {
    recipe: {
      imageUrl, title, content, likeCount,
      difficulty, cookingTime, tags, createdAt,
      dishType, situationType, ingredientType, methodType,
    },
    comments
  } = data

  const findLabel = (
    list: { label: string; value: string }[],
    code?: string | null
  ) => {
    if (!code) return '전체'
    return list.find(opt => opt.value === code)?.label || '전체'
  }

  // 북마크 버튼 클릭 핸들러
  const handleBookmark = async () => {
    try {
      // TODO: 실제 userId 를 로그인한 유저 정보로 대체하세요
      const nowBookmarked = await toggleBookmark(1123, data!.recipe.id)
      setBookmarked(nowBookmarked)       // 서버가 준 true/false 로 상태 갱신
    } catch (e) {
      console.error(e)
      alert('북마크 토글 중 오류가 발생했습니다.')
    }
  }  
  const displayImage = imageUrl && imageUrl.trim() !== ''
  ? imageUrl
  : nonImage


  return (
    <PageLayout>
      <Navbar />

      <ContentWrapper className="mb-12">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-gray-600 hover:text-black mb-4"
        >
          ←
        </button>

        {/* 이미지 */}
        <div className="flex justify-center items-center mb-4">
          <img
            src={displayImage}
            alt={title}
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
        </div>

        {/* 제목 / 날짜 */}
        <h1 className="text-center text-2xl font-bold">{title}</h1>
        <p className="text-center text-gray-600 mb-6">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        {/* 카테고리 레이블 뱃지 */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {/* dish */}
          {dishType !== 'ALL' && (
            <span className="bg-[#F15A24] text-white px-3 py-1 rounded-full text-xs">
              {findLabel(categoryOpts.dish, dishType)}
            </span>
          )}
          {/* situation */}
          {situationType !== 'ALL' && (
            <span className="bg-[#F15A24] text-white px-3 py-1 rounded-full text-xs">
              {findLabel(categoryOpts.situation, situationType)}
            </span>
          )}
          {/* ingredient */}
          {ingredientType !== 'ALL' && (
            <span className="bg-[#F15A24] text-white px-3 py-1 rounded-full text-xs">
              {findLabel(categoryOpts.ingredient, ingredientType)}
            </span>
          )}
          {/* method */}
          {methodType !== 'ALL' && (
            <span className="bg-[#F15A24] text-white px-3 py-1 rounded-full text-xs">
              {findLabel(categoryOpts.method, methodType)}
            </span>
          )}

          {/* 추가 : cookingTime */}
          {cookingTime && cookingTime !== 'ALL' && (
                <span className="bg-[#4A90E2] text-white px-3 py-1 rounded-full text-xs">
                  {findLabel(categoryOpts.cookingTime, cookingTime)}
                </span>
          )}
          {difficulty && difficulty !== 'ALL' && (
            <span className="bg-[#7B61FF] text-white px-3 py-1 rounded-full text-xs">
              {findLabel(categoryOpts.difficulty, difficulty)}
            </span>
          )}
        </div>

        {/* 레시피 설명 */}
        <section className="mb-8">
          <h2 className="font-semibold mb-2">레시피 설명 :</h2>
          <p className="text-gray-700 mb-2">{content}</p>
          <div className="text-sm text-gray-500">
            {tags.map(tag => `#${tag} `)}
          </div>
        </section>

        {/* 좋아요 + 북마크 */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {/* 좋아요(하트) */}
          <div className="flex items-center text-2xl text-red-500">
            <span className="mr-1">❤️</span>
            <span className="text-lg">{data!.recipe.likeCount}</span>
          </div>
          {/* 북마크 버튼 */}
          <button
            onClick={handleBookmark}
            aria-label={bookmarked ? '북마크 해제' : '북마크'}
            className={`
              p-3 rounded-full transition
              ${bookmarked
                ? 'bg-[#F15A24] text-white'
                : 'bg-white text-[#F15A24] ring-2 ring-inset ring-[#F15A24]'
              }
              hover:opacity-80
            `}
          >
            {bookmarked ? '북마크 해제' : '북마크 하기'}
          </button>
        </div>

        {/* Comments */}
        <section>
          <h2 className="font-semibold mb-4">Comments :</h2>
          {comments.content.length === 0 ? (
            <p className="text-center text-gray-500 mb-6">등록된 댓글이 없습니다.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {comments.content.map(c => (
                <li key={c.id} className="flex items-start space-x-3">
                  {/* TODO: 실제 avatarUrl 로 교체 */}
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <div className="bg-[#FFF5F0] p-3 rounded-xl">
                    <p className="text-sm">{c.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-center">
            <button className="px-6 py-2 bg-[#F15A24] text-white rounded-full">
              댓글 남기기
            </button>
          </div>
        </section>
      </ContentWrapper>

      <Footer />
    </PageLayout>
  )
}

export default RecipeDetail