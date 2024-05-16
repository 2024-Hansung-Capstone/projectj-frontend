import React, { useState, useEffect } from 'react';
import './css/Signup.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const SIGN_UP = gql`
mutation signUp($createUserInput: CreateUserInput!) {
  signUp(createUserInput: $createUserInput) {
    id
    dong {
	    name
    }
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
    testCreateToken(phone_number: $phone_number)
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
  const [sidoList, setSidoList] = useState([]); // 시/도 목록을 저장하기 위한 상태
  const [selectedSido, setSelectedSido] = useState(""); // 선택된 시/도를 저장하기 위한 상태
  const [sigunguList, setSigunguList] = useState([]); // 시/군/구 목록을 저장하기 위한 상태
  const [selectedSigungu, setSelectedSigungu] = useState(""); // 선택된 시/군/구를 저장하기 위한 상태
  const [dongList, setDongList] = useState([]); // 읍/면/동 목록을 저장하기 위한 상태
  const [selectedDong, setSelectedDong] = useState(""); // 선택된 읍/면/동을 저장하기 위한 상태

  useEffect(() => {
    fetchSigunguList('1100000000'); // 서울특별시 (서울특별시 코드: 1100000000)
  }, []);

  const fetchSidoList = async () => {
    try {
      const response = await axios.get('https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000');
      if (response.data && response.data.regcodes) {
        setSidoList(response.data.regcodes);
      } else {
        console.error('API 응답 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('시/도를 가져오는 중 오류 발생:', error);
    }
  };
  
  const fetchSigunguList = async (sidoCode) => {
    try {
      sidoCode = sidoCode / 100000000;
      const response = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${sidoCode}*00000`);
      const regcodes = response.data && response.data.regcodes ? response.data.regcodes : [];
      if (regcodes.length > 0) {
            setSigunguList(regcodes.filter(item => item.code !== sidoCode));
        } else {
            console.error('API 응답에 시/군/구 목록이 없습니다.');
        }
    } catch (error) {
        console.error('시/군/구를 가져오는 중 오류 발생:', error);
    }
  };
  
  const fetchDongList = async (sigunguCode) => {
    try {
      sigunguCode = parseInt(sigunguCode.toString().replace(/0/g, ''));
      const response = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${sigunguCode}*&is_ignore_zero=true`);
      if (response.data && response.data.regcodes) {
        setDongList(response.data.regcodes);
      } else {
        console.error('API 응답에 읍/면/동 목록이 없습니다.');
      }
    } catch (error) {
      console.error('읍/면/동을 가져오는 중 오류 발생:', error);
    }
  };

  const handleSidoChange = (e) => {
    const selectedSidoCode = e.target.value;
    setSelectedSido(selectedSidoCode);
    setSelectedSigungu(""); // 시/도가 변경될 때 시/군/구 선택 상태 초기화
    fetchSigunguList(selectedSidoCode);
  };
  
  const handleSigunguChange = (e) => {
    const selectedSigunguCode = e.target.value;
    setSelectedSigungu(selectedSigunguCode);
    setSelectedDong(""); // 시/군/구가 변경될 때 읍/면/동 선택 상태 초기화
    fetchDongList(selectedSigunguCode);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const nameInput = document.getElementById('nameInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const emailInput = document.getElementById('emailInput');
    const yearInput = document.getElementById('yearInput');
    const monthInput = document.getElementById('monthInput');
    const dayInput = document.getElementById('dayInput');
    const phoneInput = document.getElementById('phoneInput');
    const phoneTokenInput = document.getElementById('phoneTokenInput');
  
    const newErrorMessages = [];
  
    if (!nameInput.value) {
      newErrorMessages.push('이름을 입력해주십시오.');
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
    if (!phoneInput.value) {
      newErrorMessages.push('전화번호를 입력해주세요.');
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
  
      const phoneNumber = phoneInput.value;
      const token = phoneTokenInput.value;
      
      try {
        // 여기서 새로운 코드를 추가하여 입력값을 콘솔에 출력합니다.
        console.log('입력한 정보:', {
          name: nameInput.value,
          password: passwordInput.value,
          email: emailInput.value,
          gender: document.getElementById('genderSelect').value,
          birth_year: `${yearInput.value}`,
          birth_month: `${monthInput.value}`,
          birth_day: `${dayInput.value}`,
          phone_number: phoneNumber,
          dong_code: selectedDong.code,
          mbti: document.getElementById('mbtiSelect').value,
          is_find_mate: true
        });
  
        const res = await signUp({
          variables: {
            createUserInput: {
              name: nameInput.value,
              password: passwordInput.value,
              email: emailInput.value,
              gender: document.getElementById('genderSelect').value,
              birth_year: `${yearInput.value}`,
              birth_month: `${monthInput.value}`,
              birth_day: `${dayInput.value}`,
              dong_code: selectedDong.code,
              mbti: document.getElementById('mbtiSelect').value,
              phone_number: phoneNumber,
              is_find_mate: true
            },
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
        if (data.testCreateToken) {
          setShowAuthInput(true);
          setPhoneNumber(phoneNumberValue); // 전화번호 상태 설정
          console.log('토큰:', data.testCreateToken);
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

  return (
    <div className="signup-form-container">
      <h2 className="signup-form-title">회원가입</h2>
      <form onSubmit={handleFormSubmit} >
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
            placeholder="이메일"
            id="emailInput"
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
        <div className="signup-form-item-phonenumber">
          <input type="text" placeholder="전화번호" id="phoneInput" />
          <button className="phone-token-button" onClick={handleAuthRequest}>
            인증 번호 요청
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
        <div className="signup-form-item">
          <select value="1100000000" disabled>
            <option value="1100000000">서울특별시</option>
          </select>
        </div>
        <div className="signup-form-item">
          <select value={selectedSigungu} onChange={handleSigunguChange}>
            <option value="">시/군/구 선택</option>
            {sigunguList.map((sigungu, index) => (
              <option key={index} value={sigungu.code}>{sigungu.name}</option>
            ))}
          </select>
        </div>
        <div className="signup-form-item">
          <select value={selectedDong.code} onChange={(e) => setSelectedDong(dongList.find(dong => dong.code === e.target.value))}>
            <option value="">읍/면/동 선택</option>
            {dongList.map((dong, index) => (
              <option key={index} value={dong.code}>{dong.name}</option>
            ))}
          </select>
        </div>
        <div className="signup-form-item">
          <select id="mbtiSelect">
            <option value="">MBTI 선택</option>
            <option value="ISTJ">ISTJ</option>
            <option value="ISFJ">ISFJ</option>
            <option value="INFJ">INFJ</option>
            <option value="INTJ">INTJ</option>
            <option value="ISTP">ISTP</option>
            <option value="ISFP">ISFP</option>
            <option value="INFP">INFP</option>
            <option value="INTP">INTP</option>
            <option value="ESTP">ESTP</option>
            <option value="ESFP">ESFP</option>
            <option value="ENFP">ENFP</option>
            <option value="ENTP">ENTP</option>
            <option value="ESTJ">ESTJ</option>
            <option value="ESFJ">ESFJ</option>
            <option value="ENFJ">ENFJ</option>
            <option value="ENTJ">ENTJ</option>
          </select>
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