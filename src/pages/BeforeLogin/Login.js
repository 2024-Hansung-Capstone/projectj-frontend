import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username && !password) {
      alert('아이디와 비밀번호를 입력해주십시오.');
    } else if (!username) {
      alert('아이디를 입력해주십시오.');
    } else if (!password) {
      alert('비밀번호를 입력해주십시오.');
    } else {
      console.log('로그인 버튼이 클릭되었습니다.');
      // 실제로는 여기에 로그인 로직을 구현해야 하며, 로그인이 성공했을 때 navigate를 사용하여 AfterLogin의 Home 페이지로 이동합니다.
      // 예시로 isAuthenticated라는 가상의 상태를 사용합니다.
      const isAuthenticated = true; // 실제 로그인 로직을 적용할 때는 이 부분을 해당 로직에 맞게 수정해야 합니다.
      if (isAuthenticated) {
        navigate('/'); // AfterLogin의 Home 페이지로 이동
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">로그인</h2>
      <form>
        <div className="login-form-item">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-form-item">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleLogin} className="login-form-button">
            로그인
          </button>
        </div>
      </form>
      <p className="login-form-link">
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default Login;
