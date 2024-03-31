import React from 'react';
import { PiUserCircleLight } from "react-icons/pi";
import { TbSquareRoundedLetterP } from "react-icons/tb";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaRegHeart, FaRegBell, FaEdit } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";
import { BiParty } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import './css/MyPage.css';
import { Link } from 'react-router-dom';

export default function MyPage({ onLogout }) {

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
        <Link className='mypage-edit' to="/editUserInfo"><FaEdit /> 내 정보 수정</Link>
        <Link className='mypage-event' to="/event"><BiParty />이벤트</Link>
        <Link className='mypage-question' to="/question"><LuMessagesSquare /> 1:1 문의</Link>
        <Link className='mypage-notice' to="/notices"><FaRegBell /> 공지사항</Link>
        <Link className='mypage-service' to="/customer-service"><RiCustomerService2Line /> 고객센터</Link>
        <Link className='mypage-logout' to="/" onClick={onLogout}><IoLogOutOutline /> 로그아웃</Link>
      </div>
    </div>
  );
}
