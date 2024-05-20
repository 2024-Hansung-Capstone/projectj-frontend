import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import "./css/MessageReply.css";

export const REPLY_LETTER = gql`
  mutation ReplyLetter($letter_id: String!, $replyLetterInput: ReplyLetterInput!) {
    replyLetter(letter_id: $letter_id, replyLetterInput: $replyLetterInput) {
      id
      sender {
        name
      }
      receiver {
        name
      }
      category
      title
      detail
    }
  }
`;

const MessageReply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { writingId } = location.state; 
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [replyLetter, { loading }] = useMutation(REPLY_LETTER, {
    onCompleted: (data) => {
      console.log('Mutation completed:', data); 
      if (data.replyLetter) {
        navigate('/MessageSendBox'); 
      } else {
        setErrorMessage('Failed to send reply.');
      }
    },
    onError: (error) => {
      console.error('Mutation error:', error); 
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTitle = `[reply] ${title}`;
    console.log('Submitting reply with:', { letter_id: writingId, title: updatedTitle, detail }); // Debug log
    replyLetter({ variables: { letter_id: writingId, replyLetterInput: { title: updatedTitle, detail } } });
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
        <button type="submit" className="reply-button" disabled={loading}>
          {loading ? 'Sending...' : '답장 완료'}
        </button>
      </form>
    </div>
  );
};

export default MessageReply;
