import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import './css/Header.css';

export default function Header() {
  return (
    <div className='before-header-container'>
      <div className="before-header-wrap">
        <div className="before-header-left-wrap">
          <Link className="logo-link" to="/">
            <img
              className="logo-image"
              src="/logo.png"
              alt="로고"
            />
          </Link>
        </div>
          <div className="before-header-right-wrap">
          <ul className="nav-list">
            <li>
              <Link className="before-header-login" to="/Login">
                로그인
              </Link>
            </li>
            <li>
              <Link className="before-header-signup" to="/Signup">
                회원가입
              </Link>
            </li>
          </ul>
          </div>
        </div>
      </div>
  );
}
