import React from 'react';
import './Community_Item.css';

export default function Community_Item() {
  return (
    <div className='ci-container'>
        <div className='ci-title'>
            <div className='ci-userPhoto'>
                <h4>사진</h4>
            </div>
            <div className='ci-userName'>
                <h4>이름</h4>
            </div>
            <div className='ci-date'>
                <h4>날짜</h4>
            </div>
        </div>
        <div className='ci-post'>
            <h4>글</h4>
        </div>
        <div className='ci-comment'>
            <div className='ci-write'>
                <h4>댓글쓰기</h4>
            </div>
            <div className='ci-send'>
                <h4>전송</h4>
            </div>
        </div>
    </div>
  );
}
