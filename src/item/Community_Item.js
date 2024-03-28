import React from 'react';
import './css/Community_Item.css';

export default function Community_Item() {
  return (
    <div className='ci-container'>
        <div className='ci-title'>
        <div className='ci-userPhoto'>
            <img src={process.env.PUBLIC_URL + '/user.jpeg'} alt='이미지 설명' />
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
