import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

// 쪽지 작성
const WRITE_LETTER = gql`
  mutation WriteLetter($writing_id: String!, $createLetterInput: CreateLetterInput!) {
    writeLetter(writing_id: $writing_id, createLetterInput: $createLetterInput) {
      id
      sender {
        id
        name
      }
      receiver {
        id
        name
      }
      product {
        id
        title
      }
      board {
        id
        title
      }
      category
      title
      detail
      is_read
      create_at
    }
  }
`;

const MessageCompose = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [writingId, setWritingId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [writeLetter] = useMutation(WRITE_LETTER);
  const navigate = useNavigate();
  const location = useLocation(); // useLocation을 사용하여 location 객체를 가져옴

  // writingId, category 값 가져오기
  useEffect(() => {
    if (location.state && location.state.writingId) {
      setWritingId(location.state.writingId);
      setReceiverId(location.state.receiverId);
      setCategory(location.state.category);
    }
  }, [location]);

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleReceiverIdChange = (e) => {
    setReceiverId(e.target.value);
  };
  const handleWritingIdChange = (e) => {
    setWritingId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await writeLetter({
        variables: {
          writing_id: writingId,
          createLetterInput: {
            title,
            detail,
            category,
            receiver: receiverId,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        },
      });
      console.log('작성된 쪽지:', data.writeLetter);
      navigate("/MessageSendBox");
    } catch (error) {
      console.error('쪽지 작성 중 오류:', error);
      setErrorMessage('쪽지 작성 중 오류가 발생했습니다.'); // 오류 메시지 설정
    }
  };

  return (
    <div className="market-post-container">
      <h2>쪽지 작성하기</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="writingId">글 ID:</label>
          <input id="writingId" type="text" value={writingId} onChange={handleWritingIdChange} />
        </div>
        <div>
          <label htmlFor="receiverId">수신자 ID:</label>
          <input id="receiverId" type="text" value={receiverId} onChange={handleReceiverIdChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='category' className='message-label'>카테고리:</label>
          <select id='category' value={category} onChange={handleCategoryChange} required>
            <option value="">카테고리를 선택하세요.</option>
            <option value="mate">자취메이트</option>
            <option value="community">커뮤니티</option>
            <option value="market">중고마켓</option>
            <option value="oneroom">원룸</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='message' className='message-label'>내용:</label>
          <textarea id='message' value={detail} onChange={handleDetailChange} required />
        </div>
        <button type="submit" className="market-post-button">작성 완료</button>
      </form>
    </div>
  );
};

export default MessageCompose;
