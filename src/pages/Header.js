import React from 'react';
import { Link } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import './css/Header.css';

export default function Header() {
  return (
    <div className='header-container'>
      <div className="header-wrap">
        <div className="header-left-wrap">
          <Link className="logo-link" to="/">
            <img
              className="logo-image"
              src="/assets/logo/logo.png"
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

            </li>
            <li className='header-img'>
              <Link className="header-message" to="/MessageReceiveBox">
                  <img src="/assets/home/message.png" alt="message" />
              </Link>
              <Link className="header-notification" to="/Notification" >
              <img src="/assets/home/alarm.png" alt="alarm" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
