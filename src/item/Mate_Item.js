import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import './css/Mate_Item.css';

export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
    }
  }
`;

export default function Mate_Item({ user }) {
    const getToken = () => {
        return localStorage.getItem('token') || '';
      };
      const { loading: loadingWhoAmI, error: errorWhoAmI, data: dataWhoAmI } = useQuery(WHO_AM_I_QUERY, {
        context: {
          headers: {
            authorization: `Bearer ${getToken()}`
          }
        },
      });
      const whoAmI = dataWhoAmI?.whoAmI;
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [loggedInUserName, setLoggedInUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        
        // 로그인한 사용자의 이름을 로컬 스토리지에서 불러오기
        const loggedInUser = localStorage.getItem('loggedInUserName');
        if (loggedInUser) {
          setLoggedInUserName(loggedInUser);
        } else {
          // 로그인한 사용자 이름이 없는 경우, 로그인 상태를 false로 설정
          setIsLoggedIn(false);
        }
      }, []);

    useEffect(() => {
        if (dataWhoAmI && dataWhoAmI.whoAmI) {
            setLoggedInUserName(dataWhoAmI.whoAmI.name);
        }
    }, [dataWhoAmI]);

    if (!user) {
        return <p>Loading user data...</p>;
    }
    const userId = user.id ? user.id : 'Unknown User';
    const userName = user.name ? user.name : 'Unknown User';
    const gender = user.gender === 'female' ? '여성' : user.gender === 'male' ? '남성' : '성별 비공개';
    const mbti = user.mbti ? user.mbti : 'mbti 비공개';
    const birthYear = user.birth_at ? new Date(user.birth_at).getFullYear() : 'Unknown Year';
    const currentYear = new Date().getFullYear();
    const userAge = user.birth_at ? `${currentYear - birthYear} 세` : '나이 비공개';

    const handleSendMessage = () => {
        console.log('쪽지 보내기 버튼 클릭됨');
        console.log('메시지 작성 페이지로 이동');
        navigate('../MessageCompose', { state: { writingId: userName, category: "자취생메이트" } });
        console.log('로그인?', whoAmI.name, whoAmI.id);
    };

    return (
        <div className='mi-container'>
            <div className='mi-photo'>
              {user.profile_image && user.profile_image.imagePath ? (
                <img className="user-image" src={user.profile_image.imagePath} alt={userName} />
              ) : (
                <img className="user-image" src="/user.jpeg" alt="user" />
              )}
            </div>
            <div className='mi-name'>
                <h4>{userName}</h4>
            </div>
            <div className='mi-container2'>
                <div className='mi-age'>
                    <h4>{userAge}</h4>
                </div>
                <div className='mi-gender'>
                    <h4>{gender}</h4>
                </div>
            </div>
            <div className='mi-mbti'>
                <h4>{mbti}</h4>
            </div>
            <div className='mi-btn'>
                <button onClick={handleSendMessage}>쪽지보내기</button>
            </div>
        </div>
    );
}
