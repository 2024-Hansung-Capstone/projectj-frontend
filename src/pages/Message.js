import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Message.css';

export default function MessageCompose({ onSendMessage }) {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    // location.state.recipientId가 존재하면 수신자 상태를 업데이트
    if (location.state?.recipientId) {
      setRecipient(location.state.recipientId);
    }
  }, [location.state]);

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCategoryChange = (e) => { // 카테고리 변경 핸들러 추가
    setCategory(e.target.value);
  };

  const handleSendClick = (e) => {
    navigate('/MessageBox');
    e.preventDefault(); // 중복 navigate 호출을 방지하기 위해 제거
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSendMessage === 'function') {
      onSendMessage({ recipient, message, category }); // 카테고리도 전송
      setRecipient('');
      setMessage('');
      setCategory('');
      navigate('/MessageBox');
    } else {
      console.error('onSendMessage is not a function');
    }
  };

  return (
    <div className='message-compose-container'>
      <h2>쪽지 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='recipient' className='message-label'>수신자:</label>
          <input type='text' id='recipient' value={recipient} onChange={handleRecipientChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor='category' className='message-label'>카테고리:</label>
          <select id='category' value={category} onChange={handleCategoryChange} required>
            <option value="">선택...</option>
            <option value="mate">자취메이트</option>
            <option value="community">커뮤니티</option>
            <option value="market">중고마켓</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='message' className='message-label'>내용:</label>
          <textarea id='message' value={message} onChange={handleMessageChange} required />
        </div>
        <button type='submit' className='message-submit-button' onClick={handleSendClick}>전송</button>
      </form>
    </div>
  );
}
