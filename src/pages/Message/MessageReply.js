import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import "./css/MessageReply.css";

const MessageReply = () => {
  const location = useLocation();
  const { writingId } = location.state; // 전달받은 writingId를 가져옴
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // handleSubmit 함수 안에서 replyLetter mutation을 사용하여 답장을 보냄
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 replyLetter mutation을 호출하는 코드를 추가
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  return (
    <div className="reply-container">
      <h2>쪽지 답장</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="writingId">글 ID:</label>
          <input id="writingId" type="text" value={writingId} readOnly />
        </div>
        <div className='form-group'>
          <label htmlFor='title' className='title-label'>제목:</label>
          <textarea id='title' value={title} onChange={handleTitleChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor='detail' className='detail-label'>내용:</label>
          <textarea id='detail' value={detail} onChange={handleDetailChange} required />
        </div>
        <button type="submit" className="reply-button">답장 완료</button>
      </form>
    </div>
  );
};

export default MessageReply;
