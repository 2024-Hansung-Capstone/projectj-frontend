import React from 'react';

export default function Logout({ onLogout }) {
  // 로그아웃 함수 호출
  onLogout();

  return (
    <div>
      <h2>로그아웃 페이지</h2>
      {/* 로그아웃에 관한 내용 */}
    </div>
  );
}
