import React from 'react';
import { PiUserCircleLight } from "react-icons/pi";
import { TbSquareRoundedLetterP } from "react-icons/tb";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaRegHeart, FaRegBell, FaEdit } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { HiMiniNoSymbol } from "react-icons/hi2";
import './css/MyPage.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
/*
const GET_USER_INFO = gql`
  query FetchUserInfo($userId: String!) {
    fetchUserById(user_id: $userId) {
      id
      name
      point
    }
  }
`
export default function MyPage({ onLogout , userId }) {
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userInfo = data.fetchUserById;*/
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
          <Link className='mypage-message' to="/Message"><SlEnvolopeLetter /> 메시지</Link>
        </div>
      </div>

      <div className='mypage-blank'></div>

      <div className='mypage-list'>
      <Link className='mypage-mypost' to="/mypost">내가 작성한 글</Link>
        <Link className='mypage-edit' to="/editUserInfo"><FaEdit /> 내 정보 수정</Link>
        <Link className='mypage-question' to="/question"><LuMessagesSquare /> 1:1 문의</Link>
        <Link className='mypage-notice' to="/notices"><FaRegBell /> 공지사항</Link>
        <Link className='mypage-logout' to="/" onClick={onLogout}><IoLogOutOutline /> 로그아웃</Link>
        <Link className='mypage-withdraw' to="/"><HiMiniNoSymbol /> 회원탈퇴</Link>
      </div>
    </div>
  );
}
