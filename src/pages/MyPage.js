import React ,{ useEffect} from 'react';
import { PiUserCircleLight } from "react-icons/pi";
import { TbSquareRoundedLetterP } from "react-icons/tb";
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoLogOutOutline } from "react-icons/io5";
import { HiMiniNoSymbol } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import DELETE_USER_MUTATION from './gql/deleteUserGql';
import './css/MyPage.css';
import { useLocation} from 'react-router-dom';
const GET_USER_INFO = gql`
  query FetchUserInfo($userId: String!) {
    fetchUserById(user_id: $userId) {
      id
      name
      point
    }
  }
`;

export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
      profile_image {
        imagePath
      }
      point
    }
  }
`;

export const FETCH_MY_ROLE_QUERY = gql`
  query FetchMyRole {
    fetchMyRole {
      code
      name
    }
  }
`;

export default function MyPage({ onLogout }) {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const location = useLocation();

  const getToken = () => {
    return localStorage.getItem('token') || ''; // 토큰이 없을 경우 빈 문자열 반환
  };

  const { loading: loadingWhoAmI, error: errorWhoAmI, data: dataWhoAmI ,refetch} = useQuery(WHO_AM_I_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    },
  });
  const whoAmI = dataWhoAmI?.whoAmI;

  const { loading: loadingMyRole, error: errorMyRole, data: dataMyRole } = useQuery(FETCH_MY_ROLE_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    },
  });
  const myRole = dataMyRole?.fetchMyRole;
  useEffect(() => {
    refetch();
  }, [location.pathname]);
  const handleDeleteUser = async () => {
    const confirmation = window.confirm("정말로 탈퇴하시겠습니까?");

    if (confirmation) {
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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 JWT 토큰 삭제
    onLogout(); // 로그아웃 콜백 호출
  };

  return (
    <div className='mypage-container'>
      <h1>마이페이지</h1>
      <div className='mypage-user-container'>
        <div className='mypage-user'>
          <div className='mypage-userImage'>
            {whoAmI?.profile_image ? (
              <img id="profileImage" src={whoAmI.profile_image.imagePath} alt="Profile" />
            ) : (
              <PiUserCircleLight className="mypage-user-icon" />
            )}
          </div>
          <div className='mypage-user-container2'>
            <div className='mypage-userName'>{whoAmI?.name}</div>
            <div className='mypage-role'>{myRole?.code} - {myRole?.name}</div>
          </div>
        </div>
        <div className='mypage-user-container3'>
          <div className='mypage-point'><TbSquareRoundedLetterP /> {whoAmI?.point}</div>
          <Link className='mypage-message' to="/MessageCompose"><SlEnvolopeLetter /> 메시지</Link>
        </div>
      </div>

      <div className='mypage-blank'></div>

      <div className='mypage-list'>
        <Link className='mypage-edit' to="/editUserInfo">
          <img src="/assets/mypage/edit.png" alt="edit" />
          내 정보 수정</Link>
        <Link className='mypage-logout' to="/" onClick={handleLogout}>
          <img src="/assets/mypage/logout.png" alt="logout" />
          로그아웃</Link>
        <Link className='mypage-withdraw-link' to="/" onClick={handleDeleteUser}>
         <img src="/assets/mypage/exit.png" alt="exit" />
          회원탈퇴
        </Link>
      </div>
    </div>
  );
}
