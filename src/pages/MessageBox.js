import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './css/MessageBox.css';

function MessageBox() {

  return (
    <div className="MessageBox">
      <header className="messagebox-container">
        <h3>수신 쪽지함 - 목록보기</h3>
        <Link to="/Message">쪽지쓰기</Link> 
        <input type="text" placeholder="쪽지 검색" />
      </header>
      <div className="messagebox-list">
   
      </div>
      <div className="messagebox-buttons">
        <button>이전 페이지</button>
        <button>다음 페이지</button>
      </div>
    </div>
  );
}

export default MessageBox;