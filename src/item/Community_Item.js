// Community_Item.js
import React from 'react';
import './css/Community_Item.css';

export default function Community_Item({ board }) { // props로 board를 받도록 수정
  return (
    <div className='ci-container'>
      <div className='ci-title'>
        <div className='ci-userPhoto'>
          {/* 유저 사진 */}
        </div>

        <div className='ci-userName'>
          <h4>{board.userId}</h4>
        </div>
        <div className='ci-date'>
          <h4>{board.createat}</h4> 
        </div>
      </div>
      <div className='ci-post'>
        <h4>{board.title}</h4>
      </div>
      <div className='ci-comment'>
        <input
          type="text"
          placeholder="댓글쓰기"
          className="ci-write"
        />
        <div className='ci-send'>
          <h4>전송</h4>
        </div>
      </div>
    </div>
  );
}
