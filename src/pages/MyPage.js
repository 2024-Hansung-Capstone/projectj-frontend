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
import { useMutation } from '@apollo/client';
import DELETE_USER_MUTATION from './gql/deleteUserGql';

 
  const GET_USER_INFO = gql`
  query FetchUserInfo($userId: String!) {
    fetchUserById(user_id: $userId) {
      id
      name
      point
    }
  }
`
export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
    }
  }
`;

  export default function MyPage({ onLogout }) {
    const [deleteUser] = useMutation(DELETE_USER_MUTATION);
    

  const getToken = () => {
    return localStorage.getItem('token') || ''; // 토큰이 없을 경우 빈 문자열 반환
  };

  const { loading: loadingWhoAmI, error: errorWhoAmI, data: dataWhoAmI } = useQuery(WHO_AM_I_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    },
  });
  const whoAmI = dataWhoAmI?.whoAmI;

  const handleDeleteUser = async () => {
    try {
      // 회원 탈퇴 요청 보내기
      const { data } = await deleteUser({
        // 요청 헤더에 JWT 토큰 추가
        context: {
          headers: {
            authorization: `Bearer ${getToken()}` // 로컬 스토리지에서 JWT 토큰을 가져옴
          }
        }
      });
      if (data.deleteUser) {
        // 회원 탈퇴 성공 시 로그아웃 수행
        onLogout();
      } else {
        // 회원 탈퇴 실패
        alert('회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원 탈퇴 오류:', error);
      alert('회원 탈퇴에 실패했습니다.');
    }
  };

  return (
    <div className='mypage-container'>
      <h1>마이페이지</h1>
      <div className='mypage-user-container'>
        <div className='mypage-user'>
          <div className='mypage-userImage'><PiUserCircleLight /></div>
          <div className='mypage-user-container2'>
          <div className='mypage-userName'>{whoAmI?.name}</div>
            <div className='mypage-membership'>멤버십</div>
          </div>
        </div>
        <div className='mypage-user-container3'>
          <div className='mypage-point'><TbSquareRoundedLetterP />{whoAmI?.point}</div>
          <Link className='mypage-message' to="/MessageCompose"><SlEnvolopeLetter /> 메시지</Link>
        </div>
      </div>

      <div className='mypage-blank'></div>

      <div className='mypage-list'>
      <Link className='mypage-mypost' to="/mypost">내가 작성한 글</Link>
        <Link className='mypage-edit' to="/editUserInfo"><FaEdit /> 내 정보 수정</Link>
        <Link className='mypage-logout' to="/" onClick={onLogout}><IoLogOutOutline /> 로그아웃</Link>
        <Link className='mypage-withdraw-link' to="/" onClick={handleDeleteUser}>
          <HiMiniNoSymbol /> 회원탈퇴
        </Link>
      </div>
    </div>
  );
}