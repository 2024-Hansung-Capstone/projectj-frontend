import React, { useState } from 'react';
import './css/Message.css';

export default function MessageCompose({ onSendMessage }) {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 메시지 전송 함수 호출
    onSendMessage({ recipient, message });
    // 폼 초기화
    setRecipient('');
    setMessage('');
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
          <label htmlFor='message' className='message-label'>내용:</label>
          <textarea id='message' value={message} onChange={handleMessageChange} required />
        </div>
        <button type='submit' className='message-submit-button'>전송</button>
      </form>
    </div>
  );
}
