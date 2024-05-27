import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Mate_Item.css';


export default function Mate_Item({ user }) {
  const navigate = useNavigate();

  const handleSendMessage = () => {
    navigate('/MessageCompose', { state: { writingId: user.id, category: "자취생메이트" } });
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const userName = user.name ? user.name : 'Unknown User';
  const gender = user.gender === 'female' ? '여성' : user.gender === 'male' ? '남성' : '성별 비공개';
  const mbti = user.mbti ? user.mbti : 'MBTI 비공개';
  const birthYear = user.birth_at ? new Date(user.birth_at).getFullYear() : 'Unknown Year';
  const currentYear = new Date().getFullYear();
  const userAge = user.birth_at ? `${currentYear - birthYear} 세` : '나이 비공개';

  return (
    <div className='mi-container'>
      <div className='mi-photo'>
        {user.profile_image && user.profile_image.imagePath ? (
          <img className="user-image" src={user.profile_image.imagePath} alt={userName} />
        ) : (
          <img className="user-image" src="/assets/mate/user.jpeg" alt="user" />
        )}
      </div>
      <div className='mi-name'>
        <p>{userName}</p>
      </div>
      <div className='mi-container2'>
        <div className='mi-age'>
          <p>{userAge}</p>
        </div>
        <div className='mi-gender'>
          <p>{gender}</p>
        </div>
      </div>
      <div className='mi-mbti'>
        <p>{mbti}</p>
      </div>
      <div className='mi-btn'>
        <button onClick={handleSendMessage}>쪽지보내기</button>
      </div>
    </div>
  );
}
