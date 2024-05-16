import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Message_Item from '../../item/Message_Item.js';
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery, gql } from '@apollo/client';
import "./css/MessageBox.css";

// 송신 메시지 정보
const FETCH_MY_SEND_LETTERS = gql`
  query FetchMySendLetters {
    fetchMySendLetters {
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

const MessageSendBox = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_MY_SEND_LETTERS, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    }
  });
  const [selectedCategory, setSelectedCategory] = useState('송신');

  const handleItemClick = (messagedata) => {
    navigate('/MessageDetail', { state: { messagedata } });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="message-container">
      <div className="message-header">
        <h2>송신함</h2>
        <Link to="/MessageReceiveBox">쪽지 수신함 바로가기</Link>
      </div>
      <table className='message-table'>
        <thead>
          <tr>
            <th>수신자</th>
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
            data && data.fetchMySendLetters.filter((messagedata) => selectedCategory === '송신' || messagedata.category === selectedCategory).length > 0 ? (
              data.fetchMySendLetters.map((messagedata, index) => (
                <tr key={index} onClick={() => handleItemClick(messagedata)}>
                  <td>{messagedata.receiver.name}</td>
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

export default MessageSendBox;


