import React, { useState } from 'react';
import { LuUserCircle2 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { BiParty } from "react-icons/bi";
import { SlEnvolopeLetter } from "react-icons/sl";
import { TbSquareRoundedLetterP } from "react-icons/tb";
import { PiUserCircleLight } from "react-icons/pi";
import './MyPage.css';

export default function MyPage() {

  return (
    <div className='mypage-container'>
        <h1>마이페이지</h1>
        <div className='mypage-user-container'>
          <div className='mypage-user'>
            <div className='mypage-userImage'><PiUserCircleLight /></div>
            <div className='mypage-user-container2'>
              <div className='mypage-userName'>이름</div>
              <div className='mypage-membership'>멤버십</div>
            </div>
          </div>
          <div className='mypage-user-container3'>
            <div className='mypage-point'><TbSquareRoundedLetterP /> 포인트</div>
            <div className='mypage-message'><SlEnvolopeLetter /> 메시지</div>
            <div className='mypage-heart'><FaRegHeart /> 좋아요</div>
          </div>
        </div>

        <div className='mypage-blank'></div>

        <div className='mypage-list'>
          <div className='mypage-edit'><FaEdit /> 내 정보 수정</div>
          <div className='mypage-event'><BiParty />이벤트</div>
          <div className='mypage-question'><LuMessagesSquare /> 1:1 문의</div>
          <div className='mypage-notice'><FaRegBell /> 공지사항</div>
          <div className='mypage-service'><RiCustomerService2Line /> 고객센터</div>
          <div className='mypage-logout'><IoLogOutOutline /> 로그아웃</div>
          </div>
    </div>
  );
}
