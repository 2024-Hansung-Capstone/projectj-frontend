import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import "./css/MessageBox.css";

// 송신 메시지 정보
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
  const [selectedCategory, setSelectedCategory] = useState('송신');
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(FETCH_MY_RECEIVE_LETTERS, {
    variables: {
      receiverName: localStorage.getItem('username') // 로그인한 사용자 이름을 변수로 전달
    },
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    },
    notifyOnNetworkStatusChange: true,
  });
  

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 불러옴
    refetch();
  }, [refetch]);

  const handleItemClick = (messagedata) => {
    navigate('/MessageDetail', { state: { messagedata } });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleRefreshClick = () => {
    // 데이터 새로고침 버튼 클릭 이벤트
    refetch();
  };

  return (
    <div className="message-container">
      <div className="message-header">
        <h2>수신함</h2>
        <Link to="/MessageSendBox">쪽지 송신함 바로가기</Link>
        <button onClick={handleRefreshClick}>새로고침</button> {/* 새로고침 버튼 추가 */}
      </div>
      <table className='message-table'>
        <thead>
          <tr>
            <th>받는 사람 (나)</th>
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
            data && data.fetchMyReceiveLetters.filter((messagedata) => selectedCategory === '송신' || messagedata.category === selectedCategory).length > 0 ? (
              data.fetchMyReceiveLetters.map((messagedata, index) => (
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
