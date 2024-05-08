import React from 'react';
import './css/Community_Hot_Item.css';

export default function Community_Hot_Item() {
  return (
    <div className='communityHot-container'>
        <div className='communityHot-container-title'>
            <div className='communityHot-title'>
                <p>제목</p>
            </div>
            <div className='communityHot-date'>
                <h4>날짜</h4>
            </div>
        </div>
        <div className='communityHot-content'>
            <h4>내용</h4>
        </div>
    </div>
  );
}
