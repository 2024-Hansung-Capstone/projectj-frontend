import React from 'react';
import './css/Comment_Item.css';

export default function Comment_Item() {
  return (
    <div className='comment-container'>
        <div className='comment-title'>
            <div className='comment-userPhoto'>
                <h4>사진</h4>
            </div>
            <div className='comment-userName'>
                <h4>이름</h4>
            </div>
            <div className='comment-date'>
                <h4>날짜</h4>
            </div>
        </div>
        <div className='comment-post'>
            <h4>글</h4>
        </div>
        <div className='comment-comment'>
            <div className='comment-write'>
                <h4>댓글쓰기</h4>
            </div>
            <div className='comment-send'>
                <h4>전송</h4>
            </div>
        </div>
    </div>
  );
}
