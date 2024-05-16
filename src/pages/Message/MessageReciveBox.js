import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import "./css/MessageBox.css";

// 수신 메시지 정보
const FETCH_MY_RECEIVE_LETTERS = gql`
  query FetchMyReceiveLetters {
    fetchMyReceiveLetters {
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

const MessageReceiveBox = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_MY_RECEIVE_LETTERS, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    }
  });
  const [selectedCategory, setSelectedCategory] = useState('수신');

  const handleItemClick = (messagedata) => {
    navigate('/MessageDetail', { state: { messagedata } });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="message-container">
      <div className="message-header">
      <h2>수신함</h2>
        <Link to="/MessageSendBox">쪽지 송신함 바로가기</Link>
      </div>
      <table className='message-table'>
        <thead>
          <tr>
            <th>송신자</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4">Loading...</td></tr>
          ) : error ? (
            <tr><td colSpan="4">Error: {error.message}</td></tr>
          ) : (
            data && data.fetchMyReceiveLetters.length > 0 ? (
              data.fetchMyReceiveLetters.filter((messagedata) => selectedCategory === '수신' || messagedata.category === selectedCategory).map((messagedata, index) => (
                <tr key={index} onClick={() => handleItemClick(messagedata)}>
                  <td>{messagedata.sender.name}</td>
                  <td>{messagedata.category}</td>
                  <td>{messagedata.title}</td>
                  <td>{messagedata.detail}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className='nodata'>등록된 쪽지가 없습니다.</td></tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageReceiveBox;
