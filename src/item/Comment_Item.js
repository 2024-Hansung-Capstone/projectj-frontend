import React, { useState } from 'react';
import { MdMoreVert } from "react-icons/md";
import './css/Comment_Item.css';

// 댓글 컴포넌트
export default function Comment_Item() {
  const [showOptions, setShowOptions] = useState(false);

  // 수정, 삭제 버튼 메뉴 클릭 리스너
  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className='comment-container0'>
      <div className='comment-photo'>
        <p>사진</p>
      </div>
      <div className='comment-title'>
        <div className='comment-container1'>
          <div className='comment-name'>
            <p>이름</p>
          </div>
          <div className='comment-more' onClick={handleOptionsClick}>
            <MdMoreVert />
            {showOptions && (
              <div className='comment-options'>
                <button>수정</button>
                <button>삭제</button>
              </div>
            )}
          </div>
        </div>
        <div className='comment-container2'>
          <div className='comment-post'>
            <p>글</p>
          </div>
        </div>
        <div className='comment-container3'>
          <div className='comment-date'>
            <p>날짜</p>
          </div>
          <div className='comment-recomment'>
            <p>답글달기</p>
          </div>
          <div className='comment-like'>
            <p>좋아요</p>
          </div>
        </div>
      </div>
    </div>
  );
}
