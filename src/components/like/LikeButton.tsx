// src/components/like/LikeButton.tsx
import React, { useEffect, useState } from 'react'
import {
    createLike,
    removeLike,
    getRecipeLikeStatus,
  } from '../../services/likeService'

interface LikeButtonProps {
  recipeId: number
  /** 페이지 최초 렌더링 시 보여줄 카운트(선택) */
  initialLikeCount?: number
  initialIsLiked?: boolean
  className?: string
}

const LikeButton: React.FC<LikeButtonProps> = ({
    recipeId,
    initialLikeCount = 0,
    initialIsLiked,
    className = '',
}) => {
  // TODO: 실제 로그인 유저 ID를 전역 상태(예: Recoil, Redux, Context)에서 불러오세요
  const userId = 1123

  const [liked, setLiked] = useState<boolean>(initialIsLiked ?? false)
  const [count, setCount] = useState<number>(initialLikeCount)
  const [loading, setLoading] = useState(false)

  /** 최초 마운트 → 상태 동기화 (initial 값이 없다면) */
  useEffect(() => {
    if (initialIsLiked !== undefined && initialLikeCount !== undefined) return
    let mounted = true
    getRecipeLikeStatus(userId, recipeId)
      .then(({ likeCount, isLiked }) => {
        if (mounted) {
          setCount(likeCount)
          setLiked(isLiked)
        }
      })
      .catch(console.error)
    return () => {
      mounted = false
    }
  }, [recipeId])

  /** 클릭 핸들러 */
  const handleClick = async () => {
    if (loading) return
    setLoading(true)
    try {
      if (liked) {
        await removeLike(userId, recipeId)
        setLiked(false)
        setCount(prev => prev - 1)
      } else {
        await createLike(userId, recipeId)
        setLiked(true)
        setCount(prev => prev + 1)
      }
    } catch (e) {
      console.error(e)
      alert('좋아요 처리 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      className={`
        flex items-center text-2xl
        ${liked ? 'text-red-500' : 'text-gray-400'}
        hover:opacity-80 transition
        disabled:opacity-50
        ${className}
      `}
    >
      <span className="mr-1">❤️</span>
      <span className="text-lg">{count}</span>
    </button>
  )
}

export default LikeButton