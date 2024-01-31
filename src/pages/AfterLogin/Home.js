import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className='Home-container'>
      <h1>홈페이지 로그인 후</h1>
      <div className='Home-photoList'><h4>사진리스트</h4></div>
      <div className='Home-slider1'><h4>요리 슬라이드</h4></div>
      <div className='Home-slider2'><h4>원룸 슬라이드</h4></div>
      <div className='Home-slider3'><h4>자취메이트</h4></div>
      <div className='Home-slider3'><h4>커뮤니티</h4></div>
    </div>
  );
}
