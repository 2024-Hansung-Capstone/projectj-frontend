import React from 'react';
import { Link } from 'react-router-dom';
import { TbMessage } from "react-icons/tb";
import './css/Header.css';

export default function Header() {
  return (
    <div className='header-container'>
      <div className="header-wrap">
        <div className="header-left-wrap">
          <Link className="logo-link" to="/">
            <img
              className="logo-image"
              src="/logo.png"
              alt="로고"
            />
          </Link>
        </div>
        <div className="header-right-wrap">
          <ul className="nav-list">
            <li>
              <Link className="header-mypage" to="/MyPage">
                마이페이지
              </Link>
              <Link className="header-message" to="/MessageReciveBox">
                <TbMessage />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
