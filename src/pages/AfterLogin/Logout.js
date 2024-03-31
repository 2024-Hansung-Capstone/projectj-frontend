import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate('/');
  }, [navigate, onLogout]);

  // 로그아웃 중임을 알리는 메시지 반환
  return (
    <div>
      <h2>로그아웃 중...</h2>
    </div>
  );
}
