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
      // 로그인 로직 추가
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