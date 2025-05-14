// src/pages/RecipeDetail/index.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getDefaultRecipes,
  searchRecipes,
  getRecipeById,
  getRecipeDetail,
  Recipe,
  RecipeDetailResponse,
  CommentItem,
  CommentPage,
  SearchResponse,
  SearchParams
} from '../../api/recipesApi'

import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/layout/Navbar'
import ContentWrapper from '../../components/common/ContentWrapper'
import Footer from '../../components/common/Footer'

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [data, setData]       = useState<RecipeDetailResponse | null>(null)
  const [page, setPage]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getRecipeDetail(id, page /*=1*/, 10 /*=size*/)
      .then(data => setData(data))
      .catch(err => setError('불러오기 실패'))
      .finally(() => setLoading(false))
  }, [id, page])

  if (loading) return <p className="p-4 text-center">불러오는 중…</p>
  if (error)   return <p className="p-4 text-center text-red-500">{error}</p>
  if (!data)   return null

  const { recipe, comments } = data
  const {
    imageUrl, title, content,
    likeCount, tags,
    cookingTime, difficulty,
    createdAt, bookmarked
  } = recipe

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

        {/* 이미지 + 좋아요 */}
        <div className="relative flex justify-center mb-6">
          <img
            src={imageUrl}
            alt={title}
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
          <div className="absolute top-0 right-0 flex items-center text-gray-600">
            ❤️ <span className="ml-1">{likeCount}</span>
          </div>
        </div>

        {/* 제목 · 메타 */}
        <h1 className="text-center text-lg font-bold mb-1">{title}</h1>
        <p className="text-center text-xs text-gray-500 mb-4">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <div className="flex justify-center text-sm text-gray-600 mb-6">
          <span className="mr-4">난이도 ({difficulty ?? '정보 없음'})</span>
          <span>소요 시간 {cookingTime ?? '정보 없음'}</span>
        </div>

        {/* 본문 */}
        <section className="mb-6">
          <h2 className="font-semibold mb-2">레시피 설명 :</h2>
          <p className="whitespace-pre-line text-sm text-gray-700">
            {content}
          </p>
        </section>

        {/* 해시태그 */}
        {tags.length > 0 && (
          <p className="mb-6 text-sm text-gray-600">
            {tags.map(t => `#${t}`).join(' ')}
          </p>
        )}

        {/* 북마크(토글 미구현) */}
        <div className="flex justify-center mb-10">
          <button className="flex items-center px-6 py-2 bg-[#F15A24] text-white rounded-full">
            {bookmarked ? '🔖 북마크됨' : '🔖 북마크'}
          </button>
        </div>

        {/* 댓글 */}
        <section>
          <h2 className="font-semibold mb-4">
            댓글 {comments.totalElements}
          </h2>

          {comments.content.length === 0 ? (
            <p className="text-sm text-gray-500 mb-6">
              아직 댓글이 없습니다.
            </p>
          ) : (
            <>
              <ul className="space-y-4 mb-6">
                {comments.content.map(c => (
                  <li key={c.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#FDD9B5] flex items-center justify-center">
                      <span className="text-xs text-[#5C2E1E] font-bold">
                        {c.userId}
                      </span>
                    </div>
                    <div className="bg-[#FFF5F0] p-3 rounded-xl">
                      <p className="text-sm">{c.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* 페이지 네비게이션 */}
              <div className="flex justify-center gap-4">
                <button
                  disabled={comments.first}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className={`px-3 py-1 rounded ${
                    comments.first
                      ? 'bg-gray-300'
                      : 'bg-[#F15A24] text-white'
                  }`}
                >
                  이전
                </button>
                <span className="text-sm">
                  {page} / {comments.totalPages || 1}
                </span>
                <button
                  disabled={comments.last}
                  onClick={() => setPage(p => p + 1)}
                  className={`px-3 py-1 rounded ${
                    comments.last
                      ? 'bg-gray-300'
                      : 'bg-[#F15A24] text-white'
                  }`}
                >
                  다음
                </button>
              </div>
            </>
          )}
        </section>
      </ContentWrapper>

      <Footer />
    </PageLayout>
  )
}

export default RecipeDetail