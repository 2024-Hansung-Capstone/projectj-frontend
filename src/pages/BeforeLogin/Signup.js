import React, { useState } from 'react';
import './css/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const SIGN_UP = gql`
  mutation SignUp($createUserInput: CreateUserInput!, $phone_number: String!, $token: String!) {
    signUp(createUserInput: $createUserInput) {
      id
      dong
      email
      name
      gender
      birth_at
      mbti
      phone_number
      is_find_mate
      point
      create_at
    }
  }
`;

const CREATE_TOKEN = gql`
  mutation CreateToken($phone_number: String!) {
    createToken(phone_number: $phone_number)
  }
`;

const AUTH_PHONE = gql`
  mutation AuthPhone($phone_number: String!, $token: String!) {
    authPhone(phone_number: $phone_number, token: $token)
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [isAgeChecked, setAgeChecked] = useState(false);
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [phoneToken, setPhoneToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [createTokenMutation] = useMutation(CREATE_TOKEN);
  const [authPhoneMutation] = useMutation(AUTH_PHONE);
  const [signUp] = useMutation(SIGN_UP);




  const handleSignup = async () => {
    const newErrorMessages = [];

    const nameInput = document.getElementById('nameInput');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const emailInput = document.getElementById('emailInput');
    const yearInput = document.getElementById('yearInput');
    const monthInput = document.getElementById('monthInput');
    const dayInput = document.getElementById('dayInput');

    setErrorMessages([]);

    if (!nameInput.value) {
      newErrorMessages.push('이름을 입력해주십시오.');
    }
    if (!usernameInput.value) {
      newErrorMessages.push('아이디를 입력해주십시오.');
    }
    if (!passwordInput.value) {
      newErrorMessages.push('비밀번호를 입력해주십시오.');
    }
    if (!confirmPasswordInput.value) {
      newErrorMessages.push('비밀번호를 다시 입력해주십시오.');
    }
    if (!emailInput.value) {
      newErrorMessages.push('이메일을 입력해주십시오.');
    }
    if (!yearInput.value || !monthInput.value || !dayInput.value) {
      newErrorMessages.push('생년월일을 입력해주십시오.');
    }
    if (!isAgeChecked) {
      newErrorMessages.push('만 14세 이상입니다.');
    }
    if (!isTermsChecked || !isPrivacyChecked) {
      newErrorMessages.push('약관에 동의해주십시오.');
    }

    setErrorMessages(newErrorMessages);

    if (newErrorMessages.length === 0) {
      console.log('회원가입 버튼이 클릭되었습니다.');
  
      const phoneInput = document.getElementById('phoneInput');
      const phoneTokenInput = document.getElementById('phoneTokenInput');
  
      // 휴대폰 번호와 토큰을 가져와서 mutation에 전달
      const phoneNumber = phoneInput.value;
      const token = phoneTokenInput.value;
  
      try {
        const res = await signUp({
          variables: {
            createUserInput: {
              id: document.getElementById('usernameInput').value,
              name: document.getElementById('nameInput').value,
              password: document.getElementById('passwordInput').value,
              email: document.getElementById('emailInput').value,
              gender: document.getElementById('genderSelect').value,
              birth_at: `${document.getElementById('yearInput').value}-${document.getElementById('monthInput').value}-${document.getElementById('dayInput').value}`,
            },
            phone_number: phoneNumber,
            token: token,
          },
        });
  
        console.log('회원가입 및 휴대폰 인증 결과:', res);
        navigate('/');
      } catch (error) {
        console.error('회원가입 또는 휴대폰 인증 중 오류 발생:', error);
      }
    } else {
      alert('입력값을 확인하고 약관에 동의해주십시오.');
    }
  };

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  
  // 인증번호 요청 처리
  const handleAuthRequest = async () => {
    const phoneInput = document.getElementById('phoneInput');
    const phoneNumberValue = phoneInput.value.trim(); // 공백 제거된 전화번호

    if (!phoneNumberValue) {
      alert('전화번호를 입력하세요.');
    } else {
      try {
        // createToken 뮤테이션 호출
        const { data } = await createTokenMutation({ variables: { phone_number: phoneNumberValue } });
        if (data.createToken) {
          setShowAuthInput(true);
          setPhoneNumber(phoneNumberValue); // 전화번호 상태 설정
        }
      } catch (error) {
        console.error('토큰 생성 중 오류:', error);
      }
    }
  };

  const handleAuthSubmit = async () => {
    const phoneTokenInput = document.getElementById('phoneTokenInput');
    const tokenValue = phoneTokenInput.value.trim(); // 공백 제거된 토큰

    try {
      // authPhone 뮤테이션 호출
      const { data } = await authPhoneMutation({ variables: { phone_number: phoneNumber, token: tokenValue } });
      if (data.authPhone) {
        alert('인증이 완료되었습니다.');
      } else {
        alert('인증번호를 정확하게 입력해주세요.');
      }
    } catch (error) {
      console.error('전화 인증 중 오류:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Promise -> Node js 비동기 처리
    // await 비동기가 끝날때까지 기다려줌
    try {
      const res = await signUp({
        variables: {
          createUserInput: {
            id: document.getElementById('usernameInput').value,
            name: document.getElementById('nameInput').value,
            password: document.getElementById('passwordInput').value,
            email: document.getElementById('emailInput').value,
            gender: document.getElementById('genderSelect').value,
            birth_at: `${document.getElementById('yearInput').value}-${document.getElementById('monthInput').value}-${document.getElementById('dayInput').value}`,
          },
          phone_number: phoneNumber, // 휴대폰 번호는 위에서 가져온 값으로 사용
          token: phoneToken, // 토큰
        },
      });
      console.log('res', res);
    } catch (error) {
      console.error('회원가입 또는 휴대폰 인증 중 오류 발생:', error);
    }
    // 결과를 출력
  }

  return (
    <div className="signup-form-container">
      <h2 className="signup-form-title">회원가입</h2>
      <form onSubmit={handleSubmit} >
        <div className="signup-form-item" style={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
          <input
            type="text"
            placeholder="이름"
            id="nameInput"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="text"
            placeholder="아이디"
            id="usernameInput"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="password"
            placeholder="비밀번호"
            id="passwordInput"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="password"
            placeholder="비밀번호 확인"
            id="confirmPasswordInput"
          />
        </div>
        <div className="signup-form-item">
          <input
            type="text"
            placeholder="이메일"
            id="emailInput"
          />
        </div>
        <div className="signup-form-item-phonenumber">
          <input type="text" placeholder="전화번호" id="phoneInput" />
          <button className="phone-token-button" onClick={handleAuthRequest}>
            인증번호 요청
          </button>
        </div>
        {showAuthInput && (
          <div className="signup-form-item">
            <input type="text" placeholder="인증번호 입력" id="phoneTokenInput" />
            <button className="phone-auth-button" onClick={handleAuthSubmit}>
              인증
            </button>
          </div>
        )}
        <div className="signup-form-item">
          <select id="genderSelect">
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div className="signup-form-item">
          <div className="date-picker">
            <select className="date-input" name="year" id="yearInput">
              <option value="">연도</option>
              {generateOptions(1930, 2024)}
            </select>
            <select className="date-input" name="month" id="monthInput">
              <option value="">월</option>
              {generateOptions(1, 12)}
            </select>
            <select className="date-input" name="day" id="dayInput">
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
          <label htmlFor="termsCheckbox">
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">[필수] 회원가입 및 운영약관 동의</a>
          </label>
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
          <button type="submit" className="signup-form-button">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;