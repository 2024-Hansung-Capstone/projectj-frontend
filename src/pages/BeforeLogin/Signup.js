import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup= () => {
  const navigate = useNavigate();
  const [isAgeChecked, setAgeChecked] = useState(false);
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);

  const handleSignup = () => {
    // 필수로 체크해야 하는 체크박스가 모두 체크되지 않았을 경우
    if (!isAgeChecked || !isTermsChecked || !isPrivacyChecked) {
      alert('약관에 동의해주십시오');
      return; // 체크박스가 체크되지 않았을 경우, 더 이상 진행하지 않음
    }

    // 회원가입 로직을 여기에 추가할 수 있습니다.
    console.log('회원가입 버튼이 클릭되었습니다.');
    
    // 회원가입 성공 후 로그인 페이지로 이동
    navigate('/');
  };

  // 연도, 월, 일을 생성하는 함수
  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <div className="signup-form-container">
      <h2 className="signup-form-title">회원가입</h2>
      <form>
        <div className="signup-form-item" style={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
          <input
            type="text"
            placeholder="이름"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="text"
            placeholder="아이디"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="password"
            placeholder="비밀번호 확인"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="phonenumber"
            placeholder="전화번호"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="text"
            placeholder="이메일"
          />
        </div>
        <div className="signup-form-item">
          <select>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div className="signup-form-item">
          <div className="date-picker">
            <select className="date-input" name="year">
              <option value="">연도</option>
              {generateOptions(1930, 2024)}
            </select>
            <select className="date-input" name="month">
              <option value="">월</option>
              {generateOptions(1, 12)}
            </select>
            <select className="date-input" name="day">
              <option value="">일</option>
              {generateOptions(1, 31)}
            </select>
          </div>
        </div>
        
        <div className="signup-form-item checkbox">
        <input
          type="checkbox"
          id="ageCheckbox"
          onChange={() => setAgeChecked(!isAgeChecked)}
        />
        <label htmlFor="ageCheckbox">[필수] 만 14세 이상입니다.</label>
      </div>

      <div className="signup-form-item checkbox">
        <input
          type="checkbox"
          id="termsCheckbox"
          onChange={() => setTermsChecked(!isTermsChecked)}
        />
        <label htmlFor="termsCheckbox">[필수] 회원가입 및 운영약관 동의</label>
      </div>

      <div className="signup-form-item checkbox">
        <input
          type="checkbox"
          id="privacyCheckbox"
          onChange={() => setPrivacyChecked(!isPrivacyChecked)}
        />
        <label htmlFor="privacyCheckbox">[필수] 개인정보 수집 및 이용 동의</label>
      </div>

        <div className="signup-form-item checkbox">
          <input type="checkbox" id="marketingCheckbox" />
          <label htmlFor="marketingCheckbox">[선택] 마케팅 이용 동의</label>
        </div>
        
        <div className="signup-form-item">
          <button type="button" onClick={handleSignup} className="signup-form-button">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;