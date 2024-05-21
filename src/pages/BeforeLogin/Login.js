import React, { useState } from 'react';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import LOGIN from './gql/LoginGql';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN, {
    // 로그인 요청 전에 실행되는 함수
    update: (cache, { data }) => {
      // 로그인 성공 시 반환된 토큰을 받아옴
      const token = data.login;
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', token);
    },
    // 헤더에 JWT 토큰을 추가하는 함수
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    }
  });

  const handleLogin = async () => {
    if (!username || !password) {
      if (!username && !password) {
        alert('아이디와 비밀번호를 입력해주십시오.');
      } else if (!username) {
        alert('아이디를 입력해주십시오.');
      } else if (!password) {
        alert('비밀번호를 입력해주십시오.');
      }
      return;
    }

    try {
      const { data } = await login({
        variables: {
          email: username,
          password: password
        }
      });

      const token = data.login;

      if (token) {
        onLogin(token);
        navigate('/');
      } else {
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">로그인</h2>
      <form>
        <div className="login-form-item">
          <input
            type="id"
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
