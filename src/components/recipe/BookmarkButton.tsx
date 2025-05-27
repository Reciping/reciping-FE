import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleBookmark } from '../../services/recipeService';

interface BookmarkButtonProps {
  recipeId: number;
  initialBookmarkedStatus: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  recipeId,
  initialBookmarkedStatus,
}) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(initialBookmarkedStatus);

  const handleBookmark = async () => {
    // Check for JWT token in local storage
    const jwtToken = localStorage.getItem('token'); // Assuming the token is stored with key 'jwtToken'
    if (!jwtToken) {
      alert('로그인이 필요한 기능입니다.');
      // Optionally navigate to login page instead of alert:
      // navigate('/loginselect'); 
      return; // Stop the function if no token is found
    }

    try {
      // TODO: 실제 userId 를 로그인한 유저 정보로 대체하세요 (이 로직은 필요에 따라 변경하세요)
      const nowBookmarked = await toggleBookmark(1123, recipeId);
      setBookmarked(nowBookmarked); // Update state based on server response
    } catch (e) {
      console.error(e);
      alert('북마크 토글 중 오류가 발생했습니다.');
    }
  };

  return (
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
  );
};

export default BookmarkButton; 