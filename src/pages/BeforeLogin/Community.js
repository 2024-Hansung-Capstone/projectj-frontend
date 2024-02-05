import React from 'react';
import './Community.css';

export default function Community() {
  return (
    <div className='community-container'>
      <div className='board-list'>
        {/* Left side: Board List */}
        <ul>
          <li>게시판 1</li>
          <li>게시판 2</li>
          <li>게시판 3</li>
          {/* Add more board items as needed */}
        </ul>
      </div>
      <div className='scroll-view'>
        {/* Right side: Scrollable Content */}
        <h1>커뮤니티</h1>
        {/* Add your scrollable content here */}
      </div>
    </div>
  );
}
