import React from 'react';
import './Community.css';
import Community_Item from '../../item/Community_Item';

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
      <div className='community-scroll'>
        <div className='community-title'>
          <h1>커뮤니티</h1>
        </div>
        <div className='scroll-view'>
          <Community_Item />
          <Community_Item />
          <Community_Item />
          <Community_Item />
        </div>
      </div>
  </div>
  );
}
