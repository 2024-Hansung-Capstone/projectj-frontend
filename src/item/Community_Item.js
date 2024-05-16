import React from 'react';
import './css/Community_Item.css';

// 커뮤니티 게시물 컴포넌트
export default function Community_Item({ board }) { // props로 board를 받도록 수정
  return (
    <div className='communitydetail-container'>
      {/* 게시물 상세 보기 */}
      <div className='ci-container'>
        <div className='ci-title'>
          <div className='ci-userPhoto'>
            {/* 유저 사진 */}
          </div>

          <div className='ci-userName'>
            <h4>유저</h4>
          </div>
          <div className='ci-date'>
            <h4>시간</h4> 
          </div>
        </div>
        <div className='ci-container2'>
          <div className='ci-post'>
            <h4>사진</h4>
          </div>
          <div className='ci-text'>
            <h4>글</h4>
          </div>
        </div>
    </div>
  </div>
  );
}
