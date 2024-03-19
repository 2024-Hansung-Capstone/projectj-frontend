import React from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 추가
import './css/EditUserInfo.css'; 

export default function EditUserInfo() {
  const navigate = useNavigate(); 

  const handleEditSubmit = (event) => {
    event.preventDefault(); // 기본 이벤트 방지
    // 수정하기 버튼 클릭 시 MyPage.js로 이동
    navigate('/mypage'); // 이동할 페이지 경로 지정
  };

  return (
    <div className="edit-user-info-container">
      <h2 className="edit-user-info-title">내 정보 수정</h2>
      <form className="edit-user-info-form" onSubmit={handleEditSubmit}>
        <div className="edit-group">
          <div className="edit-name">
            <label htmlFor="username">이름</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="edit-id">
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" name="id" />
          </div>
          <div className="edit-password">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="edit-password">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
          </div>
          <div className="edit-phonenumber">
            <label htmlFor="phoneNumber">연락처</label>
            <div className="phone-inputs">
              <input type="text" id="phoneNumber1" name="phoneNumber1" className="phone-input" maxLength="3" />
              <span className="phone-separator">-</span>
              <input type="text" id="phoneNumber2" name="phoneNumber2" className="phone-input" maxLength="4" />
              <span className="phone-separator">-</span>
              <input type="text" id="phoneNumber3" name="phoneNumber3" className="phone-input" maxLength="4" />
          </div>
        </div>
          <div className="edit-address">
            <label htmlFor="address">주소</label>
            <div className="address-inputs">
              <input type="text" id="address1" name="address1" className="address-input"/>
              <input type="text" id="address2" name="address2" className="address-input"/>
            </div>
          </div>
          <button type="submit" className="edit-submit">수정하기</button>
        </div>
      </form>
    </div>
  );
}
