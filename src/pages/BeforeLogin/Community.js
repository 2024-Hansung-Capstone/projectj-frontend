import React from 'react';
import './Community.css';
import Community_Item from './Community_Item';

export default function Community() {
  return (
    <div className='community-container'>
      <div className='board-list'>
        <ul>
          <li>원룸 찾기</li>
          <li>고민상담</li>
          <li>중고마켓</li>
          <li> ... </li>
        </ul>
      </div>
      <div className='scroll-view'>
        <h1>커뮤니티</h1>
        <Community_Item />
      </div>
    </div>
  );
}
