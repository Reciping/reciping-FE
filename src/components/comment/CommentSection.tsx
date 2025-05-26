import React, { useState, useEffect } from 'react';
import { CommentItem } from '../../types/recipe';
import { createComment, getCommentsByRecipeId } from '../../services/commentService';

interface CommentSectionProps {
  comments: { content: CommentItem[] };
  recipeId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, recipeId }) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState<CommentItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const userId = 1123;

  useEffect(() => {
    fetchComments(recipeId, currentPage);
  }, [recipeId, currentPage]);

  const fetchComments = async (id: number, page: number) => {
    const size = 20;
    const fetchedCommentPage = await getCommentsByRecipeId(id, page, size);
    setCommentList(fetchedCommentPage.content);
    setTotalPages(fetchedCommentPage.totalPages);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    const success = await createComment({ recipeId, userId, content: newComment });

    if (success) {
      setNewComment('');
      alert('댓글이 등록되었습니다.');
      fetchComments(recipeId, currentPage);
    } else {
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="mt-8 mb-8">
      <h2 className="font-semibold mb-4">Comments :</h2>
      {commentList.length === 0 ? (
        <p className="text-center text-gray-500 mb-6">등록된 댓글이 없습니다.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {commentList.map(c => (
            <li key={c.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <div className="bg-[#FFF5F0] p-3 rounded-xl flex-1">
                <p className="text-sm">{c.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatCommentDate(c.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 border rounded-full disabled:opacity-50"
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`px-4 py-2 border rounded-full ${currentPage === index ? 'bg-[#F15A24] text-white' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 border rounded-full disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={handleCommentChange}
          className="flex-grow p-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
        />
        <button
          onClick={handleAddComment}
          className="px-6 py-2 bg-[#F15A24] text-white rounded-r-full hover:bg-opacity-80"
        >
          댓글 남기기
        </button>
      </div>
    </section>
  );
};

export default CommentSection; 