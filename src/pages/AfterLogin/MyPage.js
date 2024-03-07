import React, { useState } from 'react';
import { LuUserCircle2 } from "react-icons/lu";
import './MyPage.css';

export default function MyPage() {

  return (
    <div className='mypage-container'>
        마이페이지
        <div className='mypage-user-container'>
          <div className='mypage-user'>
            <div className='mypage-userImage'><LuUserCircle2 /></div>
            <div className='mypage-userName'>이름</div>
            <div className='mypage-membership'>멤버십</div>
          </div>
          <div className='mypage-user-container2'>
            <div className='mypage-point'>포인트</div>
            <div className='mypage-message'>메시지</div>
            <div className='mypage-heart'>좋아요</div>
          </div>
        </div>
        <div className='mypage-list'>
          <div className='mypage-edit'>내 정보 수정</div>
          <div className='mypage-event'>이벤트</div>
          <div className='mypage-question'>1:1 문의</div>
          <div className='mypage-notice'>공지사항</div>
          <div className='mypage-service'>고객센터</div>
          </div>
    </div>
  );
}
