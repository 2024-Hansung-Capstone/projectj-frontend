import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { TbMessage } from "react-icons/tb";
import './Header.css';

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
        <div className="search-container">
          <div className="search-icon">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="search-input"
            />
          </div>
        </div>
        <div className="header-right-wrap">
          <ul className="nav-list">
            <li>
              <Link className="header-mypage" to="/MyPage">
                마이페이지
              </Link>
              <Link className="header-message" to="/Message">
                <TbMessage />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
