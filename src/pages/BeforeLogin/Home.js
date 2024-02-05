import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className='Home-container'>
      <div className='Home-photoList'>
            <img
              className="card-photo"
              src="/card3.jpg"
              alt="로고"
            />
      </div>
      <div className='Home-slider1'><h4>요리</h4></div>
      <div className='Home-slider2'><h4>원룸</h4></div>
      <div className='Home-slider3'><h4>자취메이트</h4></div>
      <div className='Home-slider3'><h4>커뮤니티</h4></div>
    </div>
  );
}
